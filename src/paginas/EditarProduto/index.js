import React, { useState, useRef, useEffect } from "react";
import './editarproduto.css';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api'
import { FiUpload } from 'react-icons/fi';


export default function EditarProduto() {
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [ml, setMl] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { id } = useParams();
    const fileInputRef = useRef('');

    const handleNome = (event) => {
        setNome(event.target.value);
    }
    const handlePreco = (event) => {
        setPreco(event.target.value);
    }
    const handleMl = (event) => {
        setMl(event.target.value);
    }

    const handleEditar = async () => {
        try {
            const respone = await api.put(`Produtos/editarProduto/${id}`, {
                nomeProduto: nome, valor: preco,
                quantidadeMl: ml, tipoId: 1
            })
            if (respone.status === 200) {
                setNome('')
                setPreco('')
                setMl('')
            }
        } catch (error) {

        }
    }


    const handleFormSubmit = async (e) => {

        if (selectedFiles.length === 0) {
            console.log("Selecione pelo menos uma foto")
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }
        try {
            const response = await api.post(`/Produtos/Atualizarfoto/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Foto enviada com sucesso");
        } catch (error) {
            console.log("Erro ao enviar a foto")
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleObterProduto = async () => {
        try {
            await api.get(`produtos/obterProduto/${id}`).then((response) => {
                setNome(response.data.nomeProduto);
                setPreco(response.data.valor);
                setMl(response.data.quantidadeMl);  
                setSelectedFiles(`http://localhost/images/${response.data.foto}`)
                console.log(response.data.foto)
            })
        } catch (error) {
        }
    }

    useEffect(() => {
        handleObterProduto()
    }, [])

    return (
        <div className="body-editar">
            <h2>Editar produto</h2>
            <div>
                <label>Atualizar nome do produto:</label>
                <input type="text" value={nome} placeholder='Digite o nome do produto' onChange={handleNome} />
            </div>
            <div>
                <label>Atualizar preço do produto:</label>
                <input type="text" value={preco} placeholder='Digite o novo valor' onChange={handlePreco} />
            </div>
            <div>
                <label>Atualizar ml do produto:</label>
                <input type="text" value={ml} placeholder='Digite o novo valor' onChange={handleMl} />
            </div>
            <div>
                <FiUpload onClick={handleImageClick} color="black" size={25} />
                <button className='botao-upload' onClick={handleFormSubmit} type="button">Carregar foto</button>
                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <div className="botoes">
                <button className="btn btn-danger">Excluir</button>
                <button className="btn btn-success" onClick={handleEditar}>Atualizar</button>
            </div>
        </div>
    )
}