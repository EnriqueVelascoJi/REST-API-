//Import the model
import Product from '../models/Product'

exports.createProduct = async (req, res) => {

    const {name, category, price, imgURL} = req.body;
    const newProduct = new Product({name, category, price, imgURL});

    try {
        const productSaved = await newProduct.save();
        res.status(201).json(productSaved);
    } catch (error) {
        res.status(500).json({error});
    }
}
exports.getProducts = async (req, res) => {
    
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({error});
    }
}
exports.getProductById = async (req, res) => {

    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error});
    }
    
    
}
exports.updateProductsById = async (req, res) => {

    const productId = req.params.productId;
    const {name, category, price, imgURL} = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            category,
            price,
            imgURL
        }, {
            new: true
        })
        
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({error});
    }
}
exports.deleteProductById = async (req, res) => {
    
    const productId = req.params.productId;
    try {
        const deletedProduct  = await Product.findByIdAndDelete(productId);
        res.status(204).json(deletedProduct);

    } catch (error) {
        res.status(500).json({error});
    }
}