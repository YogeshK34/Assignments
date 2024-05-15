const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://khutwadyogesh34:VblYaNNri2LzK8JV@cluster0.z28rmbf.mongodb.net/courses/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
    // Schema definition here
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purcasedCourses: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    // Schema definition here
});

const CourseSchema = new mongoose.Schema({
    title:String,
    description: String,
    imageLink: String,
    price: Number
    // Schema definition here
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}