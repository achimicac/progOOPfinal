import mongoose from "mongoose";
const Schema = mongoose.Schema;

const appointSchema = new Schema({
    petID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
    },
    procID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Procedure',
    },
    date: {
        type: Date,
    },
    status: {
        type: Boolean,
        required: true
    }
});

export const Appointment = mongoose.model('Appointment', appointSchema);