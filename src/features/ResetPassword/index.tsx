import { useState } from "react";
import { Input, Button, Modal, message } from "antd";
import { CloseCircleFilled, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Group from "../../assets/Group.png";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordModal() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleClose = () => {
    navigate(-1);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      message.error("Please enter a valid email!");
      return;
    }

    // TODO: Send OTP API call
    message.success(`OTP sent to ${email}`);
    setOtpSent(true); // Lock email input and show OTP + password fields
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      message.error("Please enter OTP!");
      return;
    }
    if (!validatePassword(newPassword)) {
      message.error(
        'Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character.'
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    // TODO: Verify OTP & Reset Password API call
    message.success("Password reset successful! Please login with new credentials.");
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
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex flex-col md:flex-row min-h-[500px] relative">
        {/* Left Image */}
        <div className="md:w-1/2 hidden md:block">
          <img src={Group} alt="Travel" className="w-full h-full object-cover" />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full bg-blue-900 relative">
          {/* Close Button */}
          <CloseCircleFilled
            onClick={handleClose}
            className="absolute top-4 right-4 bg-amber-50 text-white rounded-xl text-xl cursor-pointer hover:text-gray-300"
          />

          <div className="p-12 flex flex-col justify-center">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
              Forgot Password
            </h2>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-md"
                />

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="bg-white text-blue-900 hover:bg-gray-100 font-semibold"
                >
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <Input
                  placeholder="Email"
                  value={email}
                  disabled
                  className="rounded-md cursor-not-allowed"
                  style={{
                    backgroundColor: "#1F2937", // Tailwind blue-900 equivalent
                    color: "#FFFFFF",           // White text
                    opacity: 1,                 // Prevent AntD from dimming
                    borderColor: "#3B82F6",     // Optional: Tailwind blue-500 border
                  }}
                />


                <Input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="rounded-md"
                />

                <Input.Password
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="rounded-md"
                />

                <Input.Password
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="rounded-md"
                />

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="bg-white text-blue-900 hover:bg-gray-100 font-semibold"
                >
                  Reset Password
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
