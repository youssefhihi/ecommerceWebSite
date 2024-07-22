const Product = require('../models/Product');
const Image = require('../models/Image');
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
        const Products = await Product.find().populate('category').populate('images'); 
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

            if(!category || !title || !description || !brand || !price || !quantity || !req.files) {
                return res.status(400).json({ message: "All fields are required" });
            }
           
    
            const SKU = await generateUniqueSKU(title);
    
            const createdProduct = await Product.create({
                category,
                SKU,
                title,
                description,
                brand,
                price,
                quantity
            });
    
            const images = req.files.map(file => ({
                url: file.filename,
                product: createdProduct._id
            }));

    
            const savedImages = await Image.insertMany(images);
    
            createdProduct.images = savedImages.map(image => image._id);
            await createdProduct.save();
    
            res.status(200).json({ message: "Product created successfully", createdProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    

const deleteProduct = async(req, res) => {
    const id = req.params.id;
    try {
        const DeletedProduct = await Product.findByIdAndDelete(id);

        if (!DeletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const images = await Image.deleteMany({ product: id });

        if(!images) {
            return res.status(404).json({ message: "Images not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", DeletedProduct, images });
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
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.files && req.files.length > 0) {
           const deletedImages = await Image.deleteMany({ product: id });

            const images = req.files.map(file => ({
                url: file.path,
                product: updatedProduct._id
            }));

           const savedImages = await Image.insertMany(images);
           if(!savedImages) {
               return res.status(404).json({ message: "Images not found" });
           }

            updatedProduct.images = savedImages.map(image => image._id);
            await updatedProduct.save();
        }
        res.status(200).json({message: "Product updated successfully", updatedProduct});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAvailableProducts, getProducts , getSingleProduct,CreateProduct, deleteProduct, updateProduct}