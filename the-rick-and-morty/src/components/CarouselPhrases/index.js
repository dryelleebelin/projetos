import './carouselphrases.scss';
import { useState, useEffect } from 'react';
import {register} from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade';
import {Swiper, SwiperSlide} from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

import background1 from '../../images/background.png'
import background2 from '../../images/background2.png'
import background3 from '../../images/background3.png'
import background4 from '../../images/background4.png'
import background5 from '../../images/background5.png'
import background6 from '../../images/background6.png'
import background7 from '../../images/background7.png'
import background8 from '../../images/background8.png'

register()

export default function CarouselPhrases() {
    const [slidesPerView, setSlidesPerView] = useState(3) 

    const data = [
        { id: '1', image: background1 },
        { id: '2', image: background2 },
        { id: '3', image: background3 },
        { id: '4', image: background4 },
        { id: '5', image: background5 },
        { id: '6', image: background6 },
        { id: '7', image: background7 },
        { id: '8', image: background8 }
    ]

    useEffect(() => {
        function handleResize(){
            if(window.innerWidth < 480){
                setSlidesPerView(1)
            }
            else if(window.innerWidth >= 481 && window.innerWidth <= 1023){
                setSlidesPerView(1)
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
        <Swiper className='swiper-container' autoplay modules={[EffectCoverflow]} effect="coverflow" slidesPerView={slidesPerView} pagination={{clickable: true}} loop coverflowEffect={{
            rotate: 0, 
            stretch: 0,
            depth: 110,
            modifier: 3,
        }}>
            {data.map((item) => (
                <SwiperSlide key={item.id}>
                    <img src={item.image} alt='Slider' className='slide-item'/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
