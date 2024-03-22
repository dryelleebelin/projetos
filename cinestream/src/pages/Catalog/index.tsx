import React from "react"
import './catalog.scss'

import Header from "../../components/Header/index.tsx"
import Filters from "../../components/Filters/index.tsx"

import avengers from '../../images/avengers.jpg'

import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineDownload } from "react-icons/md";
import { FaRegBookmark, FaBookmark  } from "react-icons/fa";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";

export default function Catalog(){
  return(
    <>
      <Header/>

      <Filters/>

      <main className="main-catalog">
        <section className="billboard">
          <div className="background">
            <img src={avengers} alt="Background"/>
          </div>

          <h1>AVENGERS: ENDGAME</h1>
          <div>
            <button>WATCH <FaRegCirclePlay/></button>
            <button>DOWNLOAD <MdOutlineDownload/></button>
            <FaRegBookmark className="mark"/>
            <BiLike className="like"/>
            <BiDislike className="dislike"/>
          </div>
        </section>
      </main>
    </>
  )
}