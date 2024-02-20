import crypto from 'crypto'
import multer from "multer";
import {extname, resolve} from 'path'

export default {
    upload(folder: string){  //fornecer a pasta que quer salvar
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {  //para não ter conflito de nome  //multer
                    const fileHash = crypto.randomBytes(16).toString("hex")
                    const fileName = `${fileHash}-${file.originalname}`  //nome 
                    return callback(null, fileName)
                }
            })
        }
    }
}