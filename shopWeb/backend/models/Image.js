const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }

},{
    timestamps: true
});
const Image = mongoose.model('Image', ImageSchema);
module.exports = Image