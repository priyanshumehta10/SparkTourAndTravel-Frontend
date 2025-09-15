import { Form, Input, Button, Card, Alert } from "antd";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createInquiryRequest, resetCreated } from "./slice";
import type { RootState } from "../../redux/store";

export default function ContactPage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loadingContact, created, errorContact, InquiryData  } = useSelector((state: RootState) => state.Inquiry);

  const onFinish = (values: any) => {
    console.log("Contact Form InquiryData:", values);
    dispatch(createInquiryRequest(values));
  };

  // ✅ Reset form fields when inquiry is successfully created
  useEffect(() => {
    if (created) {
      form.resetFields();
    }
  }, [created, form]);

    useEffect(() => {
    if (created && InquiryData) {
      const timer = setTimeout(() => {
        dispatch(resetCreated());
      }, 5000); // ⏳ hide after 5 seconds

      return () => clearTimeout(timer); // cleanup
    }
  }, [created, InquiryData, dispatch]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {errorContact && (
          <Alert
            message={errorContact}
            type="error"
            showIcon
            className="mt-2 rounded-lg"
          />
        )}

        {created && InquiryData && (
          <Alert
            message={InquiryData}
            type="success"
            showIcon
            className="mt-2 rounded-lg"
          />
        )}
        {/* 🎨 Gradient Contact Card */}
        <Card
          className="shadow-2xl rounded-2xl p-6"
          style={{
            background: "linear-gradient(225deg, #FFDEE9, #ffffff, #C6DCFF)", // pink → white → blue
          }}
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-[#1A2753]">
            Contact Us
          </h1>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input className="rounded-md" />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input className="rounded-md" />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input className="rounded-md" />
            </Form.Item>

            <Form.Item
              name="mobileNumber"
              label="Mobile Number"
              rules={[{ required: true, message: "Please enter mobile number" }]}
            >
              <Input className="rounded-md" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={4} className="rounded-md" />
            </Form.Item>

            <div className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="px-6 py-2 rounded-full font-semibold"
                style={{
                  backgroundColor: "#305BAB",
                  borderColor: "#305BAB",
                }}
              >
                {loadingContact ?
                  <div className="h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-100"></div>
                  </div>
                  : "Send Message"}
              </Button>
            </div>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
