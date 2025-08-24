import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { signupRequest, signupReset } from "./slice";
import { Input, Button, Modal, message } from "antd";
import { CloseCircleFilled, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Group from "../../assets/Group.png";
import { useNavigate } from "react-router-dom";

export default function SignUpModal() {
    const dispatch = useDispatch();
    const { loading, error, signupConfirmation } = useSelector((state: RootState) => state.signup); // Replace with signup slice if available
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password: string) => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            message.error("Please enter your full name!");
            return;
        }
        if (!validateEmail(email)) {
            message.error("Please enter a valid email!");
            return;
        }
        if (!validatePassword(password)) {
            message.error(
                'Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character.'
            );
            return;
        }
        if (password !== confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }

        // Replace loginRequest with signupRequest if you have one
        dispatch(signupRequest({ name, email, password }));
    };

    useEffect(() => {
        if (signupConfirmation) {
            message.success(
                'User created successfully, please log in with your credentials.'
            );
            navigate("/login");
            dispatch(signupReset())

        }
    }, [dispatch]);

    const handleClose = () => {
        navigate("/");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <Modal
            open={true}
            footer={null}
            closable={false}
            centered
            width={1000}
            className="rounded-2xl overflow-hidden"
            bodyStyle={{ padding: "0" }}
        >
            <div className="flex flex-col md:flex-row min-h-[500px]">
                {/* Left Image */}
                <div className="md:w-1/2 hidden md:block">
                    <img
                        src={Group}
                        alt="Travel"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="md:w-1/2 w-full bg-blue-900 p-12 flex flex-col justify-center">
                    {/* Custom Close Button */}
                    <CloseCircleFilled
                        onClick={handleClose}
                        className="absolute top-4 right-4 bg-amber-50  text-white rounded-xl text-xl cursor-pointer hover:text-gray-300"
                    />
                    <h2 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
                        Spark Your Journey with Us!
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="rounded-md"
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded-md"
                            />
                        </div>

                        <div>
                            <Input.Password
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                className="rounded-md"
                            />
                        </div>

                        <div>
                            <Input.Password
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                className="rounded-md"
                            />
                        </div>


                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            className="bg-white text-blue-900 hover:bg-gray-100 font-semibold"
                        >
                            SIGN UP
                        </Button>

                        <p className="text-white text-right mt-2">
                            Already a member?{" "}
                            <span
                                onClick={handleLogin}
                                className="underline cursor-pointer hover:text-gray-200 font-semibold"
                            >
                                Login
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
