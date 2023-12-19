import mongoose from "mongoose";
const Schema = mongoose.Schema;

const petArticleSchema = new Schema({
    petID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    articleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        require: true
    }
});

export const petArticle = mongoose.model('petArticle', petArticleSchema);
