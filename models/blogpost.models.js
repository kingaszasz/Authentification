const mongoose = require('mongoose');


const blogpostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Blogpost', blogpostSchema);