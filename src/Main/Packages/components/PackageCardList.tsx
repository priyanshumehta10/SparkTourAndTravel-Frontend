import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { Spin } from "antd";
import { fetchPackageDetailsRequest } from "../slice";
import ImageCarousel from "./ImageCarousel";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const PackageCardList = () => {
  const { PackagesByGroupdata, PackagesByGroupLoading, PackagesByGroupError } =
    useSelector((state: RootState) => state.packageFront);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePackage = (id: string) => {
    console.log("Clicked package group id:", id);
    // 👉 here you can navigate, dispatch Redux, or call an API
    dispatch(fetchPackageDetailsRequest(id))
    navigate(`/packages/pck/${id}`)
  };

  // -------------------- Loading --------------------
  if (PackagesByGroupLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  // -------------------- Error --------------------
  if (PackagesByGroupError) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-600 font-semibold text-lg">
          {PackagesByGroupError || "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  // -------------------- Empty --------------------
  if (!PackagesByGroupdata || PackagesByGroupdata.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">No packages available.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen text-center">
      {/* Heading */}
      <motion.h1
        className="text-3xl font-extrabold mb-6 text-[#1a2753]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Available Packages
      </motion.h1>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {PackagesByGroupdata?.map((pkg: any, index: number) => (
          <motion.div
            key={pkg._id}
            initial={{ opacity: 0, y: 40 }}
            onClick={() => handlePackage(pkg._id)}

            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative rounded-2xl shadow-lg border border-[#FFD6E8] transition-all duration-300 hover:shadow-pink-200 hover:border-[#C6DCFF] overflow-hidden flex flex-col"
          >
            {/* ⭐ Most Booked Badge */}


            {/* Carousel */}
            <ImageCarousel images={pkg.images || []} title={pkg.title} />
            {pkg.Hot && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                ⭐ Trending
              </div>
            )}
            {/* Package Info */}
            <div className="p-4 text-left flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-[#1a2753] mb-2">
                {pkg.title}
              </h2>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {pkg.description}
              </p>

              {/* Duration & Tags */}
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>{pkg.duration}</span>
                <span className="px-2 py-1 bg-[#C6DCFF] text-[#1a2753] text-xs rounded-full">
                  {pkg.tags?.[0]}
                </span>
              </div>

              {/* Price */}
              <div className="mt-auto">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#305BAB]">
                    ₹{pkg.finalPrice.toLocaleString()}
                  </span>
                  {pkg.discount > 0 && (
                    <span className="text-sm text-red-500 font-medium">
                      {pkg.discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-sm line-through text-gray-400">
                  ₹{pkg.price.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}


      </motion.div>
    </div>
  );
};

export default PackageCardList;


