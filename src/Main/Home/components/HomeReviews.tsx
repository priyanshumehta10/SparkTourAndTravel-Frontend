import React from "react";
import { Card } from "antd";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

type Review = {
  _id: string;
  username: string;
  message: string;
  image?: {
    url: string;
    public_id: string;
  };
};

const HomeReviews: React.FC = () => {
  const { Reviewsdata } = useSelector((state: RootState) => state.home);
  console.log("review data", Reviewsdata);

  return (
    <div className="bg-white p-6">
      
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
      >
        What Makes Us the Traveler&apos;s Choice!
      </motion.h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Reviewsdata?.map((review: Review, index: number) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: [
                  "0 0 15px #ff69b4", // Pink
                  "0 0 15px #C6DCFF", // Light
                  "0 0 15px #305BAB", // Medium
                  "0 0 15px #1a2753", // Dark
                ],
                transition: { duration: 0.6, repeat: Infinity, repeatType: "mirror" },
              }}
            >
              {/* Review Card */}
              <Card
                hoverable
                className="rounded-2xl border border-gray-200 text-center transition-all duration-300"
                cover={
                  review.image?.url ? (
                    <img
                      src={review.image.url}
                      alt={review.username}
                      className="h-44 w-full object-cover rounded-t-2xl"
                    />
                  ) : (
                    <div className="h-28 w-full flex items-center justify-center bg-gray-100 rounded-t-2xl text-gray-500 text-sm">
                      No Image
                    </div>
                  )
                }
              >
                <h3 className="text-sm font-bold text-[#1a2753] truncate">
                  {review.username}
                </h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {review.message}
                </p>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeReviews;
