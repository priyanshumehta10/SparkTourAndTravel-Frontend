import { useEffect, useRef } from "react";
import { Table, Tag, Card, Typography, Spin, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrdersRequest, resetRemainingAmountSlice , fetchpayRemainingAmountRequest} from "./slice";
import { confirmOrderRequest } from "../Packages/slice";
import type { RootState } from "../../redux/store";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

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
  paymentStatus: "pending" | "partial" | "paid" | "cancel";
  startingDate: string;
  bookedAt: string;
}

const MyOrders = () => {
  const fetchData = useRef(false);
  const dispatch = useDispatch();
  const { confirm } = Modal;

  const { user } = useSelector((state: RootState) => state.auth);

  const handlePayRemaining = (bookingId: string) => {
    dispatch(fetchpayRemainingAmountRequest(bookingId));
  };

  const handleCancel = (bookingId: string) => {
    confirm({
      title: "Do you really want to cancel?",
      icon: <ExclamationCircleOutlined />,
      content:
        "This action cannot be undone. Please read our refund policy before canceling.",
      okText: "Yes, Cancel",
      okType: "danger",
      cancelText: "No, Keep Booking",
      onOk() {
        console.log("Booking canceled:", bookingId);
        // dispatch(cancelBookingRequest(bookingId))  <-- if you have an API
      },
    });
  };

  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
      dispatch(fetchMyOrdersRequest(user?.id));
    }
  }, [dispatch, user?.id]);

  const { MyOrdersLoading, MyOrdersdata, payRemainingAmountdata } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    if (payRemainingAmountdata) {
      openRazorpay(payRemainingAmountdata);
      dispatch(resetRemainingAmountSlice());
    }
  }, [payRemainingAmountdata, dispatch]);

  const openRazorpay = (orderData: any) => {
    if (!(window as any).Razorpay) {
      console.error("Razorpay SDK not loaded!");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Spark Tour and Travels",
      description: "Booking Payment",
      order_id: orderData.orderId,
      prefill: {
        email: orderData.contactEmail,
        contact: orderData.contactPhone,
      },
      handler: function (response: any) {
        dispatch(
          confirmOrderRequest({
            bookingId: orderData.bookingId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            packageId: orderData.packageId,
            participants: orderData.participants,
            contactEmail: orderData.contactEmail,
            contactPhone: orderData.contactPhone,
            amount: orderData.amount,
            paymentType: orderData.paymentType,
          })
        );
        dispatch(resetRemainingAmountSlice());
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const columns: ColumnsType<Booking> = [
    {
      title: "Package",
      dataIndex: ["package", "title"],
      key: "package",
      render: (text: string) => (
        <span className="font-medium text-blue-700">{text}</span>
      ),
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
        if (status === "cancel") color = "grey";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Trip Date",
      dataIndex: "startingDate",
      key: "startingDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_: any, record: Booking) => {
        const today = new Date();
        const tripDate = new Date(record.startingDate);
        const isPastTrip = tripDate < today;

        if (isPastTrip) {
          return (
            <span className="text-gray-400 italic">
              Trip started — actions disabled
            </span>
          );
        }

        return (
          <div className="flex gap-2">
            {record.paymentType === "50" &&
              record.paymentStatus === "partial" && (
                <button
                  className="px-3 py-1 !bg-blue-600 text-white rounded-md"
                  onClick={() => handlePayRemaining(record._id)}
                >
                  Pay Remaining
                </button>
              )}

            {record.paymentStatus !== "cancel" && (
              <button
                className="px-3 py-1 !bg-red-600 text-white rounded-md"
                onClick={() => handleCancel(record._id)}
              >
                Cancel
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <Card className="shadow-lg rounded-2xl overflow-hidden">
        <Title level={3} className="!mb-6 text-gray-800">
          My Orders
        </Title>

        {MyOrdersLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={MyOrdersdata || []}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              className="rounded-lg"
              scroll={{ x: true }}
              rowClassName={(record) => {
                const tripDate = new Date(record.startingDate);
                return tripDate < new Date() ? "bg-gray-100 text-gray-400" : "";
              }}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default MyOrders;
