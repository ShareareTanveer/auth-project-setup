import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        index: true

    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    refreshToken: {
        type: String,
    },
    avatar: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            reference: "Video"
        }
    ]
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
});

userSchema.methods.isPasswordCorrect = async (password) => {
    if (password) {
        return await bcrypt.compare(password, this.password);
    }
}

userSchema.methods.generateAccessToken = async () => {
    accessToken = jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    },
        process.env.JSON_ACCESS_TOKEN,
        {
            expiresIn: process.env.JSON_ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async () => {
    refreshToken = jwt.sign({
        _id: this._id,
    },
        process.env.JSON_REFRESH_TOKEN,
        {
            expiresIn: process.env.JSON_REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);