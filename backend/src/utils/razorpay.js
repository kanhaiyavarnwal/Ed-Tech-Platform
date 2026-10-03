import Razorpay from "razorpay";

const { RAZORPAY_KEY, RAZORPAY_SECRET } = process.env;

const instance = RAZORPAY_KEY && RAZORPAY_SECRET
  ? new Razorpay({
      key_id:process.env.RAZORPAY_KEY,
      key_secret:process.env.RAZORPAY_SECRET,
    })
  : null;

export { instance };

