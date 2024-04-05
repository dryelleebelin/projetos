import React, { useState, useEffect } from 'react'
import './carouselhighlight.scss'

import {register} from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade';
import {Swiper, SwiperSlide} from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'

import visual1 from '../../images/visual1.png'
import visual2 from '../../images/visual2.png'
import visual3 from '../../images/visual3.png'
import visual4 from '../../images/visual4.png'
import visual5 from '../../images/visual5.png'
import visual6 from '../../images/visual6.png'

register()

export default function CarouselHighlight() {
  const [slidesPerView, setSlidesPerView] = useState(3) 

  const data = [
    { id: '1', image: visual1 },
    { id: '2', image: visual2 },
    { id: '3', image: visual3 },
    { id: '4', image: visual4 },
    { id: '5', image: visual5 },
    { id: '6', image: visual6 }
  ]

  useEffect(() => {
    function handleResize(){
      if(window.innerWidth < 480){
          setSlidesPerView(1)
      }
      else if(window.innerWidth >= 481 && window.innerWidth <= 1023){
          setSlidesPerView(2)
      }
      else{
          setSlidesPerView(3)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return() => {
        window.removeEventListener("resize", handleResize)
    }
  }, [])
      
  return(
    <Swiper className='swiper-container' autoplay modules={[EffectCoverflow]} effect="coverflow" slidesPerView={slidesPerView} loop coverflowEffect={{
        rotate: 0, 
        stretch: 18,
        depth: 40,
        modifier: 4,
    }}>
        {data.map((item) => (
            <SwiperSlide key={item.id}>
                <img src={item.image} alt='Slider' className='slide-item'/>
            </SwiperSlide>
        ))}
    </Swiper>
  )
}
