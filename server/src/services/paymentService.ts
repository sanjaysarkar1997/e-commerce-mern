import Razorpay from "razorpay";

const key_id = "rzp_test_Gw9awCYGsnlrJ5";
const key_secret = "VaDU4tpUqIXzWEcvBA7PcQdg";

var instance = new Razorpay({
  key_id,
  key_secret,
});

instance.orders.create({
  amount: 50000,
  currency: "INR",
  receipt: "receipt#1",
  notes: { key1: "value3", key2: "value2" },
});
