import prismaClient from "../../prisma/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string
    password: string
}

class AuthUserService {
    async execute({email, password}: AuthRequest){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user){
            throw new Error("User/password incorrect")
        }
        const passwordMatch = await compare(password, user.password)  //compara as duas senhas
        if(!passwordMatch){
            throw new Error("User/password incorrect")
        }
        //gerar token jwt e devolver os dados do usuário
        const token = sign(
            {  //informações que deseja passar
                name: user.name,
                email: user.email
            },  //secret key aleatória - hash
            process.env.JWT_SECRET, 
            {  //options
                subject: user.id,  //colocamos o id dentro desse sub
                expiresIn: '30d'  //tempo em que expira o token
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService}