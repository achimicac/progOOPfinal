import mongoose from "mongoose";
const Schema = mongoose.Schema;

const petSchema = new Schema({
    petName: {
        type: String,
    },
    petType: {
        type: String,
    },
    petDoB: {
        type: Date,
        required: true
    },
    petPfp: {
        data: Buffer, 
        contentType: String
    },
    petGender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const Pet = mongoose.model('Pet', petSchema);
