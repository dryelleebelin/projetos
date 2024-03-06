import Head from "next/head";
import styles from './styles.module.scss'
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";
import {FiUpload} from 'react-icons/fi'
import { useState, ChangeEvent, FormEvent } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

type ItemProps = {
    id: string
    name: string
}

interface CategoryProps{  //lista
    categoryList: ItemProps[]
}

export default function Product({categoryList}: CategoryProps){
    const [avatarUrl, setAvatarUrl] = useState('') //preview 
    const [imageAvatar, setImageAvatar] = useState(null)
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return
        }
        const image = e.target.files[0]
        if(!image){
            return
        }
        if(image.type === 'image/png' || image.type === 'image/jpeg'){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))  //para mostrar pro usuário antes de enviar pro banco de dados
        }
    }

    //quando selecionar uma nova categoria na lista
    function handleChangeCategory(event){
        setCategorySelected(event.target.value)
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault()

        try{
            const data = new FormData()  //tipo multipart form data - para imagens e etc
            if(name === '' || price == '' || description === '' || imageAvatar === null){
                toast.error("Preencha todos os campos!")
                return
            }
            data.append('name', name) //adicionando um item no multipart form data 
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient()
            await apiClient.post('/product', data)

            toast.success("Produto cadastrado com sucesso!")
        } catch(err){
            toast.error("Erro ao cadastrar!")
            console.log(err)
        }

        setName('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarUrl('')
    }

    return(
        <>
            <Head>
                <title>Novo produto - Sujeito Pizzaria</title>
            </Head>

            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Novo produto</h1>
                    
                    <form className={styles.form} onSubmit={handleRegister}>
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#fff"/>
                            </span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>  {/* tipos de imagem que vai aceitar */}
                            {avatarUrl && 
                                <img className={styles.preview} src={avatarUrl} alt="Foto do produto" width={250} height={250}/>
                            }
                        </label>
                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                        <input className={styles.input} type="text" placeholder="Digite o nome do produto" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input className={styles.input} type="text" placeholder="Digite o preço do produto" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        <textarea className={styles.input} placeholder="Descreva seu produto..." value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <button type="submit">Cadastrar</button>
                    </form>
                </main>
            </div>
        </>
    )
}

//executado antes da interface carregar/ser montada
export const getServerSideProps = canSSRAuth(async (ctx) => { 
    const apiClient = setupAPIClient(ctx)  //instâciando chamada
    const response = await apiClient.get('/category')
    //console.log(response.data)

    return{
        props: {
            categoryList: response.data
        }
    }
})