// TermsConditions.tsx
import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fff] flex justify-center items-center p-6">
      <Card className="max-w-4xl w-full shadow-xl rounded-2xl p-8 bg-white">
        <Typography>
          <Title level={2} className="text-center text-[#305BAB] mb-6">
            Terms & Conditions
          </Title>

          <Title level={4}>Acceptance of Terms</Title>
          <Paragraph>
            By accessing Spark Tour & Travels, you agree to comply with these terms.
          </Paragraph>

          <Title level={4}>Use of Services</Title>
          <Paragraph>
            Our website is for personal and lawful use only. <br />
            You agree not to misuse or manipulate data.
          </Paragraph>

          <Title level={4}>Booking Policy</Title>
          <Paragraph>
            Prices are subject to change without notice. <br />
            Availability of packages may vary.
          </Paragraph>

          <Title level={4}>Payment & Security</Title>
          <Paragraph>
            Secure payment gateways are used for transactions. <br />
            We do not store your financial details.
          </Paragraph>

          <Title level={4}>Liability & Travel Risks</Title>
          <Paragraph>
            We are not responsible for unforeseen circumstances affecting your trip (e.g.,
            weather, political issues). <br />
            Customers should ensure they have valid travel documents.
          </Paragraph>

          <Title level={4}>Changes & Termination</Title>
          <Paragraph>
            We may modify services or terminate accounts violating our policies. <br />
            Your continued use signifies acceptance of changes.
          </Paragraph>

          <Title level={4}>Governing Law</Title>
          <Paragraph>
            These terms are governed by Indian laws.
          </Paragraph>

          <Title level={4}>Contact Us</Title>
          <Paragraph>
            For assistance, reach out at{" "}
            <a href="mailto:gowithspark@gmail.com" className="text-[#305BAB] font-semibold">
              gowithspark@gmail.com
            </a>
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default TermsConditions;
