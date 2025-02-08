const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    business_id: String,
    queue_list: [
        {
            waiting_no: Number,
            name: String,
            status: String,
        },
    ],
});
module.exports = mongoose.model('queues', QueueSchema);