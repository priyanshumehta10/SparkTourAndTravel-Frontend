import { Form, Input, Button, Rate, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createReviewRequest } from "../slice";
import type { RootState } from "../../../redux/store";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;

const CreateReview = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.review);
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = (values: any) => {
    const payload = new FormData();
    payload.append("username", values.username);
    payload.append("message", values.message);
    payload.append("star", values.star?.toString() || "1");

    if (fileList.length > 0) {
      payload.append("image", fileList[0].originFileObj); // must match multer field
    }

    dispatch(createReviewRequest(payload));
  };



  return (
    <div className="p-4 shadow-lg rounded-xl bg-gray-800 text-white border border-white">
      <h2 className="text-2xl font-semibold mb-6 text-left">Create Review</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ star: 1 }}>
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

        <Form.Item label={<span className="text-white">Photo</span>}>
          <Upload
            beforeUpload={() => false} // prevent auto-upload
            onRemove={() => setFileList([])}
            fileList={fileList}
            maxCount={1}
            listType="picture"
            onChange={({ fileList }) => setFileList(fileList)}
          >
            <Button icon={<UploadOutlined />} disabled={fileList.length >= 1}>
              Upload Photo
            </Button>
          </Upload>
        </Form.Item>


        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ?
 <div className="h-screen flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-100"></div>
                      </div>
              : "Submit Review"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateReview;
