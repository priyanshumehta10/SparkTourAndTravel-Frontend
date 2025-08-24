import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { loginRequest } from "./slice";
import { Input, Button, Modal, message } from "antd";
import { CloseCircleFilled, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Group from "../../assets/Group.png";
import { useNavigate } from "react-router-dom";
export default function LoginModal() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleForgotPassword = () => {
    navigate("/forgetPassword")
  };
  const validatePassword = (password: string) => {
    if (password === "123") return true;
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };
  const handleSignUp = () => {
    navigate("/signup")
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      message.error("Please enter a valid email!");
      return;
    }
    if (!validatePassword(password)) {
      message.error(
        "Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }
    dispatch(loginRequest({ email, password }));
  };
  const handleClose = () => {
    navigate(-1)
  };
  return (
    <Modal
      open={true}
      footer={null}
      closable={false}
      centered
      width={1000} // WIDER MODAL
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

        {/* Right Form */}
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
            <p
              onClick={handleForgotPassword}
              className="text-sm text-white underline cursor-pointer mt-1 hover:text-gray-200"
            >
              Forgot Password?
            </p>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-white text-blue-900 hover:bg-gray-100 font-semibold"
            >
              LOGIN
            </Button>

            {/* Sign Up Link */}
            <p className="text-white text-right mt-2">
              Not a member?{" "}
              <span
                onClick={handleSignUp}
                className="underline cursor-pointer hover:text-gray-200 font-semibold"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </Modal>
  );
}
