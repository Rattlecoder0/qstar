const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:4200',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));
app.use(cors());

// Connect to MongoDB Atlas with database name "qstardb"
mongoose.connect("mongodb+srv://qstardb:queue.00@qstar.rye3p.mongodb.net/qstardb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const OTP = require('./models/otp');
const ADMIN = require('./models/admin');
const QUEUE = require('./models/queue');

// Helper: Generate 4-digit OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// 1. Send OTP API
app.post("/api/auth/send-otp", async (req, res) => {
  const { phone_no } = req.body;
  if (!phone_no) {
    return res.status(400).json({ message: "Phone number is required" });
  }
  const otp = generateOtp();
  const expires_at = new Date(Date.now() + 2 * 60 * 1000); // OTP valid for 2 minutes

    await OTP.findOneAndUpdate(
      { phone_no },
      { otp, expires_at },
      { upsert: true, new: true }
    );

  console.log(`OTP for ${phone_no}: ${otp}`);
  return res.json({ message: "OTP sent", status: 'S' });
});

// 2. Verify OTP & Admin Check API
app.post("/api/auth/verify-otp", async (req, res) => {
  const { phone_no, otp } = req.body;
  const record = await OTP.findOne({ phone_no });

  if (record.otp !== otp.toString() || new Date() > new Date(record.expires_at)) {
    return res.json({ message: "Invalid or expired OTP", status: 'IE' });
  }

  // Check if phone_no exists in admin list
  const admin = await ADMIN.findOne({ business_owner_phoneno: phone_no });
  if (!admin) {
    return res.json({ message: "User is not registered", status: 'NR' });
  }

  // On successful verification, return admin details (or token if required)
  return res.json({ message: "OTP verified", business_id: admin.business_id, status: 'V' });
});

// 3. Get Queue List for a Business
app.get("/api/queue/:business_id", async (req, res) => {
  const { business_id } = req.params;
  const queue = await QUEUE.findOne({ business_id });
  return res.json(queue ? queue.queue_list : []);
});

// 4. Add Person to Queue API
app.post("/api/queue/add", async (req, res) => {
  const { business_id, name } = req.body;
  let queue = await QUEUE.findOne({ business_id });
  if (!queue) {
    // Create a new queue document for this business if it doesn't exist
    queue = new QUEUE({ business_id, queue_list: [] });
  }

  const newPerson = {
    waiting_no: queue.queue_list.length + 1,
    name: name && name.trim() !== "" ? name : "Present Person (PP)",
    status: "P",
  };

  queue.queue_list.push(newPerson);
  await queue.save();

  return res.json({ message: "Person added successfully", queue: queue.queue_list, status: 'PA' });
});

// 5. Remove Person from Queue API
app.delete("/api/queue/remove", async (req, res) => {
  const { business_id } = req.body;
  let queue = await QUEUE.findOne({ business_id });

  if (!queue || queue.queue_list.length === 0) {
    return res.json({ message: "Queue is already empty" });
  }

  // Remove the first person from the queue
  const removedPerson = queue.queue_list.shift();
  // console.log(`Removed person: ${removedPerson}`);

  // Re-number the waiting_no for remaining persons
  queue.queue_list = queue.queue_list.map((person, index) => ({
    ...person,
    waiting_no: index + 1,
  }));

  await queue.save();

  return res.json({ message: "Person removed successfully", queue: queue.queue_list, status: 'R' });
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
