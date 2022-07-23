const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false,
    })
}

exports.postAddProduct = (req, res, next) => {
    const data = req.body
    const { title, imageUrl, description, price } = data
    const product = new Product(null, title, imageUrl, description, price)
    product
        .save()
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    console.log("req.body.productId ==>> ", req.body.productId);
    if(!editMode){
        return res.redirect('/')
    }

    const prodId = req.params.productId
    Product.finById(prodId, product => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Add Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    })    
}

exports.postEditProduct = (req, res, next) => {
    // const prodId = req.body.productId
    const data = req.body
    const { productId, title, imageUrl, description, price } = data
    const updatedProduct = new Product(productId, title, imageUrl, description, price)
    updatedProduct.save()

    res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        })
    })
}

exports.postDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId
        Product.deleteById(prodId)
        res.redirect('/products')
}
