import { Layout } from "antd";

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer className="bg-[#1a2753] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        
        {/* Links */}
        <div className="flex flex-col space-y-3 md:items-start items-center">
          <h4 className="font-semibold text-[#1a2753] text-lg">Quick Links</h4>
          <a href="/privacy" className="hover:text-[#305BAB] transition">Privacy Policy</a>
          <a href="/userAgreement" className="hover:text-[#305BAB] transition">User Agreement</a>
          <a href="/terms" className="hover:text-[#305BAB] transition">Terms & Conditions</a>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold text-[#1a2753] text-lg mb-3">Contact Us</h4>
          <p className="text-sm">8529299647
            <br /> 8875949835
          </p>
          <p className="text-sm">gowithspark@gmail.com</p>
          <p className="text-sm">
             Shubash nagar , near vitthal service <br /> banswara rajasthan
          </p>
        </div>

        {/* Branding */}
        <div className="flex flex-col md:items-end items-center justify-center">
          <h4 className="font-bold text-[#1a2753] text-xl">Spark Tour & Travel</h4>
          <p className="text-sm text-gray-400">© 2025 Spark Tour and Travel</p>
          <p className="text-xs text-gray-400">All rights reserved</p>
        </div>
      </div>
    </Footer>
  );
}
