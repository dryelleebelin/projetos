import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'
import { router } from './routes'

const app = express()
app.use(express.json())  //formato que vamos usar
app.use(cors())  //habilitando pra qualquer url/ip

app.use(router)  //roteamento

app.use(  //middle acessar imagem
    '/files',  //rota estatica
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){  //se for uma instância do tipo error
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'internal server error.'
    })
})

app.listen(3333, () => console.log('servidor online!'))