import { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../redux/store";
import { createPackageGroupRequest, resetCreatedGroup } from "../slice";

const CreatePackageGroup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const fetchData = useRef(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const { created, loading } = useSelector(
    (state: RootState) => state.packageGroups
  );
  const dispatch = useDispatch();

  const handleUploadChange = ({ fileList }: { fileList: any[] }) => {
    setFileList(fileList.slice(0, 1)); // Only 1 image allowed
  };

  const onFinish = (values: any) => {
    const formData = new FormData();

    // Append title
    formData.append("name", values.name);

    // Append photo (only 1)
    if (fileList[0]?.originFileObj) {
      formData.append("photo", fileList[0].originFileObj);
    }

    dispatch(createPackageGroupRequest(formData));
  };

  useEffect(() => {
    if (!fetchData.current && created) {
      fetchData.current = true;
      navigate(-1);
      message.success("Package Group created successfully");
      dispatch(resetCreatedGroup());
    }
  }, [created, dispatch, navigate]);

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Create Package Group</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={<span className="text-white">Title</span>}
          name="name"
          rules={[{ required: true, message: "Please enter the group title" }]}
        >
          <Input className="bg-gray-800 text-white placeholder-gray-400" />
        </Form.Item>

        <Form.Item
          label={<span className="text-white">Photo</span>}
          required
          rules={[{ required: true, message: "Please upload one photo" }]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
          >
            {fileList.length < 1 && (
              <div>
                <PlusOutlined style={{ color: "#fff" }} />
                <div style={{ marginTop: 8, color: "#fff" }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Create Group
          </Button>
        </Form.Item>

        <Form.Item>
          <Button className="w-full mt-4" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePackageGroup;
