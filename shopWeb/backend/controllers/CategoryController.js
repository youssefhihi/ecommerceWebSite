const Category = require('../models/Category');



const getCategories = async(req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
const CreateCategory = async(req, res) => {
    const { name } = req.body;
    try{
        const category = await Category.create({ name });
        res.status(200).json(category);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const deleteCategory = async(req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: "Catgory not found" });
        }
        res.status(200).json({ message: "Category deleted successfully", category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCategory = async(req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        const category = await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!category) {
            return res.status(404).json({ message: "category not found" });
        }

        res.status(200).json({ message: "category updated successfully", category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { CreateCategory , getCategories, deleteCategory, updateCategory }