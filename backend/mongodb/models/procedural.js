import mongoose from "mongoose";
const Schema = mongoose.Schema;

const procSchema = new Schema({
    procName: {
        type: String,
        required: true
    },
    petType: {
        type: String, 
        required: true
    },
    forAgeStart: {
        type: String,
    },
    forAgeEnd: {
        type: String,
    },
    forGender: {
        type: String,
        required: true
    },
    frequent: {
        type: Date,
        required: true
    },
    vacID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaccine',
        required: true
    }
});

export const Procedural = mongoose.model('Procedural', procSchema);