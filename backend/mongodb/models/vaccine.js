import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vaccineSchema = new Schema({
    vacName: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        required: true
    }
});

export const Vaccine = mongoose.model('Vaccine', vaccineSchema);
