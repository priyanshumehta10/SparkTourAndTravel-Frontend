import { Card } from "antd";
import { motion } from "framer-motion";
import {
  CompassOutlined,
  ThunderboltOutlined,
  CustomerServiceOutlined,
  CreditCardOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

export default function HomeStatic() {
  const features = [
    {
      icon: <CompassOutlined className="text-4xl text-[#305BAB]" />,
      title: "Travel your way",
      desc: "We customize, you explore!",
    },
    {
      icon: <ThunderboltOutlined className="text-4xl text-[#305BAB]" />,
      title: "Instant Booking",
      desc: "One click and you're set!",
    },
    {
      icon: <CustomerServiceOutlined className="text-4xl text-[#305BAB]" />,
      title: "24/7 Support",
      desc: "We're here anytime, anywhere",
    },
    {
      icon: <CreditCardOutlined className="text-4xl text-[#305BAB]" />,
      title: "Flexible Payment",
      desc: "Pay less now, enjoy more later.",
    },
    {
      icon: <WhatsAppOutlined className="text-4xl text-[#305BAB]" />,
      title: "WhatsApp Alerts",
      desc: "Get travel updates instantly.",
    },
  ];

  return (
    <div className="relative bg-white py-20 px-6 md:px-20 text-center overflow-hidden">
      {/* Floating Background Blobs */}
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-[#FFD6E8] opacity-50 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-[#C6DCFF] opacity-40 blur-3xl"
      />

      {/* Hero Text Section */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-[#1a2753] mb-4"
      >
        Travel Different, Live More
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg md:text-xl text-[#305BAB] max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        DITCH THE USUAL, EMBRACE THE EXTRAORDINARY! TRAVEL IN A WAY THAT THRILLS
        YOUR SOUL AND FILLS YOUR LIFE WITH UNFORGETTABLE MOMENTS.
      </motion.p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-20">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card
              
              className="rounded-2xl shadow-lg border border-[#FFD6E8] h-full transition-all duration-300 hover:shadow-pink-200 hover:border-[#305BAB]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center text-center space-y-3"
              >
                {item.icon}
                <h3 className="text-lg font-semibold text-[#1a2753]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#305BAB]">{item.desc}</p>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Why Travelora Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative max-w-4xl mx-auto bg-gradient-to-r from-[#FFD6E8] via-[#C6DCFF] to-[#EAF2FF] p-12 rounded-3xl shadow-xl"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-[#1a2753] mb-4">
          Why Just Travel When You Can{" "}
          <span className="text-[#305BAB]">Travelora?</span>
        </h3>
        <p className="text-base md:text-lg text-[#1a2753] leading-relaxed">
          WE MAKE TRAVEL EASY, EXCITING, AND PERSONALIZED! FROM INSTANT BOOKINGS
          TO FLEXIBLE PAYMENTS AND 24/7 SUPPORT, WE ENSURE A SMOOTH JOURNEY.
          DISCOVER HIDDEN GEMS, LUXURY ESCAPES, AND UNBEATABLE DEALS. TRAVEL
          SMARTER, EXPLORE DEEPER, AND CREATE UNFORGETTABLE MEMORIES WITH{" "}
          <span className="font-semibold text-[#305BAB]">TRAVELORA</span>!
        </p>
      </motion.div>
    </div>
  );
}
