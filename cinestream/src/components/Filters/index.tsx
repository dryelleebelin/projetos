import React from 'react'
import './filters.scss'

export default function Filters(){
  return(
   <>
    <form className='container-filters'>
      <select>
          <option>FOR POPULARITY</option>
      </select>
      <select>
          <option>COMEDY</option>
      </select>
      <select>
          <option>COUNTRY</option>
      </select>
      <select>
          <option>YEAR</option>
      </select>
      <button type='submit'>CLEAR</button>
    </form>
   </>
  )
}