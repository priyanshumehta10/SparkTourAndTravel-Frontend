import { motion } from "framer-motion";
import type { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PackageDetails: React.FC = () => {
  const { PackageDetailsdata ,PackageDetailsLoading, PackageDetailsError } = useSelector((state: RootState) => state.packageFront);
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState<string | null>(null);



  // -------------------- Loading --------------------
  if (PackageDetailsLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>  
    );
  }

    // -------------------- Error --------------------
  if (PackageDetailsError) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-600 font-semibold text-lg">
          {PackageDetailsError || "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

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
    navigate(`/packages/pck/booking/${PackageDetailsdata?._id}`, {
      state: { package: PackageDetailsdata },
    });
  };

  // Clean inclusions/exclusions (replace double commas with single)
  const inclusions = PackageDetailsdata.tourInclusions
    ? PackageDetailsdata.tourInclusions.split(",").map((i: string) => i.trim())
    : [];

  const exclusions = PackageDetailsdata.tourExclusions
    ? PackageDetailsdata.tourExclusions.split(",,").map((e: string) => e.trim())
    : [];

  // Check if special price should apply (example: participants >= 4)
  const participantsCount = 4; // 🔹 Replace with dynamic participants count if available
  const showSpecialPrice = participantsCount >= 4;

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-[#C6DCFF] via-white to-[#FDFDFD] shadow-2xl rounded-2xl border border-[#C6DCFF]/50">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold text-[#1a2753] mb-4 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {PackageDetailsdata.title}
      </motion.h1>

      {/* Description */}
      <p className="text-gray-700 mb-6 text-lg leading-relaxed">
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

      {/* Package Info - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Details */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-[#C6DCFF]/50">
          <h2 className="text-2xl font-semibold text-[#305BAB] mb-4">Details</h2>
          <ul className="space-y-3 text-gray-700">
            <li><strong>Title:</strong> {PackageDetailsdata.title}</li>

            <li><strong>Description:</strong> {PackageDetailsdata.description}</li>
            <li><strong>Duration:</strong> {PackageDetailsdata.duration}</li>
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
          {showSpecialPrice && PackageDetailsdata.finalSpecialPrice && (
            <p className="mt-3 text-yellow-300 text-lg font-semibold">
              🎉 Special Price for 4+ Persons: ₹{PackageDetailsdata.finalSpecialPrice.toLocaleString()}
            </p>
          )}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-pink-400 rounded-full opacity-30 blur-xl"></div>
        </div>
      </div>

      {/* Package Info - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Inclusions & Exclusions in single column */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-[#C6DCFF]/50">
          <h3 className="font-extrabold text-3xl text-[#305BAB] mb-3">Inclusions & Exclusions</h3>

          <div className="mb-4">
            <h4 className="font-medium text-2xl text-black mb-1">Inclusions</h4>
            <ul className="list-disc list-inside space-y-1 text-black text-md">
              {inclusions.map((inc: string, i: number) => (
                <li key={i}>{inc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-2xl text-black mb-1">Exclusions</h4>
            <ul className="list-disc list-inside space-y-1 text-black text-md">
              {exclusions.map((exc: string, i: number) => (
                <li key={i}>{exc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-[#C6DCFF]/50">
          <h2 className="text-2xl font-semibold text-[#305BAB] mb-6">Itinerary</h2>
          <div className="space-y-5">
            {PackageDetailsdata.itinerary?.map((day: any) => {
              const isExpanded = expandedDay === day._id;
              return (
                <motion.div
                  key={day._id}
                  className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md hover:border-pink-300 transition"
                >
                  <button
                    onClick={() => setExpandedDay(isExpanded ? null : day._id)}
                    className="w-full text-left flex justify-between items-center"
                  >
                    <h3 className="font-bold  text-lg">
                      Day {day.day}: {day.title}
                    </h3>
                    <span className="text-pink-500 font-bold">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-3"
                    >
                      <p className="text-gray-900 mb-3">{day.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                        {day.breakfast && (
                          <span className="px-3 py-1 bg-green-100 rounded-full">🍳 Breakfast</span>
                        )}
                        {day.lunch && (
                          <span className="px-3 py-1 bg-blue-100 rounded-full">🍲 Lunch</span>
                        )}
                        {day.dinner && (
                          <span className="px-3 py-1 bg-purple-100 rounded-full">🍽 Dinner</span>
                        )}
                        {day.highTea && (
                          <span className="px-3 py-1 bg-yellow-100 rounded-full">☕ High Tea</span>
                        )}
                        {day.stay && (
                          <span className="px-3 py-1 bg-pink-100 rounded-full">🏨 {day.stay}</span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>


      {/* Book Button */}
      <div className="flex justify-center gap-4 mt-6">


        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          Cancel
        </motion.button>
        <motion.button
          onClick={handleBook}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-xl shadow-2xl transition-all hover:shadow-pink-400/50"
        >
          Book Package
        </motion.button>
      </div>
    </div>
  );
};

export default PackageDetails;
