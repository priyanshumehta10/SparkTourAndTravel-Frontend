import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { fetchOrdersRequest } from "./slice";
import type { RootState } from "../../redux/store";

interface Participant {
  _id: string;
  name: string;
  age: number;
  gender: string;
}

interface Order {
  _id: string;
  user: { _id: string; name: string; email: string };
  package: { _id: string; title: string; price: number; duration: string };
  participants: Participant[];
  contactEmail: string;
  contactPhone: string;
  amount: number;
  totalAmount: number;
  paidAmount: number;
  paymentType: string;
  startingDate: string;
  paymentStatus: string;
  bookedAt: string;
}

const OrdersTable = () => {
  const dispatch = useDispatch();
  const fetchData = useRef(false);
  const { OrdersData, loading, error } = useSelector((state: RootState) => state.ordersAdmin);

  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
      dispatch(fetchOrdersRequest());
    }
  }, [dispatch]);

  const columns: ColumnsType<Order> = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: "userName",
    },
    {
      title: "User Email",
      dataIndex: ["user", "email"],
      key: "userEmail",
    },
    {
      title: "Package Title",
      dataIndex: ["package", "title"],
      key: "packageTitle",
    },
    {
      title: "Package Price",
      dataIndex: ["package", "price"],
      key: "packagePrice",
      render: (price) => `₹${price}`,
    },
    {
      title: "Package Duration",
      dataIndex: ["package", "duration"],
      key: "packageDuration",
    },
    {
      title: "Participants",
      key: "participants",
      render: (_, record) =>
        record.participants.map((p) => (
          <div key={p._id}>
            {p.name} ({p.age}, {p.gender})
          </div>
        )),
    },
    {
      title: "Contact Email",
      dataIndex: "contactEmail",
      key: "contactEmail",
    },
    {
      title: "Contact Phone",
      dataIndex: "contactPhone",
      key: "contactPhone",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `₹${amount}`,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => `₹${totalAmount}`,
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (paidAmount) => `₹${paidAmount}`,
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (type) => (type === "100" ? "Full" : "50% Advance"),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => {
        let color = status === "paid" ? "green" : status === "partial" ? "orange" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Starting Date",
      dataIndex: "startingDate",
      key: "startingDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Booked At",
      dataIndex: "bookedAt",
      key: "bookedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="dark-mode-table">
      <h2>Orders List</h2>
      <Table
        columns={columns}
        dataSource={OrdersData}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default OrdersTable;
