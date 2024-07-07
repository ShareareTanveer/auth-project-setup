import { User } from "../../models/user/user.model.js";
import ApiExeption from "../../utils/ApiExeption.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/AsyncWrapper.js";
import uploadOnCloud from "../../utils/cloudinary.js";

const userController = asyncHandler(async (req, res, next) => {
    const {
        username,
        email,
        password,
    } = req.body

    const requiredFields = { username, email, password };

    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value || value.trim() === "") {
            throw new ApiExeption(400, `${field} is a required field and must be provided.`);
        }
    }

    if (!email.includes('@')) {
        throw new ApiExeption(400, "Invalid email format.");
    }

    const existsUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existsUser) {
        throw new ApiExeption(409, "User already exists");
    }

    const avatarLocalFile = req?.files?.avatar && req?.files?.avatar[0]?.path;

    let coverImageLocalFile;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalFile = req.files.coverImage[0].path
    }
    
    if (!avatarLocalFile) {
        throw new ApiExeption(400, `avatar is a required field and must be provided.`);
    }
    
    const uploadAvatar = await uploadOnCloud(avatarLocalFile)
    const uploadCoverImage = await uploadOnCloud(coverImageLocalFile)

    if (!uploadAvatar) {
        throw new ApiExeption(400, `avatar is a required.`);
    }

    const user = await User.create({
        username,
        email,
        password,
        avatar: uploadAvatar.secure_url,
        coverImage: uploadCoverImage?.secure_url || "",
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiExeption(500, `User is not created`);
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User is created"
        ))
})

export default userController;