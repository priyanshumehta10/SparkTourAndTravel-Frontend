import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPackageGroupRequest,
  fetchPackagesByGroupRequest,
  fetchFilterPackageGroupRequest,
} from "../slice";
import type { RootState } from "../../../redux/store";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categories = [
  "Popular Destinations",
  "Seasonal Specials",
  "Family-Friendly Tours",
  "Adventure & Treks",
  "Couples & Honeymoon",
  "Budget Friendly Options",
];

const PackageGroupList = () => {
  const fetchData = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("");

  const handleFilter = (tag: string) => {
    setActiveCategory(tag);
    dispatch(fetchFilterPackageGroupRequest({ tag }));
  };

  const handleResetFilter = () => {
    setActiveCategory("");
    dispatch(fetchPackageGroupRequest()); // fetch all again
  };

  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
      dispatch(fetchPackageGroupRequest());
    }
  }, [dispatch]);

  const handlePackageGroup = (id: string) => {
    dispatch(fetchPackagesByGroupRequest(id));
    navigate("/packages/pck");
  };

  const {
    PackageGroupLoading,
    PackageGroupdata,
    filterPackageGroupdata,
    filterPackageGroupLoading,
  } = useSelector((state: RootState) => state.packageFront);

  if (PackageGroupLoading || filterPackageGroupLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // ✅ Use filtered data if category selected
  const displayedGroups =
    activeCategory && filterPackageGroupdata?.length > 0
      ? filterPackageGroupdata
      : PackageGroupdata;

  return (
    <div className="p-8 bg-white min-h-screen text-center">
      {/* Heading */}
      <motion.h1
        className="text-4xl font-extrabold mb-4 text-[#1a2753] relative inline-block"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Explore Our Travel Packages
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-md md:text-lg text-gray-700 mb-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Find your ultimate escape with our expertly curated travel packages
        made for all types of travelers. Adventure, relaxation, romance, or
        family break - we've got something waiting for you!
      </motion.p>

      {/* Filter Bar */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => handleFilter(cat)}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#305BAB",
              color: "#fff",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`px-4 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 ${
              activeCategory === cat
                ? "!bg-[#305BAB] !text-white shadow-lg"
                : "!bg-[#C6DCFF] !text-[#1a2753] hover:shadow-pink-300"
            }`}
          >
            {cat}
          </motion.button>
        ))}

        {/* ✅ Reset Filter Button */}
        {activeCategory && (
          <motion.button
            onClick={handleResetFilter}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f87171",
              color: "#fff",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full font-medium bg-gray-200 text-gray-700 hover:bg-red-400 transition-all duration-300"
          >
            Reset Filter
          </motion.button>
        )}
      </motion.div>

      {/* Packages Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayedGroups?.map((group: any, index: number) => (
          <motion.div
            key={index}
            onClick={() => handlePackageGroup(group._id)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="rounded-2xl shadow-lg border border-[#FFD6E8] h-full transition-all duration-300 hover:shadow-pink-200 hover:border-[#C6DCFF]"
          >
            <motion.img
              src={group.photo.url}
              alt={group.name}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.05 }}
            />
            <div className="p-4 text-center">
              <motion.span className="text-lg font-semibold text-[#1a2753] hover:text-[#305BAB] transition-colors duration-300">
                {group.name}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PackageGroupList;
