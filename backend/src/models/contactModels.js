import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true,
    },
    last: {
        type: String,
        required: true,
    },
    twitter: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
}
);

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
