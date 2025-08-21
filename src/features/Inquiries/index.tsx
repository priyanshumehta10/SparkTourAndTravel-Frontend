// features/Inquiry/InquiryTable.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { fetchInquiryRequest, deleteInquiryRequest } from "./slice";
import { Table, Input, Button, Space, Popconfirm, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function InquiryTable() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.inquiry);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchInquiryRequest());
  }, [dispatch]);

  // Filtered data based on search
  const filteredData = search
    ? (data || []).filter(
      (inquiry: any) =>
        inquiry.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        inquiry.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        inquiry.email?.toLowerCase().includes(search.toLowerCase()) ||
        inquiry.mobileNumber?.includes(search)
    )
    : data;

  const dataCount = filteredData?.length;

  const handleDelete = (id: string) => {
    dispatch(deleteInquiryRequest(id));
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text: string) => <span className="text-white">{text}</span>,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),

    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text: string) => <span className="text-white">{text}</span>,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),

    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <span className="text-indigo-400">{text}</span>,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),

    },
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text: string) => <span className="text-gray-300">{text}</span>,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),

    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => <span className="text-gray-400">{new Date(text).toLocaleString()}</span>,
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
        Inquiries
        <Tag className="m-5 p-5 bg-amber-800 text-amber-50">{dataCount}</Tag>
      </h3>

      <div className="mb-3">
        <Input
          placeholder="Search inquiries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 bg-gray-700 text-white border-gray-600 placeholder-gray-400"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

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
}
