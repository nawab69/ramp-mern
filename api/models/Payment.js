import mongoose from "mongoose";
import uniqueString from "unique-string";

const PaymentSchema = mongoose.Schema(
  {
    /* 
 @@  Add field and their spefication like following:
    
   fieldName: {
        type:String,    // String, Boolean, Number, Date, Buffer, Mixed, ObjectId, Array, Decimal128, Map
        default:'value',
        required: true, // true, false
        select: true,   // true, false
      }   

*/

    swapAsset: {
      type: String,
      default: "BTC",
      required: true,
    },
    swapAmount: {
      type: String,
      default: "0",
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//   @ MIDDLEWARES

PaymentSchema.pre("save", async function (next) {
  // save, validate, remove, updateOne, deleteOne
  // your code
  let token = uniqueString();
  this.token = token;
  next();
});

//   @ BINDING METHOD TO MODEL
/*
userSchema.methods.methodName = async function (params) {
     // your code
}
*/

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
