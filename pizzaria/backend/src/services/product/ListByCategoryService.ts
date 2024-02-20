import prismaClient from "../../prisma/prisma";

interface ProductRequest {
    category_id: string
}

class ListByCategoryService {
    async execute({category_id}: ProductRequest){
        const findByCategory = await prismaClient.product.findMany({  //busca todos os produtos, mas com uma condição
            where:{  //onde o id é igual ao que foi mandado
                category_id: category_id
            }
        })
        return findByCategory
    }
}

export {ListByCategoryService}