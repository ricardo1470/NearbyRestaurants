const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    latitude: float,
    longitude: float,
    status: {
        type: float,
        default: false
    }
});

module.exports = mongoose.model('task', TaskSchema);
