import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { fetchOrdersRequest } from "./slice";
import type { RootState } from "../../redux/store";
import {fetchCancelConfirmReq} from "./slice"

interface Participant {
  _id: string;
  name: string;
  age: number;
  gender: string;
}

interface CancelRequest {
  requested: boolean;
  reason?: string;
  requestedAt?: string;
  confirmed: boolean;
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
  cancelRequest?: CancelRequest;
}

const OrdersTable = () => {
  const dispatch = useDispatch();
  const fetchData = useRef(false);
  const { OrdersData, loading, error } = useSelector(
    (state: RootState) => state.ordersAdmin
  );

  const handleConfirmCancel = (id: string) => {
    console.log("Confirm cancel for order:", id);
    // dispatch action here
    dispatch(fetchCancelConfirmReq({"bookingId":id,"approve":true}))
  };

  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
      dispatch(fetchOrdersRequest());
    }
  }, [dispatch]);

  // ✅ Keep only a few main columns
  const columns: ColumnsType<Order> = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User",
      dataIndex: ["user", "name"],
      key: "userName",
    },
    {
      title: "Package",
      dataIndex: ["package", "title"],
      key: "packageTitle",
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => {
        let color =
          status === "paid"
            ? "green"
            : status === "partial"
            ? "orange"
            : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Cancel Request",
      key: "cancelRequest",
      render: (_, record) => {
        if (!record.cancelRequest || !record.cancelRequest.requested) {
          return <Tag color="green">Active</Tag>;
        }

        return (
          <div>
            <Tag color="orange">Requested</Tag>
            <div>Reason: {record.cancelRequest.reason}</div>
            {record.cancelRequest.confirmed ? (
              <Tag color="red">Confirmed</Tag>
            ) : (
              <Button
                type="primary"
                danger
                size="small"
                onClick={() => handleConfirmCancel(record._id)}
              >
                Confirm Cancel
              </Button>
            )}
          </div>
        );
      },
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
        // ✅ Expandable rows for details
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>
              <p><b>User Email:</b> {record.user.email}</p>
              <p><b>Participants:</b></p>
              <ul>
                {record.participants.map((p) => (
                  <li key={p._id}>
                    {p.name} ({p.age}, {p.gender})
                  </li>
                ))}
              </ul>
              <p><b>Contact:</b> {record.contactEmail} / {record.contactPhone}</p>
              <p><b>Amounts:</b> Paid ₹{record.paidAmount}, Total ₹{record.totalAmount}</p>
              <p><b>Payment Type:</b> {record.paymentType === "100" ? "Full" : "50% Advance"}</p>
              <p><b>Starting Date:</b> {new Date(record.startingDate).toLocaleDateString()}</p>
              <p><b>Booked At:</b> {new Date(record.bookedAt).toLocaleString()}</p>
            </div>
          ),
        }}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default OrdersTable;
