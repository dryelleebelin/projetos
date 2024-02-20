//criando nossas tipagens

declare namespace Express {
    export interface Request {
        user_id: string
    }
}

//-- temos que informar no arquivo tsconfig.json -- ativa a funcionalidade "typeRoots": [],