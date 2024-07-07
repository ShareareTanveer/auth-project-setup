import mongoose from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const { Schema } = mongoose;

const videoSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        required: [true, "description is required"],
        lowercase: true,
        index: true
    },
    file: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        reference: "User"
    }
}, {
    timestamps: true
});

videoSchema.plugin(mongooseAggregatePaginate)

export default Video = mongoose.model("Video", videoSchema)