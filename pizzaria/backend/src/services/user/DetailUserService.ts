import prismaClient from "../../prisma/prisma";

class DetailUserService {
    async execute(user_id: string){  //espera receber...
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            select:{  //o que vai devolver apenas
                id: true,
                name: true,
                email: true
            }
        })
        return user
    }
}

export {DetailUserService}