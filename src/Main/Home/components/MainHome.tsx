import { Card } from "antd";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";



export default function BucketListAdventures() {
  const { data } = useSelector((state: RootState) => state.home);

  return (
    <div className="relative bg-transparent  px-6 md:px-20 text-center overflow-hidden">
      {/* Floating Background Accent */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 left-10 w-60 h-60 bg-[#FFD6E8] opacity-40 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-0 w-72 h-72 bg-[#C6DCFF] opacity-40 blur-3xl rounded-full"
      />

      {/* Hero Section */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-[#1a2753] mb-6"
      >
        Pack Your Bags, <br /> We&apos;ll Handle the Rest!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg md:text-xl text-[#305BAB]  max-w-3xl mx-auto font-bold  leading-relaxed"
      >
        Every journey is unique, just like you. <br />
        Discover customized travel plans that fit your style, budget, and
        adventure goals!
      </motion.p>

      {/* Bucket List Adventures Section */}
      <motion.h3
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-[#1a2753]"
      >
        Bucket List Adventures
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((item: any, index: number) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12, scale: 1.05 }} // 🚀 lift card on hover
            transition={{ duration: 0.4, delay: index * 0.2 }}
            className="mt-26"
          >
            <Card
              bordered={false}
              cover={
                <div className="relative">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-full h-60 object-cover rounded-lg"
                    style={{ border: "6px solid #ffffff" }}
                  />

                  <motion.h4
                    className="absolute bottom-3 left-3 right-3 
                    text-lg font-bold text-white tracking-wide text-center"
                    style={{
                      textShadow: `
                        -3px -3px 3px #000,
                        3px -3px 3px #000,
                        -3px  3px 3px #000,
                        3px  3px 3px #000,
                        0 0 12px #ff80ab
                      `,
                    }}
                    animate={{
                      y: [0, -4, -6, -4, 0],
                      x: [0, 2, -2, 2, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "circInOut",
                    }}
                  >
                    {item.title}
                  </motion.h4>



                </div>
              }
              className="!bg-transparent !p-0 rounded-lg shadow-md 
              hover:shadow-pink-400 transition-all duration-300 
                overflow-hidden flex flex-col justify-end"
              bodyStyle={{ background: "transparent" }}
            />

          </motion.div>
        ))}
      </div>
    </div>
  );
}
