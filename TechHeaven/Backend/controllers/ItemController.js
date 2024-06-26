import itemModel from "../models/itemModel.js";
import fs from "fs";


//add food item
const addItem= async (req,res) => {

    let image_filename =`${req.file.filename}`;

    const item =new  itemModel({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:image_filename
    })
    try {
        await item.save();
        res.json({
            success:true,message:"Item Added successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,message:"Internal Server Error"
        })
    }
}
//list item
const listItem=async(req, res)=> {
    try{
        const Item = await itemModel.find({});
        res.json({
            success:true,
            data:Item
        })
    }catch(err){
        res.json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
//Remove item
const RemoveItem =async (req, res) => {
    try {
        const Item = await itemModel.findById(req.body.id);
        fs.unlink(`uploads/${Item.image}`,()=>{})
        await itemModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            message:"Item Removed successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
export{addItem,listItem,RemoveItem}