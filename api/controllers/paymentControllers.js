import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Payment from "../models/Payment.js";
import paymentRoutes from "../routes/paymentRoutes.js";
/*
@@ ROUTE   /api/{}/create
@@ METHOD  POST
@@ DESC    Create and Save 
*/

export const createPayment = expressAsyncHandler(async (req, res) => {
  const { swapAsset, swapAmount, userAddress, userEmail } = req.body;
  const user = await User.findOne({ email: userEmail });
  console.log(user);
  if (user) {
    const payment = await Payment.create({
      userAddress,
      swapAmount,
      swapAsset,
      user: user,
    });
    res.json(payment);
  } else {
    res.status("401");
    throw new Error("User not found");
  }
});

/*
@@ ROUTE   /api/{}/
@@ METHOD  GET
@@ DESC    Fetch data from Database 
*/

export const readPayment = async (req, res) => {
  const paymentId = req.params.id;
  const payment = await Payment.findOne({ _id: paymentId });
  if (payment?.user.equals(req.user._id) || req.user.isAdmin) {
    res.send(payment);
  } else {
    res.json({ message: "You can not access this content" });
  }
};

export const allPayment = async (req, res) => {
  if (req.user.isAdmin) {
    const allPayments = await Payment.find().populate("user");
    res.json(allPayments);
  } else {
    const userId = req.user._id;
    const payment = await Payment.find({ user: userId });
    res.json(payment);
  }
};

/*
@@ ROUTE   /api/{}/update/:id
@@ METHOD  PUT
@@ DESC    Update {} by ID
*/

export const updatePayment = async (req, res) => {
  const { status } = req.body;
  console.log(status);
  res.send(status);
};
/*
@@ ROUTE   /api/{}/delete/:id
@@ METHOD  DELETE
@@ DESC    Delete {} by ID
*/

export const deletePayment = expressAsyncHandler(async (req, res) => {
  const paymentId = req.params.id;
  const payment = await Payment.deleteOne({ _id: paymentId });
  res.send("Deleted");
});

export const paidPayment = expressAsyncHandler(async (req, res) => {
  const paymentId = req.params.id;
  const payment = await Payment.findOne({ _id: paymentId });
  payment.status = "success";
  const updatedPayment = await payment.save();
  res.json(payment);
});
