import prismaClient from "../../prisma/prisma"  //acesso ao banco de dados
import { hash } from "bcryptjs"  //para criptografar algo

interface UserRequest {  //tipagem dos parâmetros que recebe
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({name, email, password}: UserRequest){  //parâmetros
        if(!email){  //verificar se enviou o email
            throw new Error("Email incorrect")
        }
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{  //parâmetro que quer buscar
                email: email
            }
        })
        if(userAlreadyExists){  //se já existe dá um erro
            throw new Error("User already exists")
        }
        const passwordHash = await hash(password, 8)  //passa o que quer criptografar e número da criptografia
        const user = await prismaClient.user.create({  //cadastrar usuário no banco
            data:{  //o que vai salvar no banco
                name: name,
                email: email,
                password: passwordHash
            },
            select:{  //informar o que quer devolver  //importante!!
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export {CreateUserService}