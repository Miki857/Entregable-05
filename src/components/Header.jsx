import React from 'react'

import "./css/header.css"
import pokedexImg from "./img/pokedex-3d-logo.png";
import gif1 from "./img/gifs/deoxys-defense.gif"
import gif2 from "./img/gifs/dialga.gif"
import gif3 from "./img/gifs/gigalith.gif"
import gif4 from "./img/gifs/giratina-origin.gif"
import gif5 from "./img/gifs/golurk.gif"
import gif6 from "./img/gifs/groudon.gif"
import gif7 from "./img/gifs/palkia.gif"
import gif8 from "./img/gifs/torterra.gif"
import gif9 from "./img/gifs/tyrantrum.gif"
import gif10 from "./img/gifs/zekrom.gif"

const Header = () => {
  const listSprites = [
    gif1,
    gif2,
    gif3,
    gif4,
    gif5,
    gif6,
    gif7,
    gif8,
    gif9,
    gif10
  ];

  return (
    <section className='header'>
        <img src={pokedexImg} alt="HeaderIMG" />
        <div className='pokemonGif'><img src={listSprites[Math.floor(Math.random() * 10)]} alt="GIF"/></div>
    </section>
  )
}

export default Header;