import { useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BookingForm: React.FC = () => {
  const location = useLocation();
  const packageData = location.state?.package;
  console.log(packageData);

  const [people, setPeople] = useState([{ name: "", age: "", gender: "" }]);
  const [contact, setContact] = useState({ mobile: "", email: "" });

  const addPerson = () =>
    setPeople([...people, { name: "", age: "", gender: "" }]);

  // Determine if special discount applies based on current people length
  const isSpecial = people.length >= 4 && packageData?.finalSpecialPrice > 0;

  // Calculate total price dynamically
  const totalPrice = useMemo(() => {
    if (!packageData) return 0;
    return isSpecial
      ? packageData.finalSpecialPrice * people.length
      : (packageData.finalPrice || packageData.price) * people.length;
  }, [people.length, packageData, isSpecial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = { package: packageData, people, contact, totalPrice };
    console.log("Booking Data:", bookingData);
    // Send bookingData to API here
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-[#C6DCFF] via-white to-[#FDFDFD] shadow-xl rounded-2xl border border-[#C6DCFF]">
      <h1 className="text-3xl font-bold text-[#1a2753] mb-6">
        Booking for {packageData?.title}
      </h1>

      {/* Pricing Summary */}
      <AnimatePresence>
        <motion.div
          key={isSpecial ? "special" : "normal"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className={`bg-white border border-[#C6DCFF]/70 shadow-md p-5 rounded-xl mb-4 ${
            isSpecial ? "ring-2 ring-pink-400" : ""
          }`}
        >
          {isSpecial && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-pink-100 text-pink-700 px-3 py-2 rounded mb-3 text-sm font-medium"
            >
              🎉 You have booked for {people.length} people! Special discount is now available for you.
            </motion.div>
          )}

          <h2 className="text-xl font-semibold text-[#305BAB] mb-2">Pricing</h2>

          {isSpecial ? (
            <>
              <motion.p
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[#1a2753] font-medium"
              >
                Special Price:{" "}
                <span className="font-bold">
                  ₹{packageData.finalSpecialPrice.toLocaleString()}
                </span>{" "}
                per person
              </motion.p>
              {packageData.specialDiscount > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-pink-600 text-sm"
                >
                  {packageData.specialDiscount}% OFF (Original: ₹
                  {packageData.price.toLocaleString()})
                </motion.p>
              )}
              <motion.p
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-lg font-bold text-[#1a2753] mt-3"
              >
                Total: ₹
                {(packageData.finalSpecialPrice * people.length).toLocaleString()} (
                {people.length} {people.length > 1 ? "people" : "person"})
              </motion.p>
            </>
          ) : (
            <>
              <p className="text-[#1a2753] font-medium">
                Base Price:{" "}
                <span className="font-bold">
                  ₹{packageData.finalPrice.toLocaleString()}
                </span>{" "}
                per person
              </p>
              {packageData.discount > 0 && (
                <p className="text-pink-600 text-sm">
                  {packageData.discount}% OFF (Original: ₹
                  {packageData.price.toLocaleString()})
                </p>
              )}
              <p className="text-lg font-bold text-[#1a2753] mt-3">
                Total: ₹
                {(packageData.finalPrice * people.length).toLocaleString()} (
                {people.length} {people.length > 1 ? "people" : "person"})
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Travelers */}
        {people.map((person, idx) => (
          <div key={idx} className="space-y-3 border p-4 rounded-lg shadow-sm">
            <h3 className="text-[#305BAB] font-semibold">Person {idx + 1}</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded p-2 !text-[#1a2753] focus:outline-none focus:ring-2 focus:ring-[#305BAB]"
              value={person.name}
              onChange={(e) =>
                setPeople(
                  people.map((p, i) =>
                    i === idx ? { ...p, name: e.target.value } : p
                  )
                )
              }
              required
            />
            <input
              type="number"
              placeholder="Age"
              className="w-full border rounded p-2 !text-[#1a2753] focus:outline-none focus:ring-2 focus:ring-[#305BAB]"
              value={person.age}
              onChange={(e) =>
                setPeople(
                  people.map((p, i) =>
                    i === idx ? { ...p, age: e.target.value } : p
                  )
                )
              }
              required
            />
            <select
              className="w-full border rounded p-2 !text-[#1a2753] focus:outline-none focus:ring-2 focus:ring-[#305BAB]"
              value={person.gender}
              onChange={(e) =>
                setPeople(
                  people.map((p, i) =>
                    i === idx ? { ...p, gender: e.target.value } : p
                  )
                )
              }
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        ))}

        <button
          type="button"
          onClick={addPerson}
          className="px-4 py-2 bg-[#305BAB] hover:bg-[#1a2753] text-white rounded-lg"
        >
          + Add Person
        </button>

        {/* Contact Info */}
        <div className="space-y-3">
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full border rounded p-2 !text-[#1a2753] focus:outline-none focus:ring-2 focus:ring-[#305BAB]"
            value={contact.mobile}
            onChange={(e) => setContact({ ...contact, mobile: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded p-2 !text-[#1a2753] focus:outline-none focus:ring-2 focus:ring-[#305BAB]"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-lg"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
