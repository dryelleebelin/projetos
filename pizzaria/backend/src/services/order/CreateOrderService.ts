import prismaClient from "../../prisma/prisma";

interface OrderRequest {  //tipagem
    table: number
    name: string  //opcional
}

class CreateOrderService {
    async execute({table, name}: OrderRequest){  //método  //descontrução
        const order = await prismaClient.order.create({
            data:{
                table: table,
                name: name
            }
        })
        return order
    }
}

export {CreateOrderService}