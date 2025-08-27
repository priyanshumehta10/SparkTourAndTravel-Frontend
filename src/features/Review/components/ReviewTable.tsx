import { useEffect, useMemo, useRef, useState } from "react";
import { Table, Button, Space, Popconfirm, Tag, Rate, Input } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewRequest, resetCreated, deleteReviewRequest } from "../slice";
import type { RootState } from "../../../redux/store";


const ReviewTable = () => {
  const dispatch = useDispatch();
  const fetchData = useRef(false);
  const { data, loading, created } = useSelector((state: RootState) => state.review);
  const [search, setSearch] = useState("");


  useEffect(() => {
    if (!fetchData.current || created) {
      fetchData.current = true;
      dispatch(fetchReviewRequest());
      if (created) dispatch(resetCreated());
    }
  }, [created, dispatch]);

  console.log(data);


  const handleDelete = (id: string) => {
    dispatch(deleteReviewRequest(id));
  };

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(
      (review) =>
        review.username?.toLowerCase().includes(search.toLowerCase()) ||
        review.message?.toLowerCase().includes(search.toLowerCase()) ||
        String(review.star).includes(search)
    );
  }, [data, search]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text: string) => <span className="text-gray-300">{text}</span>,
    },
    {
      title: "Star",
      dataIndex: "star",
      key: "star",
      render: (star: number) => (
        <Rate disabled defaultValue={star} className="custom-dark-rate" />
      ),
      sorter: (a: any, b: any) => a.star - b.star,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => (
        <span className="text-gray-400">{new Date(text).toLocaleString()}</span>
      ),
    },
     {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image: any) =>
      image ? (
        <img
          src={image.url}
          alt="review"
          style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
        />
      ) : (
        <span className="text-gray-500">No Image</span>
      ),
  },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-2 sm:p-4 dark-mode-table">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
        Reviews
        <Tag className="m-5 p-5 bg-blue-800 text-blue-50">{filteredData.length}</Tag>
      </h3>
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder="Search by username, message, or star"
        className="w-full sm:w-72 bg-black mb-6 text-white placeholder-gray-400"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ backgroundColor: "#000", color: "#fff" }}
      />
      <Table
        loading={loading}
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        pagination={{ pageSize: 20 }}
        scroll={{ x: "max-content" }}
        className="bg-gray-800 text-white"
        style={{ backgroundColor: "#1f2937", color: "#fff" }}
        rowClassName={() => "bg-gray-700 text-white hover:bg-gray-600"}
        bordered
      />
    </div>
  );
};

export default ReviewTable;