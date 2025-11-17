import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0.0,
            required: true
        },
        quantity:{
            type: Number,
            default: 0,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
); //fin de productschema

export default mongoose.model('Product', productSchema);
