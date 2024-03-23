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
                    <option>FOR POPULARITY</option>
                </select>
                <select>
                    <option>GENRES</option>
                    <option>Action</option>
                    <option>Animation</option>
                    <option>Drama</option>
                    <option>Familie</option>
                    <option>Fantasy</option>
                    <option>Kids</option>
                </select>
                <select>
                    <option>COUNTRY</option>
                    <option>Angola</option>
                    <option>United Arab Emirates</option>
                    <option>Brazil</option>
                </select>
                <select>
                    <option>LANGUAGES</option>
                    <option>English</option>
                    <option>Russian</option>
                    <option>French</option>
                </select>
                <select>
                    <option>YEAR</option>
                </select>
                <input type='text' placeholder='People...'/>
                <button type='submit'>CLEAR</button>
            </form>
        </>
    )
}