import './carouselseasons.scss'

import { useState, useEffect } from 'react';
import {register} from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade';
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import season1 from '../../images/season1.jpg'
import season2 from '../../images/season2.webp'
import season3 from '../../images/season3.webp'
import season4 from '../../images/season4.webp'
import season5 from '../../images/season5.jpg'
import season6 from '../../images/season6.jpg'
import season7 from '../../images/season7.webp'

register()

export default function CarouselSeasons() {
    const [slidesPerView, setSlidesPerView] = useState(3) 

    const data = [
        { id: '1', image: season1, season: '1', episodes: '11', year: '2013' },
        { id: '2', image: season2, season: '2', episodes: '10', year: '2015' },
        { id: '3', image: season3, season: '3', episodes: '10', year: '2017' },
        { id: '4', image: season4, season: '4', episodes: '10', year: '2019' },
        { id: '5', image: season5, season: '5', episodes: '10', year: '2021' },
        { id: '6', image: season6, season: '6', episodes: '10', year: '2022' },
        { id: '7', image: season7, season: '7', episodes: '10', year: '2023' }
    ]

    useEffect(() => {
        function handleResize(){
            if(window.innerWidth < 720){
                setSlidesPerView(1)
            } else{
                setSlidesPerView(4)
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return() => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
      
    return(
        <Swiper className='swiper-container2' modules={[FreeMode, Pagination]} slidesPerView={slidesPerView} pagination={{clickable: true}} spaceBetween={30} freeMode={true} navigation>
            {data.map((item) => (
                <SwiperSlide key={item.id} className='slide2'>
                    <img src={item.image} alt='Slider' className='slide-item'/>
                    <p>Temporada {item.season}</p>
                    <span>Episódios: {item.episodes}</span>
                    <span>Ano de lançamento: {item.year}</span>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
