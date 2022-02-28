import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let blog = new Schema({

    title: {
        type: String
    },
    desc: {
        type: String
    },
    author: {
        type: String
    }
});

export default mongoose.model("Blog", blog);
