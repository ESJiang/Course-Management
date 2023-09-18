const { Schema, model } = require("mongoose");
module.exports = model(
    "Course",
    new Schema({
        title: {
            type: String,
            required: [true, "Title is required"],
            minLength: [5, "Title must be at least 5 characters long."],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        instructor: {
            type: String,
            required: [true, "Instructor is required"],
            trim: true,
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
            min: [0, "Duration must be greater than zero"],
            max: [10, "Duration must be lower than ten"],
        },
    })
);
