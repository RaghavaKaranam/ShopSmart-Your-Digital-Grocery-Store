const express=require('express');
const router=express.Router();
const Product=require('../models/product');

//Get All products
router.get('/',async(requestAnimationFrame,res)=>{
try{
    const products=await Product.find();
    res.json(products);
}catch(err){
    res.status(500).json({message:err.message});
}
});
module.exports=router;