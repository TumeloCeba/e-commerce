const catchAsync = require("../utils/catchAsync")
const Product = require("../models/ProductModel")

//exports.updateMe = catchAsync((request, response, next) => {})
exports.createProduct = catchAsync(async (request, response, next) => {
  const newProduct = await Product.create(request.body);

  response
    .status(200)
    .json({
      status: 'success',
      data: {
        newProduct
      }
    })
})

exports.updateProduct = catchAsync(async (request, response, next) => {
  const {status,updatedAt, ...updateProductBody} = request.body;
  const updatedProduct = await Product.findByIdAndUpdate(
    request.params.id, 
    updateProductBody,
    { 
      new: true, 
      runValidators: true 
    },
  )

  response
    .status(200)
    .json({
      status: 'success',
      message: 'Product has been updated',
      data: {
        updatedProduct
      }
    })
})

exports.deleteProduct = catchAsync(async (request, response, next) => {

  await Product.findByIdAndUpdate(request.params.id, { status: 'deleted' });

  response.status(200).json({
    status: 'success',
    message: 'Product has been deleted',
    data: null,
  });

});

exports.getProduct = catchAsync(async (request, response, next) => {
  const user = await Product.findById(request.params.id)

  response.status(200).json({
    status: 'success',
    data: {
      user
    },
  });
});

exports.getAllProducts = catchAsync(async (request, response, next) => {
  const {categories} = request.query;
  let products = {};

  console.log(categories);

  if(categories){
    products = await Product.find({
      categories: {
        $in: [categories]
      }
    })
  } else{
    products = await Product.find()
  }
  

  response.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products
    },
  });
});