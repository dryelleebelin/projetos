import React, { useState, useEffect } from 'react'
import './carouselhighlight.scss'

import {register} from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade';
import {Swiper, SwiperSlide} from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'

import cover1 from '../../images/cover1.png'
import cover2 from '../../images/cover2.png'
import cover3 from '../../images/cover3.png'
import cover4 from '../../images/cover4.png'
import cover5 from '../../images/cover5.png'
import cover6 from '../../images/cover6.png'

register()

export default function CarouselHighlight() {
  const [slidesPerView, setSlidesPerView] = useState(3) 

  const data = [
    { id: '1', image: cover1 },
    { id: '2', image: cover2 },
    { id: '3', image: cover3 },
    { id: '4', image: cover4 },
    { id: '5', image: cover5 },
    { id: '6', image: cover6 }
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
