import { Card } from "antd";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen from-white via-[#fdf2f8] to-[#c6dcff] flex justify-center py-10 px-4">
      <Card
        className="max-w-4xl w-full shadow-2xl rounded-2xl p-8 from-[#1a2753] to-pink-600 border-t-8 border-[#305BAB]"
      >
        <h1 className="text-3xl font-bold text-[#1a2753] mb-6 text-center">
          Privacy Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#305BAB]">Introduction</h2>
          <p className="text-gray-700 mt-2">
            Welcome! Your privacy is important to us. This policy explains how
            we collect, use, and protect your personal data. By using our
            website, you agree to these terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#305BAB]">Data We Collect</h2>
          <ul className="list-disc ml-6 text-gray-700 mt-2">
            <li>Personal Info: Name, email, contact details.</li>
            <li>Travel Preferences: Destinations, dates, accommodations.</li>
            <li>Payment Data: Credit card details for bookings.</li>
            <li>Usage Data: Browsing history, clicks, searches.</li>
            <li>Device Info: IP address, browser, operating system.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#305BAB]">Cookies</h2>
          <p className="text-gray-700 mt-2">
            We use cookies to improve your experience. You can manage cookie
            settings in your browser, though disabling them may affect website
            functionality.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#305BAB]">
            Data Retention & Deletion
          </h2>
          <p className="text-gray-700 mt-2">
            We keep your data only as long as needed. You can request deletion,
            subject to legal obligations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#305BAB]">Your Rights</h2>
          <ul className="list-disc ml-6 text-gray-700 mt-2">
            <li>Access, update, or delete your data.</li>
            <li>Object to data processing.</li>
            <li>Request data in a structured format.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#305BAB]">Updates</h2>
          <p className="text-gray-700 mt-2">
            We may update this policy periodically. Please review it regularly.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#305BAB]">Complaints</h2>
          <p className="text-gray-700 mt-2">
            For concerns, contact us. If unresolved, you may approach your local
            data protection authority.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#305BAB]">Contact Us</h2>
          <p className="text-gray-700 mt-2">
             8875949835 <br />
            <a href="mailto:gowithspark@gmail.com" className="text-[#305BAB] font-semibold">
              gowithspark@gmail.com
            </a>
            <br/>
             Bahubali Colony Road, Near Vithal Service Center, Banswara
            (Raj.) 327001
          </p>
        </section>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">
            © 2025 Spark Tour and Travel. All Rights Reserved.
          </p>
        </div>
      </Card>
    </div>
  );
}
