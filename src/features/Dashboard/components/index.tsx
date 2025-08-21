
import { Pie } from "@ant-design/plots";

export default function DemoPie() {
  const data = [
    { type: "Admins", value: 3 },
    { type: "Users", value: 17 }
  ];

  return (
    <div style={{ height: 300 }}>
      <Pie
        data={data}
        angleField="value"
        colorField="type"
        radius={0.8}
        autoFit
        label={{ type: "outer", content: "{type}: {value}", style: { fill: "#fff" } }}
        color={["#2563eb", "#10b981"]}
        interactions={[{ type: "element-active" }]}
      />
    </div>
  );
}
