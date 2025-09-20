import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { fetchDashboardStatsRequest } from "./slice";
import { Row, Col, Card, Statistic } from "antd";
import { Pie, Column } from "@ant-design/plots";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStatsRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-100"></div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  const totalAdmins = stats?.users?.admins || 0;
  const totalNormalUsers = stats?.users?.normalUsers || 0;
  const totalUsers = stats?.users?.total || 0;
  const totalPackages = stats?.packages?.total || 0;
  const totalInquiries = stats?.inquiries?.total || 0;
  const totalRevenue = stats?.bookings?.revenue || 0;

  const userPieData = [
    { type: "Admins", value: totalAdmins },
    { type: "Users", value: totalNormalUsers },
  ];

  const bookingsByPackageData = stats?.bookings?.byPackage?.map(pkg => ({
    type: pkg.packageTitle || "Unknown",
    value: pkg.count || 0,
  })) || [];

  const cardStyle = { backgroundColor: "#9ca3af", borderRadius: 8 };
  const statisticStyle = { color: "#fff" };

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Spark Tour and Travel Dashboard</h1>

<Row gutter={[16, 16]} className="mb-4">
  {[
    { title: "Total Users", value: totalUsers },
    { title: "Total Packages", value: totalPackages },
    { title: "Total Inquiries", value: totalInquiries },
    { title: "Total Revenue", value: totalRevenue, prefix: "₹" }
  ].map((stat, idx) => (
    <Col
      key={idx}
      xs={24}  // full width on extra small screens
      sm={12}  // half width on small screens
      md={12}  // half width on medium screens
      lg={6}   // quarter width on large screens
      xl={6}   // quarter width on extra large screens
    >
      <Card style={cardStyle}>
        <Statistic
          title={stat.title}
          value={stat.value}
          prefix={stat.prefix}
          style={statisticStyle}
        />
      </Card>
    </Col>
  ))}
</Row>

<Row gutter={[16, 16]} className="mb-4">
  {userPieData.length > 0 && (
    <Col
      xs={24}
      md={12}  // half width on medium+ screens
    >
      <Card title="Users Breakdown (Admin vs Users)" style={cardStyle}>
        <div style={{ height: 300, minHeight: 250 }}>
          <Pie
            data={userPieData}
            angleField="value"
            colorField="type"
            radius={0.8}
            label={{
              type: "outer",
              content: (item: { type: string; value: number }) =>
                `${item.type}: ${item.value}`,
              style: { fill: "#fff" },
            }}
            color={["#2563eb", "#EC4899"]}
            interactions={[{ type: "element-active" }]}
          />
        </div>
      </Card>
    </Col>
  )}

  {bookingsByPackageData.length > 0 && (
    <Col
      xs={24}
      md={12}  // half width on medium+ screens
    >
      <Card title="Bookings by Package" style={cardStyle}>
        <div style={{ overflowX: "auto" }}> {/* horizontal scroll for small screens */}
          <Column
            data={bookingsByPackageData}
            xField="type"
            yField="value"
            label={{ position: "middle", style: { fill: "#fff" } }}
            xAxis={{ label: { autoHide: true, autoRotate: false, style: { fill: "#fff" } } }}
            yAxis={{ label: { style: { fill: "#fff" } } }}
            meta={{ type: { alias: "Package" }, value: { alias: "Bookings" } }}
            color="#2563eb"
          />
        </div>
      </Card>
    </Col>
  )}
</Row>


    </div>
  );
}
