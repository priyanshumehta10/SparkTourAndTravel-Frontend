// RefundPolicy.tsx
import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fff] flex justify-center items-center p-6">
      <Card className="max-w-4xl w-full shadow-xl rounded-2xl p-8 bg-white">
        <Typography>
          <Title level={2} className="text-center text-[#305BAB] mb-6">
            Refund & Cancellation Policy
          </Title>

          <Paragraph>
            We value our customers and strive to provide the best travel
            experience. However, we understand that plans may change. The
            following policy outlines the terms for cancellations and refunds of
            tour packages booked through our website.
          </Paragraph>

          <Title level={4}>1. General Terms</Title>
          <Paragraph>
            • This policy applies to all bookings made through our website. <br />
            • Refunds will be processed to the original mode of payment within
            7–10 working days after approval. <br />
            • Any applicable service charges, taxes, or transaction fees are
            non-refundable.
          </Paragraph>

          <Title level={4}>2. Cancellation & Refund Rules</Title>
          <Paragraph>
            • <b>Cancellation within 24 hours of booking</b> (for trips scheduled
            10 days or more from the booking date): <br />
            – 90% refund of the total paid amount. <br />
            – 10% deduction as a processing fee.
          </Paragraph>
          <Paragraph>
            • <b>Cancellation after 24 hours and within 48 hours of booking</b>{" "}
            (Any trip date): <br />
            – 80% refund of the total paid amount. <br />
            – 20% deduction as cancellation fee.
          </Paragraph>
          <Paragraph>
            • <b>Cancellation after 48 hours of booking and up to 2 days before
            the trip date:</b> <br />
            – 50% refund of the total paid amount. <br />
            – 50% deduction as cancellation fee.
          </Paragraph>
          <Paragraph>
            • <b>Cancellation within 2 days (48 hours) of the trip date:</b>{" "}
            <br />
            – No refund will be provided.
          </Paragraph>

          <Title level={4}>3. Important Notes</Title>
          <Paragraph>
            • All cancellations must be requested in writing via our official
            email or customer support channel. <br />
            • Refund eligibility is calculated from the date and time of booking
            confirmation. <br />
            • In case of unforeseen events (natural calamities, government
            restrictions, etc.), the company reserves the right to offer
            alternative solutions instead of refunds. <br />
            • The company holds the right to modify or update this policy at any
            time without prior notice.
          </Paragraph>

          <Title level={4}>4. Contact Information</Title>
          <Paragraph>
            For cancellation requests or refund-related queries, please contact: <br />
            • <b>Email:</b>{" "}
            <a
              href="mailto:gowithspark@gmail.com"
              className="text-[#305BAB] font-semibold"
            >
              gowithspark@gmail.com
            </a>{" "}
            <br />
            • <b>Phone:</b> 8875949835, 8529299647
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default RefundPolicy;
