const Product = require('../models/Product');
const { generateUniqueSKU } = require('../helpers/controllerUtils');




const getAvailableProducts = async(req, res) => {
    try{
        const AvailableProducts = await Product.find({quantity: {$gt: 0}});
        res.status(200).json(AvailableProducts);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getProducts = async(req, res) => {
    try{
        const Products = await Product.find();
        res.status(200).json(Products);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
    const getSingleProduct = async (req, res) => {
        const { SKU } = req.params;

        try {
            const SingleProduct = await Product.findOne({ SKU });

            if (!SingleProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.status(200).json({ message: "Product found", SingleProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


const CreateProduct = async (req, res) => {
    const { category, title, description, brand, price, quantity } = req.body;

    try {
        const SKU = await generateUniqueSKU(title);
        const CreatedProduct = await Product.create({ category, SKU, title, description, brand, price, quantity });
        res.status(200).json({ message: "Product created successfully", CreatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteProduct = async(req, res) => {
    const id = req.params.id;
    try {
        const DeletedProduct = await Product.findByIdAndDelete(id);
        if (!DeletedProduct) {
            return res.status(404).json({ message: "Catgory not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", DeletedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { category, title, description, brand, price, quantity } = req.body;
    const updateData = {
        category,
        title,
        description,
        brand,
        price,
        quantity
    };

    try {
        const UpdatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!UpdatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", UpdatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAvailableProducts, getProducts , getSingleProduct,CreateProduct, deleteProduct, updateProduct}