import {  useEffect, useRef } from "react";
import { Table, Tag, Card, Typography, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrdersRequest } from "./slice";
import type { RootState } from "../../redux/store";

const { Title } = Typography;

// 🔹 Define booking types for type safety
interface Participant {
  name: string;
  age?: number;
  gender: "Male" | "Female" | "Other";
}

interface PackageInfo {
  _id: string;
  title: string;
  price: number;
}

interface Booking {
  _id: string;
  package: PackageInfo;
  participants: Participant[];
  amount: number;
  paidAmount: number;
  paymentType: "50" | "100";
  paymentStatus: "pending" | "partial" | "paid";
  startingDate: string;
  bookedAt: string;
}

const MyOrders = () => {
  
  const fetchData = useRef(false);
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(user);
  
  
  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
      dispatch(fetchMyOrdersRequest(user?.id));
    }
  }, [dispatch]);

    const {MyOrdersLoading, MyOrdersdata   } = useSelector(
    (state: RootState) => state.orders
  );

  console.log(MyOrdersLoading, MyOrdersdata);
  

  // 🔹 Define table columns with type safety
  const columns: ColumnsType<Booking> = [
    {
      title: "Package",
      dataIndex: ["package", "title"],
      key: "package",
      render: (text: string) => <span className="font-medium text-blue-700">{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt: number) => `₹${amt}`,
    },
    {
      title: "Paid",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (amt: number) => `₹${amt}`,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: Booking["paymentStatus"]) => {
        let color = "default";
        if (status === "paid") color = "green";
        if (status === "partial") color = "orange";
        if (status === "pending") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startingDate",
      key: "startingDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Booked At",
      dataIndex: "bookedAt",
      key: "bookedAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="p-6">
      <Card className="shadow-lg rounded-2xl">
        <Title level={3} className="!mb-6 text-gray-800">
          My Orders
        </Title>

        {MyOrdersLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : (
         <Table
  columns={columns}
  dataSource={MyOrdersdata || []} // ✅ Safe fallback
  rowKey="_id"
  pagination={{ pageSize: 5 }}
  className="rounded-lg overflow-hidden"
/>

        )}
      </Card>
    </div>
  );
};

export default MyOrders;
