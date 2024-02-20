import prismaClient from "../../prisma/prisma";

interface DetailRequest {
    order_id: string
}

class DetailOrderService {
    async execute({order_id}: DetailRequest){
        const orders = await prismaClient.item.findMany({
            where:{
                order_id: order_id
            },
            include:{  //mostrar detalhes do relacionamento - tudo que tiver dentro
                product: true,
                order: true
            }
        })
        return orders
    }
}

export {DetailOrderService}