const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logsSchema = new Schema({
    title: {type: String},
    entry: {type: String},
    shipIsBroken: {type: Boolean, default: true},
},
{timestamps: true});

const captLogs = mongoose.model('captLogs', logsSchema);
module.exports = captLogs;