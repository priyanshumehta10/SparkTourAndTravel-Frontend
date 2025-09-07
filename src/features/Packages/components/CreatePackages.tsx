import { useEffect, useRef, useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message, Switch, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createPackageRequest, resetCreated } from "../slice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../redux/store";

const { TextArea } = Input;

interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    lunch: boolean;
    breakfast: boolean;
    dinner: boolean;
    stay: string;
    highTea: boolean;
}

const CreatePackages = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const fetchData = useRef(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const [itinerary, setItinerary] = useState<ItineraryDay[]>([
        { day: 1, title: "", description: "", lunch: false, breakfast: false, dinner: false, highTea: false, stay: "" },
    ]);

    const { created, loading, tagData } = useSelector(
        (state: RootState) => state.packages
    );
    const { data } = useSelector(
        (state: RootState) => state.packageGroups
    );

    const simplifiedArray = data.map((item: any) => ({
        id: item._id,
        name: item.name
    }));
    const dispatch = useDispatch();

    const handleItineraryChange = (
        idx: number,
        field: keyof ItineraryDay,
        value: string | boolean
    ) => {
        setItinerary((prev) =>
            prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
        );
    };

    const addItineraryDay = () => {
        setItinerary((prev) => [
            ...prev,
            { day: prev.length + 1, title: "", description: "", lunch: false, breakfast: false, dinner: false, highTea: false, stay: "" },
        ]);
    };

    const removeItineraryDay = (idx: number) => {
        setItinerary((prev) =>
            prev.filter((_, i) => i !== idx).map((item, i) => ({ ...item, day: i + 1 }))
        );
    };

    const handleUploadChange = ({ fileList }: { fileList: any[] }) => {
        setFileList(fileList.slice(0, 5)); // Max 5 images
    };

    const onFinish = (values: any) => {

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (key === "tags" && Array.isArray(value)) {
                formData.append("tags", JSON.stringify(value));
            } else if (key !== "itinerary") {
                formData.append(key, value as any);
            }
        });

        // Append itinerary as JSON string
        itinerary.forEach((item: ItineraryDay, index: number) => {
            formData.append(`itinerary[${index}][day]`, String(item.day));
            formData.append(`itinerary[${index}][title]`, item.title);
            formData.append(`itinerary[${index}][description]`, item.description);

            // Meals & Stay
            formData.append(`itinerary[${index}][breakfast]`, String(item.breakfast || false));
            formData.append(`itinerary[${index}][lunch]`, String(item.lunch || false));
            formData.append(`itinerary[${index}][dinner]`, String(item.dinner || false));
            formData.append(`itinerary[${index}][highTea]`, String(item.highTea || false));
            formData.append(`itinerary[${index}][stay]`, item.stay || "");
        });

        fileList.forEach((file) => {
            if (file.originFileObj) {
                formData.append("images", file.originFileObj);
            }
        });

        dispatch(createPackageRequest(formData));

        setTimeout(() => {
        }, 1000);


    };
    useEffect(() => {
        if (!fetchData.current && created) {
            fetchData.current = true;
            navigate(-1);
            message.success("Package created successfully");

            if (created) dispatch((resetCreated()));
        }
    }, [created, dispatch]);

    return (
        <div className="max-w-2xl mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-6">Create Package</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                // force numeric widening so TS doesn't infer literal 0
                initialValues={{ discount: 0 as number, price: 0 as number, finalPrice: 0 as number, duration: "" }}
            >
                <Form.Item
                    label={<span className="text-white">Hot</span>}
                    name="Hot"
                    initialValue={false}
                >
                    <Switch
                        checkedChildren="ON"
                        unCheckedChildren="OFF"
                        className="custom-switch"

                    />

                </Form.Item>
                <Form.Item
                    label={<span className="text-white">Tags</span>}
                    name="tags"
                >
                    <Select
                        mode="multiple"
                        placeholder="Select tags"
                        className="w-full bg-black text-white"
                        options={tagData?.map((tag: { label: string, value: string }) => ({ label: tag, value: tag }))}
                    />
                </Form.Item>
                <Form.Item
                    label={<span className="text-white">Package Group</span>}
                    name="groupId"
                >
                    <Select
                        placeholder="Select tags"
                        className="w-full bg-black text-white"
                        options={simplifiedArray?.map((Group: { id: string, name: string }) => ({ label: Group.name, value: Group.id }))}
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white">Pricing Type</span>}
                    name="pricingType"
                    rules={[{ required: true, message: "Please select the pricing type" }]}
                >
                    <Select
                        placeholder="Select pricing type"
                        className="w-full bg-black text-white"
                        options={[
                            { label: "Per Person", value: "perPerson" },
                            { label: "Couple", value: "couple" },
                        ]}
                    />
                </Form.Item>


                <Form.Item
                    label={<span className="text-white">Title</span>}
                    name="title"
                    rules={[{ required: true, message: "Please enter the package title" }]}
                >
                    <Input className="bg-gray-800 text-white placeholder-gray-400" />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white">Description</span>}
                    name="description"
                    rules={[{ required: true, message: "Please enter the description" }]}
                >
                    <TextArea rows={3} className="bg-gray-800 text-white placeholder-gray-400" />
                </Form.Item>

                <div className="flex gap-4">
                    <Form.Item
                        label={<span className="text-white">Price (₹)</span>}
                        name="price"
                        className="flex-1"
                        rules={[{ required: true, message: "Please enter the price" }]}
                    >
                        <InputNumber<number>
                            min={0}
                            className="w-full bg-gray-800 text-white"
                            formatter={(value) => (value !== undefined && value !== null ? `₹${value}` : "")}
                            parser={(value) => (value ? Number(value.replace(/[₹,\s]/g, "")) : 0)}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-white">Discount (%)</span>}
                        name="discount"
                        className="flex-1"
                        rules={[{ required: true, message: "Please enter the discount" }]}
                    >
                        <InputNumber<number>
                            min={0}
                            max={100}
                            className="w-full bg-gray-800 text-white"
                            formatter={(value) => (value !== undefined && value !== null ? `${value}%` : "")}
                            parser={(value) => (value ? Number(value.replace(/%/g, "")) : 0)}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    label={<span className="text-white">Final Price (₹)</span>}
                    name="finalPrice"
                // rules={[{ required: true, message: "Please enter the final price" }]}
                >
                    <InputNumber<number>
                        min={0}
                        className="w-full bg-gray-800 text-white"
                        formatter={(value) => (value !== undefined && value !== null ? `₹${value}` : "")}
                        parser={(value) => (value ? Number(value.replace(/[₹,\s]/g, "")) : 0)}
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white">Duration</span>}
                    name="duration"
                    rules={[{ required: true, message: "Please enter the duration" }]}
                >
                    <Input
                        className="bg-gray-800 text-white placeholder-gray-400"
                        placeholder="e.g. 5 days 4 nights"
                    />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: "Please Upload atleast one image" }]} label={<span className="text-white">Images (max 5)</span>}>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                        multiple
                        maxCount={5}
                        accept="image/*"
                        className="dark"
                    >
                        {fileList.length < 5 && (
                            <div>
                                <PlusOutlined style={{ color: "#fff" }} />
                                <div style={{ marginTop: 8, color: "#fff" }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <div className="mb-4">
                    <label className="block text-white mb-2">Itinerary</label>
                    {itinerary.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-2 mb-4 border border-gray-700 p-3 rounded-lg">
                            <div className="flex gap-2">
                                <Input
                                    className="bg-gray-800 text-white placeholder-gray-400"
                                    placeholder="Day"
                                    style={{ width: 60 }}
                                    value={item.day}
                                    disabled
                                />
                                <Form.Item
                                    required
                                    validateStatus={!item.title ? "error" : ""}
                                    help={!item.title ? "Title is required" : ""}
                                    className="mb-0 flex-1"
                                >
                                    <Input
                                        className="bg-gray-800 text-white placeholder-gray-400"
                                        placeholder="Title"
                                        value={item.title}
                                        onChange={(e) => handleItineraryChange(idx, "title", e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    required
                                    validateStatus={!item.description ? "error" : ""}
                                    help={!item.description ? "Description is required" : ""}
                                    className="mb-0 flex-1"
                                >
                                    <Input
                                        className="bg-gray-800 text-white placeholder-gray-400"
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => handleItineraryChange(idx, "description", e.target.value)}
                                    />
                                </Form.Item>
                                <Button
                                    danger
                                    disabled={itinerary.length === 1}
                                    onClick={() => removeItineraryDay(idx)}
                                >
                                    Remove
                                </Button>
                            </div>

                            {/* Meals & Stay */}
                            <div className="flex flex-wrap gap-4 mt-2">
                                <label className="text-white flex items-center gap-2">
                                    <Switch
                                        checked={item.breakfast}
                                        onChange={(val) => handleItineraryChange(idx, "breakfast", val)}
                                    />
                                    Breakfast
                                </label>
                                <label className="text-white flex items-center gap-2">
                                    <Switch
                                        checked={item.lunch}
                                        onChange={(val) => handleItineraryChange(idx, "lunch", val)}
                                    />
                                    Lunch
                                </label>
                                <label className="text-white flex items-center gap-2">
                                    <Switch
                                        checked={item.dinner}
                                        onChange={(val) => handleItineraryChange(idx, "dinner", val)}
                                    />
                                    Dinner
                                </label>
                                <label className="text-white flex items-center gap-2">
                                    <Switch
                                        checked={item.highTea}
                                        onChange={(val) => handleItineraryChange(idx, "highTea", val)}
                                    />
                                    High Tea
                                </label>
                                <Input
                                    className="bg-gray-800 text-white placeholder-gray-400"
                                    placeholder="Stay (e.g., Hotel, Resort)"
                                    value={item.stay}
                                    onChange={(e) => handleItineraryChange(idx, "stay", e.target.value)}
                                />
                            </div>
                        </div>

                    ))}
                    <Button type="dashed" onClick={addItineraryDay} icon={<PlusOutlined />}>
                        Add Day
                    </Button>
                </div>

                <Form.Item
                    label={<span className="text-white">Tour Inclusions</span>}
                    name="tourInclusions"
                >
                    <TextArea rows={3} className="bg-gray-800 text-white placeholder-gray-400" />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white">Tour Exclusions</span>}
                    name="tourExclusions"
                >
                    <TextArea rows={3} className="bg-gray-800 text-white placeholder-gray-400" />
                </Form.Item>


                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                        Create Package
                    </Button>

                </Form.Item>
                <Form.Item>

                    <Button
                        className="w-full mt-4"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreatePackages;
