const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  phone_no: { type: String, required: true },
  otp: { type: String, required: true },
  expires_at: { type: Date, required: true, index: { expires: 120 } }
});

module.exports = mongoose.model('otps', OtpSchema);
