const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SampleNameSchema = new Schema({
    sampleName: {
        type: String,
        required: true
    },
    dto: {
        type: Number,
        required: true
    }
});

const SampleSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sampleNames  : [SampleNameSchema]
});

const Sample = mongoose.model('identifier', SampleSchema);

module.exports = Sample;