import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {  //tipagem
    sub: string  //id 
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){  //verificar o token
    //receber o token
    const authToken = req.headers.authorization  //o token sempre vem aqui dentro
    if(!authToken){
        return res.status(401).end()
    }
    const [, token] = authToken.split(" ")  //dá nome ao que recebe entre os espaços
    
    //validar token - devolve o id do usuário que esta logando
    try {
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload  //vai devolver o tipo payload
        //para todos terem acesso mais facilmente ao id - recupera o id do token e coloca dentro de uma variável user_id dentro do request
        req.user_id = sub  //dá um erro de tipagem do req
        return next()
    } catch(err) {
        return res.status(401).end()
    }
}  