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
    req.user.createProduct({
        title: title, 
        imageUrl: imageUrl, 
        description: description, 
        price: price
    })
    .then(result => {
        console.log('Created Product')
        res.redirect('/admin/products')
    })
    .catch(err => {
        console.log(err);
    })
    // const product = new Product(null, title, imageUrl, description, price)
    // product
    //     .save()
    //     .then(() => {
    //         res.redirect('/')
    //     })
    //     .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    
    if(!editMode){
        return res.redirect('/')
    }

    const prodId = req.params.productId
    req.user
        .getProducts({ where: { id: prodId } })
    // Product
    //     .findByPk(prodId)
        .then(products => {
            const product = products[0]
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
        .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    // const prodId = req.body.productId
    const data = req.body
    const { productId, title, imageUrl, description, price } = data

    Product.findByPk(productId)
        .then(product => {
            product.title = title
            product.imageUrl = imageUrl
            product.description = description
            product.price = price
            return product.save()
        })
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    // Product.findAll()
    req.user
        .getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products, 
                pageTitle: 'Admin Products', 
                path: '/admin/products'
            })
        })
        .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId
        Product.findByPk(prodId)
                .then(product => {
                    product.destroy()
                })
                .then(result => {
                    console.log('DESTROYED PRODUCT')
                    res.redirect('/admin/products')
                })
                .catch(err => console.log(err))
}
