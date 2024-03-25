import React from 'react'
import './filters.scss'
import { toast } from 'react-toastify'

export default function Filters() {
    const info = () => {
        toast.info("Em desenvolvimento!")
    }

    return (
        <>
            <form className='container-filters' onClick={info}>
                <select>
                    <option>POR POPULARIDADE</option>
                </select>
                <select>
                    <option>GÊNEROS</option>
                    <option>Action</option>
                    <option>Animation</option>
                    <option>Drama</option>
                    <option>Familie</option>
                    <option>Fantasy</option>
                    <option>Kids</option>
                </select>
                <select>
                    <option>PAÍS</option>
                    <option>Angola</option>
                    <option>United Arab Emirates</option>
                    <option>Brazil</option>
                </select>
                <select>
                    <option>IDIOMA</option>
                    <option>English</option>
                    <option>Russian</option>
                    <option>French</option>
                </select>
                <select>
                    <option>ANO</option>
                </select>
                <input type='text' placeholder='People...'/>
                <button type='submit'>LIMPAR</button>
            </form>
        </>
    )
}