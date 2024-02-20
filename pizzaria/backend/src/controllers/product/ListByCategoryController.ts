import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
    async handle(req: Request, res: Response){  //renomeando
        const category_id = req.query.category_id as string  //passando por query params
        const listByCategory = new ListByCategoryService()
        const products = await listByCategory.execute({category_id})
        return res.json(products)
    }
}

export {ListByCategoryController}