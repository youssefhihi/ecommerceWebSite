const crypto = require('crypto');
const Product = require('../models/Product');

const generateUniqueSKU = async (title) => {
    let sku;
    let exists = true;
    const formattedTitle = title.replace(/\s+/g, '_');
    while (exists) {
        sku = formattedTitle +'-'+ crypto.randomBytes(8).toString('hex').toUpperCase();
        const existingProduct = await Product.findOne({ SKU: sku });
        if (!existingProduct) {
            exists = false;
        }
    }
    return sku;
};

module.exports = {
    generateUniqueSKU
};
