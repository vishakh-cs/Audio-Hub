import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String },
    duration: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePicture: { type: String },
    audios: [audioSchema],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;