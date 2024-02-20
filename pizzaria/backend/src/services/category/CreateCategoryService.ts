import prismaClient from "../../prisma/prisma";  //pra manipular o banco

interface CategoryRequest {  //tipando o que vai receber
    name: string
}

class CreateCategoryService {
    async execute({name}: CategoryRequest){  //método  //passa a tipagem acima
        if(name === ''){
            throw new Error('Name invalid')
        }
        const category = await prismaClient.category.create({
            data:{
                name: name
            },
            select:{
                id: true,
                name: true
            }
        })
        return category
    }
}

export {CreateCategoryService}