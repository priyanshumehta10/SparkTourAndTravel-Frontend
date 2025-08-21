import { Form, Input, Button, Rate, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createReviewRequest } from "../slice";
import type { RootState } from "../../../redux/store";

const { TextArea } = Input;

const CreateReview = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
    const {  loading } = useSelector((state: RootState) => state.review);

  const onFinish = (values: any) => {
    const payload = {
      username: values.username,
      message: values.message,
      star: values.star?.toString() || "1",
    };

    dispatch(createReviewRequest(payload));

    console.log(payload);
  };

  return (
    <div className="p-4 shadow-lg rounded-xl bg-gray-800 text-white border border-white">
      <h2 className="text-2xl font-semibold mb-6 text-left">Create Review</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ star: 1 }}
      >
        <Form.Item
          label={<span className="text-white">Username</span>}
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input className="bg-gray-700 text-white placeholder-gray-400" />
        </Form.Item>
        <Form.Item
          label={<span className="text-white">Message</span>}
          name="message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <TextArea rows={4} className="bg-gray-700 text-white placeholder-gray-400" />
        </Form.Item>
        <Form.Item
          label={<span className="text-white">Star</span>}
          name="star"
          rules={[{ required: true, message: "Please select a rating" }]}
        >
          <Rate count={5} className="custom-dark-rate" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? <Spin/> :"Submit Review"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateReview;