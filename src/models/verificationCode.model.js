import mongoose from "mongoose";

const verificationCodeSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = mongoose.model(
  "VerificationCode",
  verificationCodeSchema,
  "verification_codes"
);
export default VerificationCodeModel;
