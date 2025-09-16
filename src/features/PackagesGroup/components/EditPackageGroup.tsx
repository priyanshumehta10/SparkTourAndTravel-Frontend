import { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../redux/store";
import { editPackageGroupRequest, resetCreatedGroup } from "../slice";
import type { UploadFile } from "antd/es/upload/interface";



const EditPackageGroup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchData = useRef(false);

  // ✅ fileList is properly typed now
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { tagData } = useSelector(
    (state: RootState) => state.packages
  );
  const { dataPerGroup, loadingPerGroup, error, edited } = useSelector(
    (state: RootState) => state.packageGroups
  );

  useEffect(() => {
    if (dataPerGroup) {
      form.setFieldsValue({
        name: dataPerGroup.name,
        tags: dataPerGroup.tags
      });
      setFileList(
        dataPerGroup.photo
          ? [
            {
              uid: dataPerGroup._id,
              name: dataPerGroup.photo.public_id,
              status: "done",
              url: dataPerGroup.photo.url,
            } as UploadFile,
          ]
          : []
      );
    }
  }, [dataPerGroup, form]);

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.slice(0, 1)); // only one image allowed
  };

  const onFinish = (values: { name: string }) => {
    if (!dataPerGroup) return;

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "tags" && Array.isArray(value)) {
        formData.append("tags", JSON.stringify(value));
      }
    });

    formData.append("name", values.name);

    const existingImages: { url: string; public_id: string }[] = [];

    fileList.forEach((file) => {
      if (file.originFileObj) {
        // new image
        formData.append("photo", file.originFileObj as Blob);
      } else if (file.url && file.name) {
        // existing image
        existingImages.push({
          url: file.url,
          public_id: file.name,
        });
      }
    });

    formData.append("existingPhoto", JSON.stringify(existingImages));
    formData.append("packageIds", JSON.stringify([dataPerGroup._id]));

    dispatch(editPackageGroupRequest(formData));
  };

  useEffect(() => {
    if (!fetchData.current && edited) {
      fetchData.current = true;
      navigate(-1);
      message.success("Package Group updated successfully");
      dispatch(resetCreatedGroup());
    }
  }, [edited, dispatch, navigate]);

  if (loadingPerGroup) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-100"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Edit Package Group</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={<span className="text-white">Title</span>}
          name="name"
          rules={[{ required: true, message: "Please enter the group title" }]}
        >
          <Input className="bg-gray-800 text-white placeholder-gray-400" />
        </Form.Item>

        <Form.Item
          label={<span className="text-white">Tags</span>}
          name="tags"
        >
          <Select
            mode="multiple"
            placeholder="Select tags"
            className="w-full bg-black text-white"
            options={tagData?.map((tag) => ({ label: tag, value: tag }))}
          />
        </Form.Item>

        <Form.Item label={<span className="text-white">Photo</span>} required>
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
            loading={loadingPerGroup}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Update Group
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

export default EditPackageGroup;
