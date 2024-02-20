//recebe diretamente a nossa requisição e chama os serviços

import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

//-- cadastrar usuário --
class CreateUserController {
    async handle(req: Request, res: Response){
        const {name, email, password} = req.body  //descontruindo objeto

        const createUserService = new CreateUserService()  //instância
        const user = await createUserService.execute({name, email, password})  //executa método  //envia os parâmetros
        
        return res.json(user)
    }
}
export {CreateUserController}
