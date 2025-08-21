import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { deleteUserRequest, fetchUsersRequest } from "./slice";
import { Table, Input, Button, Space, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateUserModal from "./edit/index"
export default function Users() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editModalDetails, setEditModalDetails] = useState<any>({});
  const modalClose = () => {
    setShowEditModal(false)
  }
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  // Filtered data based on search
  const filteredData = search
    ? (data || []).filter(
      (user: any) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    )
    : data;

  let dataCount = filteredData?.length;

  const handleEdit = (data: any) => {
    console.log(data);
    
    setShowEditModal(true)
    setEditModalDetails(data);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUserRequest(id))
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a: any, b: any) => a.role.localeCompare(b.role),
      render: (role: string) => (
        <span className={role === "admin" ? "text-blue-200" : "text-green-400"}>
          {role}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
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
        Users
        <Tag className="m-5 p-5 bg-amber-800 text-amber-50">{dataCount}</Tag>
      </h3>

      <div className="mb-3">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 "
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {
        showEditModal &&
        <UpdateUserModal data={editModalDetails} visible={showEditModal} onClose={modalClose} />
      }
      <Table
        loading={loading}
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        pagination={{ pageSize: 20 }}
        scroll={{ x: "max-content" }}
        className="bg-gray-800 text-white"
        style={{
          backgroundColor: "#1f2937", // gray-800
          color: "#fff",
        }}
        rowClassName={() => "bg-gray-800 text-white hover:bg-gray-700"}
        bordered
      />

    </div>
  );
}
