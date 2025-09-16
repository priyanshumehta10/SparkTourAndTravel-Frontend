import { useEffect, useRef } from "react";
import { Card, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
    fetchPackageGroupsRequest,
    resetCreatedGroup,
    deletePackageGroupRequest,
    fetchPackageGroupRequest,
} from "./slice";
import {fetchAllTagRequest} from "../Packages/slice"
import { useNavigate } from "react-router-dom";

const PackageGroups = () => {
    const fetchData = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, created, error } = useSelector((state: RootState) => state.packageGroups);

    const handleDelete = (id: string) => {
        dispatch(deletePackageGroupRequest(id));
    };

    const handleEdit = (id: string) => {
        navigate(`/admin/packageGroups/edit`);
        dispatch(fetchPackageGroupRequest(id));
    };

    const handleCreate = () => {
        navigate("/admin/packageGroups/create");
    };

    useEffect(() => {
        if (!fetchData.current || created) {
            fetchData.current = true;
            dispatch(fetchPackageGroupsRequest());
            dispatch(fetchAllTagRequest());

            if (created) dispatch(resetCreatedGroup());
        }
    }, [created, dispatch]);

    return (
        loading ? (
            <div className="h-screen flex items-center justify-center bg-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-100"></div>
            </div>
        ) : error ? (
            <div className="text-red-500 text-center">Error: {error}</div>
        ) : (
            <div className="min-h-screen py-8 px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xl font-bold text-white">Package Groups</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleCreate}
                    >
                        Create Group
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.map((group: any) => (
                        <Card
                            key={group._id}
                            className="bg-gray-800 border border-white rounded-xl shadow-lg text-white"
                            cover={
                                group.photo ? (
                                    <img
                                        src={group.photo.url}
                                        alt={group.name}
                                        className="object-cover w-full h-56 rounded-t-xl"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-56 bg-gray-700 rounded-t-xl text-gray-400">
                                        No Image
                                    </div>
                                )
                            }
                            actions={[
                                <Button
                                    key="edit"
                                    type="primary"
                                    icon={<EditOutlined />}
                                    className="bg-blue-600 hover:bg-blue-700"
                                    onClick={() => handleEdit(group._id)}
                                >
                                    Edit
                                </Button>,
                                <Popconfirm
                                    key="delete"
                                    title="Are you sure to delete this group?"
                                    onConfirm={() => handleDelete(group._id)}
                                    okText="Yes"
                                    cancelText="No"
                                    okButtonProps={{ danger: true }}
                                >
                                    <Button danger icon={<DeleteOutlined />}>
                                        Delete
                                    </Button>
                                </Popconfirm>,
                            ]}
                            bodyStyle={{ background: "#1f2937" }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-2">{group.name}</h2>

                        </Card>
                    ))}
                </div>
            </div>
        )
    );
};

export default PackageGroups;
