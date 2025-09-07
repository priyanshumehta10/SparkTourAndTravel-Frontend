import { useEffect, useRef, useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message, Switch, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { editPackageRequest, resetCreated } from "../slice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../redux/store";

const { TextArea } = Input;

interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    highTea: boolean;
    stay: string;
    _id?: string;
}

interface ImageItem {
    url: string;
    public_id: string;
    _id: string;
}

export interface PackageData {
    _id: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    finalPrice: number;
    duration: string;
    images: ImageItem[];
    itinerary: ItineraryDay[];
    Hot: boolean;
    tags: string[];
    group?: string[];
    tourInclusions:string;
    tourExclusions:string;

}

export interface PackagesState {
    dataPerPck: PackageData | null;
    loadingPerPck: boolean;
    error: string | null;
    edited: boolean;
    loading: boolean;
    tagData?: any[];
}


const EditPackage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<any[]>([]);
    const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
    const dispatch = useDispatch();
    const fetchData = useRef(false);


    const { dataPerPck, loadingPerPck, error, edited, loading, tagData } = useSelector(
        (state: RootState) => state.packages as PackagesState
    );
    const { data } = useSelector(
        (state: RootState) => state.packageGroups
    );

    const simplifiedArray = data.map((item: any) => ({
        id: item._id,
        name: item.name
    }));
    useEffect(() => {
        if (dataPerPck) {
            form.setFieldsValue({
                title: dataPerPck.title,
                description: dataPerPck.description,
                price: dataPerPck.price,
                discount: dataPerPck.discount,
                finalPrice: dataPerPck.finalPrice,
                duration: dataPerPck.duration,
                Hot: dataPerPck.Hot,
                tags: dataPerPck.tags,
                groupId: dataPerPck.group,
                tourExclusions: dataPerPck.tourExclusions,
                tourInclusions: dataPerPck.tourInclusions

            });

            setItinerary(dataPerPck.itinerary);

            setFileList(
                dataPerPck.images.map((img: ImageItem) => ({
                    uid: img._id,
                    name: img.public_id,
                    status: "done",
                    url: img.url,
                }))
            );
        }
    }, [dataPerPck, form]);

    const handleItineraryChange = <K extends keyof ItineraryDay>(
        idx: number,
        field: K,
        value: ItineraryDay[K]
    ) => {
        setItinerary(prev =>
            prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
        );
    };


    const addItineraryDay = () => {
        setItinerary(prev => [
            ...prev,
            {
                day: prev.length + 1,
                title: "",
                description: "",
                breakfast: false,
                lunch: false,
                dinner: false,
                highTea: false,
                stay: "",
            },
        ]);
    };

    const removeItineraryDay = (idx: number) => {
        setItinerary((prev) =>
            prev.filter((_, i) => i !== idx).map((item, i) => ({ ...item, day: i + 1 }))
        );
    };

    const handleUploadChange = ({ fileList }: { fileList: any[] }) => {
        setFileList(fileList.slice(0, 5));
    };

    const onFinish = (values: any) => {
        if (!dataPerPck) return;

        const formData = new FormData();

        // Append normal values
        Object.entries(values).forEach(([key, value]) => {
            if (key === "tags" && Array.isArray(value)) {
                formData.append("tags", JSON.stringify(value));
            } else if (key !== "itinerary") {
                formData.append(key, value as any);
            }
        });

        // Append itinerary
        itinerary.forEach((item, index) => {
            formData.append(`itinerary[${index}][day]`, String(item.day));
            formData.append(`itinerary[${index}][title]`, item.title);
            formData.append(`itinerary[${index}][description]`, item.description);
            formData.append(`itinerary[${index}][breakfast]`, String(item.breakfast));
            formData.append(`itinerary[${index}][lunch]`, String(item.lunch));
            formData.append(`itinerary[${index}][dinner]`, String(item.dinner));
            formData.append(`itinerary[${index}][highTea]`, String(item.highTea));
            formData.append(`itinerary[${index}][stay]`, item.stay);
            if (item._id) formData.append(`itinerary[${index}][_id]`, item._id);
        });

        const existingImages: { url: string; public_id: string }[] = [];

        // Handle images
        fileList.forEach((file) => {
            if (file.originFileObj) {
                // New images (files)
                formData.append("images", file.originFileObj);
            } else {

                existingImages.push({
                    url: file.url,
                    public_id: file.name,
                });
            }
        });

        // Send existing images as JSON
        formData.append("existingImages", JSON.stringify(existingImages));


        formData.append("_id", dataPerPck._id);

        dispatch(editPackageRequest(formData));



    };

    useEffect(() => {
        if (!fetchData.current && edited) {
            fetchData.current = true;
            navigate(-1);
            message.success("Package updated successfully");

            if (edited) dispatch((resetCreated()));
        }
    }, [edited, dispatch]);
    if (loadingPerPck) {
        return <div className="h-screen flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-100"></div>
        </div>
    }

    if (error) {
        return <div className="text-center text-red-500 mt-8">{error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-6">Edit Package</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                {/* Title */}
                <Form.Item
                    label={<span className="text-white">Hot</span>}
                    name="Hot"
                    rules={[{ required: true, message: "Is this a Hot Package" }]}
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
                        options={tagData?.map((tag) => ({ label: tag, value: tag }))}
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
                    label={<span className="text-white">Title</span>}
                    name="title"
                    rules={[{ required: true, message: "Please enter the package title" }]}
                >
                    <Input className="bg-gray-800 text-white placeholder-gray-400" />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    label={<span className="text-white">Description</span>}
                    name="description"
                    rules={[{ required: true, message: "Please enter the description" }]}
                >
                    <TextArea
                        rows={3}
                        className="bg-gray-800 text-white placeholder-gray-400"
                    />
                </Form.Item>

                {/* Price & Discount */}
                <div className="flex gap-4">
                    <Form.Item label={<span className="text-white">Price (₹)</span>}
                        name="price" className="flex-1">
                        <InputNumber<number>
                            min={0}
                            className="w-full bg-gray-800 text-white"
                            formatter={(value) => (value ? `₹${value}` : "")}
                            parser={(value) =>
                                value ? Number(value.replace(/[₹,\s]/g, "")) : 0
                            }
                        />
                    </Form.Item>
                    <Form.Item label={<span className="text-white">Discount (%)</span>}
                        name="discount" className="flex-1">
                        <InputNumber<number>
                            min={0}
                            max={100}
                            className="w-full bg-gray-800 text-white"
                            formatter={(value) => (value ? `${value}%` : "")}
                            parser={(value) =>
                                value ? Number(value.replace(/%/g, "")) : 0
                            }
                        />
                    </Form.Item>
                </div>

                {/* Final Price */}
                <Form.Item label={<span className="text-white">Final Price (₹)</span>}
                    name="finalPrice">
                    <InputNumber<number>
                        min={0}
                        className="w-full bg-gray-800 text-white"
                        formatter={(value) => (value ? `₹${value}` : "")}
                        parser={(value) =>
                            value ? Number(value.replace(/[₹,\s]/g, "")) : 0
                        }
                    />
                </Form.Item>

                {/* Duration */}
                <Form.Item label={<span className="text-white">Duration</span>}
                    name="duration">
                    <Input className="bg-gray-800 text-white placeholder-gray-400" />
                </Form.Item>

                {/* Images */}
                <Form.Item label={<span className="text-white">Images (max 5)</span>}>
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

                {/* Itinerary */}
                <div className="mb-4">
                    <label className="block text-white mb-2">Itinerary</label>
                    {itinerary.map((item, idx) => (
                        <div key={item._id || idx} className="mb-4 border-b border-gray-700 pb-2">
                            <div className="flex gap-2 mb-2">
                                <Input
                                    className="bg-gray-800 text-white placeholder-gray-400"
                                    style={{ width: 60, color: "#fff" }}
                                    value={item.day}
                                    disabled
                                />
                                <Input
                                    className="bg-gray-800 text-white flex-1"
                                    placeholder="Title"
                                    value={item.title}
                                    onChange={(e) =>
                                        handleItineraryChange(idx, "title", e.target.value)
                                    }
                                />
                                <Input
                                    className="bg-gray-800 text-white flex-1"
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) =>
                                        handleItineraryChange(idx, "description", e.target.value)
                                    }
                                />
                                <Button
                                    danger
                                    disabled={itinerary.length === 1}
                                    onClick={() => removeItineraryDay(idx)}
                                >
                                    Remove
                                </Button>
                            </div>

                            {/* Meal switches and stay input */}
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
                                    placeholder="Stay (Hotel, Resort...)"
                                    value={item.stay}
                                    onChange={(e) => handleItineraryChange(idx, "stay", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}

                    <Button
                        type="dashed"
                        onClick={addItineraryDay}
                        icon={<PlusOutlined />}
                    >
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
                

                {/* Submit / Cancel */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                        Update Package
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

export default EditPackage;
