import { useEffect, useRef } from "react";
import { Card, Carousel, Button, Popconfirm, Switch } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { fetchPackagesRequest, resetCreated, deletePackageRequest, fetchPackageRequest } from "./slice";
import { useNavigate } from "react-router-dom";

const index = () => {
    const fetchData = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loadingPck, created, error } = useSelector((state: RootState) => state.packages);

    const handleDelete = (id: string) => {
        dispatch(deletePackageRequest(id));
    };

    const handleEdit = (id: string) => {
        navigate(`/admin/packages/edit`);
        dispatch(fetchPackageRequest(id));
    };
    const handleCreate = () => {
        navigate("/admin/packages/create");
    };

    useEffect(() => {
        if (!fetchData.current || created) {
            fetchData.current = true;
            dispatch(fetchPackagesRequest());
            if (created) dispatch(resetCreated());
        }
    }, [created, dispatch]);

    return (
        loadingPck ? (
            <div className="h-screen flex items-center justify-center bg-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-100"></div>
            </div>
        ) : error ? (
            <div className="text-red-500 text-center">Error: {error}</div>
        ) : (
            <div className="min-h-screen py-8 px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xl font-bold text-white">Packages</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleCreate}
                    >
                        Create Package
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.map((pkg) => (
                        <Card
                            key={pkg._id}
                            className="bg-gray-800 border border-white rounded-xl shadow-lg text-white"
                            cover={
                                pkg.images && pkg.images.length > 0 ? (
                                    <Carousel
                                        dots
                                        className="rounded-t-xl"
                                        autoplay
                                        style={{ background: "#1f2937" }}
                                    >
                                        {pkg.images.slice(0, 5).map((img: any, idx: number) => (
                                            <img
                                                key={img._id || idx}
                                                src={img.url}
                                                alt={pkg.title}
                                                className="object-cover w-full h-56 rounded-t-xl"
                                            />
                                        ))}
                                    </Carousel>
                                ) : (
                                    <div className="flex items-center justify-center h-56 bg-gray-700 rounded-t-xl text-gray-400">
                                        No Images
                                    </div>
                                )
                            }
                            actions={[
                                <Button
                                    key="edit"
                                    type="primary"
                                    icon={<EditOutlined />}
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={() => handleEdit(pkg._id)}
                                >
                                    Edit
                                </Button>,
                                <Popconfirm
                                    key="delete"
                                    title="Are you sure to delete this package?"
                                    onConfirm={() => handleDelete(pkg._id)}
                                    okText="Yes"
                                    cancelText="No"
                                    okButtonProps={{ danger: true }}
                                >
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                    >
                                        Delete
                                    </Button>
                                </Popconfirm>,
                            ]}
                            bodyStyle={{ background: "#1f2937" }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-2">{pkg.title}</h2>
                            <p className="text-gray-300 mb-2">{pkg.description}</p>
                            <Switch
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                                className="custom-switch"
                                value={pkg.Hot}
                                disabled
                            />
                            <div className="mb-2">
                                <span className="text-gray-400">Duration: </span>
                                <span className="text-white">{pkg.duration}</span>
                            </div>
                            <div className="mb-2">
                                <span className="text-gray-400">Price: </span>
                                <span className="line-through text-red-400 mr-2">₹{pkg.price}</span>
                                <span className="text-green-400 font-bold">₹{pkg.finalPrice}</span>
                                <span className="ml-2 text-blue-400">({pkg.discount}% off)</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>)
    );
};
export default index;