import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createOrderRequest } from "../slice";
import type { RootState } from "../../../redux/store";
import { confirmOrderRequest, resetCreateBookSlice, resetConfirmBookSlice } from "../slice.ts";
import { message } from "antd";

const BookingForm: React.FC = () => {
  const location = useLocation();
  const packageData = location.state?.package;
  const dispatch = useDispatch();
    const fetchConfirmData = useRef(false);
const naviagte = useNavigate();
  const { createOrderdata, confirmOrderdata } = useSelector(
    (state: RootState) => state.packageFront
  );
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
    const bookingData = {
      packageId: packageData._id,
      participants: people,
      contactEmail: contact.email,
      contactPhone: contact.mobile,
      amount: totalPrice
    };
    console.log("Booking Data:", bookingData);
    dispatch(createOrderRequest(bookingData))

  };

  useEffect(() => {
    if (  createOrderdata) {

      openRazorpay(createOrderdata)
      dispatch(resetCreateBookSlice());
    }
  }, [createOrderdata, dispatch]);

    useEffect(() => {
    if (!fetchConfirmData.current && confirmOrderdata) {
      fetchConfirmData.current = true;

      dispatch(resetConfirmBookSlice());
      message.success("Payment is Confirmed")
      naviagte("/packages")
    }
  }, [confirmOrderdata, dispatch]);

  const openRazorpay = (orderData: any) => {
    if (!(window as any).Razorpay) {
      console.error("Razorpay SDK not loaded!");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ correct key
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Spark Tour and Travels",
      description: "Booking Payment",
      order_id: orderData.orderId, // backend-generated orderId

      prefill: {
        email: orderData.contactEmail,
        contact: orderData.contactPhone,
      },

      handler: function (response: any) {
        dispatch(
          confirmOrderRequest({
            bookingId: orderData.bookingId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            packageId: orderData.packageId,
            participants: orderData.participants,
            contactEmail: orderData.contactEmail,
            contactPhone: orderData.contactPhone,
            amount: orderData.amount,
          })
        );
        dispatch(resetCreateBookSlice()); 
      },

      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
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
          className={`bg-white border border-[#C6DCFF]/70 shadow-md p-5 rounded-xl mb-4 ${isSpecial ? "ring-2 ring-pink-400" : ""
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
