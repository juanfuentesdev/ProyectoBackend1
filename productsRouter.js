const express = require('express');
const fs = require('fs');
const router = express.Router();
const productsFilePath = './products.json';

// Obtener todos los productos
router.get('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));
    res.json(products);
});

// Obtener un producto por id
router.get('/:pid', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));
    const product = products.find(p => p.id === req.params.pid);
    res.json(product);
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));
    const newProduct = {
        id: products.length + 1, // Autogenerar ID
        ...req.body
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
    res.status(201).json(newProduct);
});

// Actualizar un producto por id
router.put('/:pid', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));
    const index = products.findIndex(p => p.id === req.params.pid);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body, id: products[index].id };
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Eliminar un producto por id
router.delete('/:pid', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));
    const newProducts = products.filter(p => p.id !== req.params.pid);
    fs.writeFileSync(productsFilePath, JSON.stringify(newProducts));
    res.status(204).end();
});

module.exports = router;