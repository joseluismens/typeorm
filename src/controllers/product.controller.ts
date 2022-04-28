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


}