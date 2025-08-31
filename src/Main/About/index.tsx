import React from "react";
import { motion } from "framer-motion";
import CoFounder from "../../assets/co-founder.jpg"
import founder from "../../assets/founder.jpeg"
import Mission from "../../assets/our_mission.png"
import promise from "../../assets/our_promise.png"
import WhoWeAre from "../../assets/who_we_are.png"


const About: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white via-[#fdf2f8] to-[#c6dcff] text-gray-800 px-6 md:px-16 lg:px-28 py-16 space-y-24">
      {/* Who We Are Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={WhoWeAre}
            alt="Who We Are"
            className="rounded-2xl shadow-xl w-full md:w-4/5 object-cover"
          />
        </div>

        {/* Text */}
        <div className="bg-gradient-to-r from-pink-100 via-white to-blue-100 p-8 rounded-2xl shadow-lg text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1a2753] to-pink-600 bg-clip-text text-transparent">
            Who We Are?
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mt-2">
            Your Travel, Your Way!
          </h3>
          <p className="mt-6 text-gray-700 leading-relaxed">
            <span className="text-lg font-semibold text-[#305BAB]">
              We&apos;re more than just a travel service – we&apos;re your travel family!
            </span>{" "}
            Every journey should be filled with{" "}
            <span className="text-pink-500 font-semibold">
              joy, discovery, and unforgettable memories
            </span>
            . That&apos;s why we make travel easy, exciting, and stress-free,
            so you can focus on what truly matters –{" "}
            <span className="text-[#1a2753] font-medium">
              exploring the world your way!
            </span>
            <br />
            <br />
            From hidden gems to iconic destinations, solo adventures to family
            getaways – we&apos;re here to turn your dream trips into reality.
            With seamless bookings, 24/7 support, and personalized experiences,
            we&apos;re always by your side – because{" "}
            <span className="text-pink-500 font-semibold">
              your adventure is our passion!
            </span>
          </p>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Text */}
        <div className="bg-gradient-to-r from-blue-100 via-white to-pink-100 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#305BAB] to-pink-600 bg-clip-text text-transparent mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to make every journey seamless, stress-free, and
            truly unforgettable. We offer hassle-free bookings, handpicked
            experiences, flexible payment options, and 24/7 support.
            <br />
            <br />
            We go beyond just travel planning – we create experiences that bring
            people closer to{" "}
            <span className="font-medium text-[#1a2753]">
              new cultures, breathtaking landscapes, and unforgettable
              adventures
            </span>
            . Whether it&apos;s a solo escape, a family vacation, or an
            adrenaline-packed adventure, we ensure every traveler finds their
            perfect trip.
            <br />
            <br />
            Let&apos;s redefine the way the world travels – one unforgettable
            trip at a time!
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={Mission}
            alt="Our Mission"
            className="rounded-2xl shadow-xl w-full md:w-4/5 object-cover"
          />
        </div>
      </motion.div>

      {/* Promise Section */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Image */}
        <div className="flex justify-center order-1 md:order-none">
          <img
            src={promise}
            alt="Our Promise"
            className="rounded-2xl shadow-xl w-full md:w-4/5 object-cover"
          />
        </div>

        {/* Text */}
        <div className="bg-gradient-to-r from-pink-100 via-white to-blue-100 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-[#305BAB] bg-clip-text text-transparent mb-4">
            Our Promise to You
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Seamless Planning – No stress, just smooth and easy bookings.</li>
            <li>Handpicked Experiences – Only the best stays, destinations, and adventures.</li>
            <li>24/7 Support – Because you should never feel lost on your journey.</li>
            <li>Flexible & Affordable – Travel your way, at your pace.</li>
          </ul>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Above all, we promise to treat your adventures like our own, ensuring
            every trip is filled with{" "}
            <span className="text-pink-500 font-medium">
              joy, discovery, and unforgettable moments
            </span>
            . Because at the end of the day, it&apos;s not just about travel –
            it&apos;s about{" "}
            <span className="font-semibold text-[#305BAB]">you</span>.
          </p>
        </div>
      </motion.div>

      {/* Founders Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1a2753] to-pink-600 bg-clip-text text-transparent mb-8">
          Meet Our Founders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Founder */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-pink-50 via-white to-blue-50 p-6 rounded-xl shadow-md hover:shadow-pink-300 transition"
          >
            <img
              src={founder}
              alt="Founder"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-pink-400"
            />
            <h3 className="text-xl font-bold text-gray-800">Somya Shah</h3>
            <p className="text-gray-600">Founder</p>
          </motion.div>

          {/* Co-Founder */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-50 via-white to-pink-50 p-6 rounded-xl shadow-md hover:shadow-blue-300 transition"
          >
            <img
              src={CoFounder}
              alt="Co-Founder"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-pink-400"
            />
            <h3 className="text-xl font-bold text-gray-800">Siddh Jain</h3>
            <p className="text-gray-600">Co-Founder</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
