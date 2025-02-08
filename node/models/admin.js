const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  business_id: { type: String, unique: true },
  business_type: String,
  business_owner_name: String,
  business_owner_phoneno: { type: String, required: true },
});

module.exports = mongoose.model('admins', AdminSchema);
