import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import "./css/pokemon.css"
import { useNavigate } from 'react-router-dom';

const Pokemon = () => {
    //TRAEMOS EL VALOR DE LA VARIABLE GLOBAL 'pokemonId'
    const pokemonId = useSelector((store) => store.pokemonId);//ES UN HOOK.

    //EL AXIOS DEL POKEMON:
    const [pokemon, setPokemon] = useState();
    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
        axios.get(url)
                .then(res => {
                    setPokemon(res.data);
                    //APROVECHAMOS PARA CAMBIAR EL TITULO DE LA PAGINA:
                    document.title = `Pokemon - ${res.data.name.toUpperCase()}`;
                })
                .catch(err => console.log(err));
        
    }, []);
    const navigate = useNavigate();

    return (
        <section className='renderPokemon flex flex-column align-center justify-center'>
            <div className='container basicShadow flex flex-column align-center gap-02'>
                <button className='volverBTN button cursor-pointer' onClick={() => navigate("/pokedex")}>Volver</button>
                {/* HEADER */}
                <div className='header__container flex flex-column align-center gap-01_5'>
                    <figure className={'headerBG_' + pokemon?.types[0].type.name + ' flex flex-column align-center gap-02'}>
                        <div className='sprites__container flex justify-evenly align-center'>
                            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="IMG" className='header__bgIMG'/>
                            <audio src={pokemon?.cries.latest} controls>Contenido no soportado</audio>
                            <div className='flex flex-column gap-01'>
                                <img src={pokemon?.sprites.other.showdown.front_default} alt="Pokemon IMG" />
                                <img src={pokemon?.sprites.other.showdown.front_shiny} alt="Pokemon IMG" />
                            </div>
                        </div>
                        <figcaption className='flex flex-column align-center gap-01'>
                            <h4>#{pokemonId ? pokemonId : ""}</h4>
                            <hr />
                            <h1>{pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1)}</h1>
                        </figcaption>
                    </figure>
                    <div className='flex align-center justify-center gap-02'>
                        <div className='flex flex-column align-center'>
                            <h5>Peso</h5>
                            <h3>{pokemon?.weight}</h3>
                        </div>
                        <div className='flex flex-column align-center'>
                            <h5>Altura</h5>
                            <h3>{pokemon?.height}</h3>
                        </div>
                    </div>
                </div>

                {/* TYPO Y HABILIDADES */}
                <div className='hablilityTypes__container flex flex-column align-center gap-01'>
                    <div className='types flex flex-column align-center gap-00_5'>
                        <h3>Tipo</h3>
                        <div className='flex gap-01'>
                            {
                                pokemon?.types.map((type) => <span key={type.slot} className={"" + type.type.name}>{type.type.name}</span>)
                            }
                        </div>
                    </div>
                    <div className='habilities flex flex-column align-center gap-00_5'>
                        <h3>Habilidades</h3>
                        <div className='flex flex-wrap justify-center gap-00_5'>
                            {
                                pokemon?.abilities.map((ability) => 
                                    <h4 key={ability.slot}>
                                        {ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1)}
                                    </h4>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* ESTADOS */}
                <div className='estados__container flex flex-column gap-01'>
                    <div className='title'>
                        <h2>Estados</h2>
                        <hr />
                    </div>

                    <div className='flex flex-column gap-01'>
                        {/* HP */}
                        <div className='flex flex-column'>
                            <label htmlFor="hp" className='flex justify-between'><span>HP:</span><span>{pokemon?.stats[0].base_stat}/150</span></label>
                            <progress id="hp" value={pokemon?.stats[0].base_stat} max="150"></progress> 
                        </div>
                        {/* ATAQUE */}
                        <div className='flex flex-column'>
                            <label htmlFor="ataque" className='flex justify-between'><span>ATAQUE:</span><span>{pokemon?.stats[1].base_stat}/150</span></label>
                            <progress id="ataque" value={pokemon?.stats[1].base_stat} max="150"></progress> 
                        </div>
                        {/* DEFENSA */}
                        <div className='flex flex-column'>
                            <label htmlFor="defensa" className='flex justify-between'><span>DEFENSA:</span><span>{pokemon?.stats[2].base_stat}/150</span></label>
                            <progress id="defensa" value={pokemon?.stats[2].base_stat} max="150"></progress> 
                        </div>
                        {/* ATAQUE ESPECIAL */}
                        <div className='flex flex-column'>
                            <label htmlFor="ataque_especial" className='flex justify-between'><span>ATAQUE ESPECIAL:</span><span>{pokemon?.stats[3].base_stat}/150</span></label>
                            <progress id="ataque_especial" value={pokemon?.stats[3].base_stat} max="150"></progress> 
                        </div>
                        {/* DEFENSA ESPECIAL */}
                        <div className='flex flex-column'>
                            <label htmlFor="defensa_especial" className='flex justify-between'><span>DEFENSA ESPECIAL:</span><span>{pokemon?.stats[4].base_stat}/150</span></label>
                            <progress id="defensa_especial" value={pokemon?.stats[4].base_stat} max="150"></progress> 
                        </div>
                        {/* VELOCIDAD */}
                        <div className='flex flex-column'>
                            <label htmlFor="velocidad" className='flex justify-between'><span>VELOCIDAD:</span><span>{pokemon?.stats[4].base_stat}/150</span></label>
                            <progress id="velocidad" value={pokemon?.stats[4].base_stat} max="150"></progress> 
                        </div>
                    </div>
                </div>
                
                {/* MOVIMIENTOS */}
                <div className='movimientos__container flex flex-column gap-01'>
                    <div className='title'>
                        <h2>Movimientos</h2>
                        <hr />
                    </div>

                    <div className='moves flex flex-wrap gap-01'>
                        {
                            pokemon?.moves.length != 0 ?
                                pokemon?.moves.map((move, index) => 
                                <div key={index} className='movement'>
                                    <p>{move.move.name}</p>
                                </div>
                                )
                            :
                                <h2>{"No hay Movimientos :("}</h2>
                        }
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pokemon