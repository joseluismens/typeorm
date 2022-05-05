import { Response, Request } from "express"
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";

export default class ProductController{


    static listAll =async (req:Request ,res:Response) => {
        try{
            const products = await Product.find();
            return res.json(products);
        }catch(error){
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
              }
        }

    }
    static getProduct = async (req:Request,res:Response)=>{
        try {
            const {id} = req.params;
            const product = await Product.findOneBy({id:parseInt(id)});
            if (!product) return res.status(200).json({message:"Product not found"});
            return res.json({product:product});
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
              }
        }
    }

    static newProduct = async ()=>{
        
    }


}