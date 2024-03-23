import React, {useState, useEffect} from "react";
import './topcharts.scss'

import cover1 from '../../images/cover1.jpg'
import cover2 from '../../images/cover2.webp'
import cover3 from '../../images/cover3.jpg'

import {register} from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade';
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

register()

export default function TopCharts(){
  const [slidesPerView, setSlidesPerView] = useState(3) 

  const data = [
    {id: '1', image: cover1},
    {id: '2', image: cover3},
    {id: '3', image: cover3},
    {id: '4', image: cover1},
    {id: '5', image: cover2},
    {id: '6', image: cover3}
  ]

  useEffect((data) => {
    function handleResize(){
        if(window.innerWidth < 480){
            setSlidesPerView(1)
        }
        else if(window.innerWidth >= 481 && window.innerWidth <= 1023){
            setSlidesPerView(3)
        }
        else{
            setSlidesPerView(4)
        }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return() => {
        window.removeEventListener("resize", handleResize)
    }
}, [])

  return (
      <Swiper modules={[FreeMode, Pagination]} slidesPerView={slidesPerView} pagination={{clickable: true}} spaceBetween={30} freeMode={true} navigation>
        {data.map((item) => {
          <SwiperSlide key={item.id}>
            <div>
              <h1 style={{color: 'red'}}>teste</h1>
              <img src={item.image} alt="Cover"/>
              <span>{item.id}</span>
            </div>
          </SwiperSlide>
        })}
      </Swiper>
  )
}