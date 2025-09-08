import { motion } from "framer-motion";
import type { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PackageDetails: React.FC = () => {
  const { PackageDetailsdata } = useSelector((state: RootState) => state.packageFront);
  console.log(PackageDetailsdata);
  
  const navigate = useNavigate();

  if (!PackageDetailsdata) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#C6DCFF]">
        <p className="text-[#1a2753] text-lg font-semibold">
          No package data available.
        </p>
      </div>
    );
  }

  const handleBook = () => {
    navigate(`/packages/pck/booking/${PackageDetailsdata?._id}`, { state: { package: PackageDetailsdata } });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-[#C6DCFF] via-white to-[#FDFDFD] shadow-2xl rounded-2xl border border-[#C6DCFF]/50">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold text-[#1a2753] mb-6 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {PackageDetailsdata.title}
      </motion.h1>

      {/* Description */}
      <p className="text-gray-700 mb-8 text-lg leading-relaxed">
        {PackageDetailsdata.description}
      </p>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {PackageDetailsdata.images?.map((img: any) => (
          <motion.img
            key={img._id}
            src={img.url}
            alt={PackageDetailsdata.title}
            className="rounded-xl object-cover w-full h-64 shadow-lg border border-[#C6DCFF]/40 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>

      {/* Package Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-xl shadow-md p-6 border border-[#C6DCFF]/50">
          <h2 className="text-2xl font-semibold text-[#305BAB] mb-4">Details</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Duration:</strong> {PackageDetailsdata.duration}</li>
            <li><strong>Tags:</strong> {PackageDetailsdata.tags?.join(", ")}</li>
            <li><strong>Pricing Type:</strong> {PackageDetailsdata.pricingType}</li>
            <li><strong>Inclusions:</strong> {PackageDetailsdata.tourInclusions || "Not specified"}</li>
            <li><strong>Exclusions:</strong> {PackageDetailsdata.tourExclusions || "Not specified"}</li>
            <li><strong>Most Booked:</strong> {PackageDetailsdata.Hot ? "🔥 Yes" : "No"}</li>
          </ul>
        </div>

        {/* Price */}
        <div className="bg-gradient-to-br from-[#305BAB] to-[#1a2753] p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
          <p className="text-3xl font-extrabold">
            ₹{PackageDetailsdata.finalPrice.toLocaleString()}
          </p>
          {PackageDetailsdata.discount > 0 && (
            <>
              <p className="text-pink-300 text-lg font-medium mt-2">
                {PackageDetailsdata.discount}% OFF
              </p>
              <p className="line-through text-gray-300 text-sm">
                ₹{PackageDetailsdata.price.toLocaleString()}
              </p>
            </>
          )}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-pink-400 rounded-full opacity-30 blur-xl"></div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-[#305BAB] mb-6">Itinerary</h2>
        <div className="space-y-5">
          {PackageDetailsdata.itinerary?.map((day: any) => (
            <motion.div
              key={day._id}
              className="p-5 border rounded-xl shadow-md bg-white hover:shadow-lg hover:border-pink-300 transition"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-bold text-[#1a2753] text-lg mb-2">
                Day {day.day}: {day.title}
              </h3>
              <p className="text-gray-600">{day.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <div className="flex justify-center">
        <motion.button
          onClick={handleBook}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-lg transition"
        >
          Book Package
        </motion.button>
      </div>
    </div>
  );
};

export default PackageDetails;
