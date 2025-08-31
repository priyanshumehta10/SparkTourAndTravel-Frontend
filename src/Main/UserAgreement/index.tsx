// UserAgreement.tsx
import React from "react";

const UserAgreement: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#fff] rounded-2xl shadow-lg text-[#1a2753] mt-6">
      <h1 className="text-3xl font-bold text-center mb-6">User Agreement</h1>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p>
          By using <span className="font-semibold">Spark Tour & Travels</span>, you agree to these terms. 
          If you disagree, please do not use our services.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Provide accurate details while booking.</li>
          <li>Use the website lawfully and respectfully.</li>
          <li>Do not share your account credentials.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Booking & Payments</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>A 50% deposit confirms your booking; the rest is due at checkout.</li>
          <li>All transactions are securely processed.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Cancellations & Refunds</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Cancellation policies vary per package.</li>
          <li>Refunds are processed based on the terms at the time of booking.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
        <p>
          We strive for accurate information, but we are not liable for unforeseen 
          travel disruptions.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate our terms.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Changes to Agreement</h2>
        <p>
          We may update this agreement. Continued use of our website means you accept 
          these changes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          For concerns, email us at{" "}
          <a
            href="mailto:gowithspark@gmail.com"
            className="text-[#305BAB] underline"
          >
            gowithspark@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default UserAgreement;
