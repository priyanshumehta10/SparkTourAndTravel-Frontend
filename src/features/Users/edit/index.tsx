import { useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { updateUserRequest } from "../slice";

interface UpdateUserModalProps {
  data: { name: string; _id: string; email: string; role: string };
  visible: boolean;
  onClose: () => void;
}

const { Option } = Select;

export default function UpdateUserModal({ data, visible, onClose }: UpdateUserModalProps) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.users);

  const [form] = Form.useForm();

  // Populate form fields from props
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        role: data.role || "user",
      });
    }
  }, [data, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        Modal.confirm({
          title: "Do you want to update this user?",
          content: "This action will overwrite the user details.",
          okText: "Yes, Update",
          cancelText: "No",
          onOk: () => {
            dispatch(updateUserRequest({ id: data._id, ...values }));
            message.success("User updated successfully");
            onClose();
          },
        });
      })
      .catch((info) => console.log("Validate Failed:", info));
  };

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Update"
      cancelText="Cancel"
      confirmLoading={loading}
      centered
      className="dark-mode-modal"
      bodyStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
      okButtonProps={{ style: { backgroundColor: "#2563eb", color: "#fff" } }}
      cancelButtonProps={{ style: { backgroundColor: "#374151", color: "#fff" } }}
    >
      <h2 className="text-white text-lg font-bold mb-4">Update User</h2>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input
            className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input
            className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select
            className="bg-gray-700 text-white border-gray-600"
            popupClassName="bg-gray-800 text-white"
          >
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
