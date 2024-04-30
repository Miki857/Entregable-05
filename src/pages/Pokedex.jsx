import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { changeID } from "../store/slices/pokemon.slice";
import { useNavigate } from 'react-router-dom';

//STYLES//
import "./css/pokedex.css"

const Pokedex = ({credentials, pokemonTypes, }) => {
    const pokemonId = useSelector((store) => store.pokemonId);
    const [pokemones, setPokemones] = useState();
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [searchType, setSearchType] = useState("");
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    
    useEffect(() => {//useEffect de entrada:
        //APROVECHAMOS PARA CAMBIAR EL TITULO DE LA PAGINA:
        document.title = "Pokemon - Pokedex";
    }, []);
    
    useEffect(() => {
        //SI CAMBIAMOS EL VALOR DE 'offset', TENEMOS QUE CAMBIAR EL ESTADO DE URL:
        //Primero necesito identificar si buscamos en forma normal ó de tipo.
        if(searchType == ""){
            setUrl(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
            // console.log(777)
        }else{
            // console.log(111)
            axios.get(url)
                .then(res => {
                    // console.log(4441)
                    setPokemones(res.data.results ? res.data.results : res.data.pokemon);
                    setPokemonesData([]);
                })//SOLO CONSEGUIMOS SUS NOMBRES Y LA API DE SU INFO.
                .catch(err => console.log(err));
        }
    }, [offset, searchType]);//searchType, para cuando se cambie el tipo y 'offset' ya sea 0. Cuando 'setOffset' y 'offset' son iguales, el 'useEffect' no se dispara.
    
    useEffect(() => {
        if(offset == 0){
            //Si al momento de cambiar el 'limit', offset = 0, entonces el useEffect de arriba no se va a disparar.
            if(searchType == ""){
                setUrl(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
                // console.log(777)
            }else{
                // console.log(111)
                axios.get(url)
                    .then(res => {
                        setPokemones(res.data.results ? res.data.results : res.data.pokemon);
                        setPokemonesData([]);
                    })//SOLO CONSEGUIMOS SUS NOMBRES Y LA API DE SU INFO.
                    .catch(err => console.log(err));
            }
        }else{
            //Usamos el useEffect de ARRIBA.
            setOffset(0);
        }
    }, [limit]);
    
    useEffect(() => {
        if(searchType == ""){
            axios.get(url)
                .then(res => {
                    // console.log(444)
                    setPokemones(res.data.results ? res.data.results : res.data.pokemon);
                    setPokemonesData([]);
                })//SOLO CONSEGUIMOS SUS NOMBRES Y LA API DE SU INFO.
                .catch(err => console.log(err));
        }
    }, [url]);

    //CARGAR LOS DATOS DE LOS POKEMON:
    const [pokemonesData, setPokemonesData] = useState([]);
    useEffect(() => {
        if(pokemones){
            if(pokemones.length > limit){
                //SIGNIFICA QUE ESTAS BUSCANDO POR TIPOS:
                for(const pokemon of pokemones.slice(offset, offset + limit)){
                    axios.get(pokemon.pokemon.url)
                        .then(res => {
                            setPokemonesData(pokemonesData2 => [...pokemonesData2, res.data]);//AQUI ESTAN SON SUS DATOS COMPLETOS.
                        })//SOLO CONSEGUIMOS SUS NOMBRES Y LA API DE SU INFO.
                        .catch(err => console.log(err));
                }
            }else{
                //BUSQUEDA NORMAL:
                for(const pokemon of pokemones){
                    axios.get(pokemon.url)
                        .then(res => {
                            setPokemonesData(pokemonesData2 => [...pokemonesData2, res.data]);//AQUI ESTAN SON SUS DATOS COMPLETOS.
                        })//SOLO CONSEGUIMOS SUS NOMBRES Y LA API DE SU INFO.
                        .catch(err => console.log(err));
                }
            }
        }
    }, [pokemones]);//SE EJECUTARA SIEMPRE QUE CAMBIE 'pokemones'.

    //NECESITAMOS SABER CUANTOS POKEMON HAY EN LA API:
    const [totalPokemonesApi, setTotalPokemonesApi] = useState();
    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/?limit=2000")
            .then(res => setTotalPokemonesApi(res.data.results))//SOLO CONSEGUIMOS SUS NOMBRES Y LA API DE SU INFO.
            .catch(err => console.log(err));
    }, []);//DEPENDERA DE 'pokemones'. Porque este cambiara cada que cambie la 'url'(url cambia cuando el usuario elige buscar por tipo de pokemon).

    //CARGAMOS LOS POKEMONES A LA LISTA:
    const ulPokemon = useRef();
    const inputPokemon = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        //CARGAMOS LOS POKEMONES A LA LISTA DINAMICA:
        totalPokemonesApi?.forEach((el) => {
            const li = document.createElement("li");
            li.innerText = el.name.toUpperCase();
            li.classList.add("class", "cursor-pointer");
            
            li.addEventListener("click", () => {
                inputPokemon.current.value = el.name.toUpperCase();
                dispatch(changeID(el.url.split("https://pokeapi.co/api/v2/pokemon/")[1].split("/")[0]))//CANMBIAMOS EL 'pokemonId'(Variable Global).
                //OCULTAMOS TODOS LOS <li>:
                document.querySelectorAll('#list li').forEach((li) => {
                    li.hidden =true;
                })
            });

            li.hidden = true;//LOS OCULTAMOS. APARECERAN CUANDO EL USARIO TIPEE ALGO EN EL INPUT.

            //LOS AGREGAMOS AL UL:
            ulPokemon.current.appendChild(li);
        });
    
        //LISTA DE POKEMON DEL INPUT.
        const labelInputPokemon = document.getElementById("labelInputPokemon");
        inputPokemon?.current.addEventListener("input", () => {//Cada que el usuario tipea en el input.
            const listItems = document.querySelectorAll('#list li');//SELECCIONO TODOS LOS <li> del <ul>.
            let isMatch = false;
            listItems.forEach(li => {
                if(li.innerText.includes(inputPokemon.current.value.toUpperCase()) && inputPokemon.current.value.length > 0){
                    isMatch = true;
                    return li.hidden = false;
                }
                return li.hidden = true;
            })
            
            //HAY MATCHS?:
            if(!isMatch){
                //SIEMPRE QUE EL INPUT TENGA TEXTO:
                if(inputPokemon.current.value.length > 0) labelInputPokemon.classList.remove("hiddenOpacity");
            }else labelInputPokemon.classList.add("hiddenOpacity");
        });

    }, [totalPokemonesApi]);

    //BUSCAR POKEMON POR EL INPUT:
    const navigate = useNavigate();
    const labelInputPokemon = document.getElementById("labelInputPokemon");
    const buscarPokemon = (event) => {
        event.preventDefault();
        //Verificamos que el usuario escribio correctamente el pokemon:
        totalPokemonesApi.map(pokemon => {
            if(pokemon.name == inputPokemon.current.value.toLowerCase()){
                //Primero obtengo su ID, que no siempre es el mismo que su indice en el array.
                const id = pokemon.url.split("https://pokeapi.co/api/v2/pokemon/")[1].split("/")[0];
                dispatch(changeID(id));//Cmabiamos en el REDUX.
                navigate("/pokedex/" + id);//Redireccionamos.
                return id;
            }
        });

        //Si Llegamos aca es porque el nombre es incorrecto en el input:
        labelInputPokemon.classList.add("hiddenOpacity");
        setTimeout(() => labelInputPokemon.classList.remove("hiddenOpacity"), 350);
    }

    //CARGAMOS LOS TIPOS A LA LISTA:
    const listaTipoPokemon = useRef();
    useEffect(() => {
        for(const type of pokemonTypes){
            if(type.name != "shadow" && type.name != "unknown"){//ESTOS 2 NO SE CARGAN YA QUE SU LISTA DE POKEMONES ESTAN VACIAS.
                const option = document.createElement("option");//CREAMOS LA 'OPTION'.
                option.setAttribute("value", type.name);//LE AGREGAMOS SU 'value' PARA POSTERIOR USO.
                option.text = type.name.toUpperCase();//LE DOY UN TEXTO QUE MOSTRAR.
                //AHORA HAY QUE AGREGARLO A LA LISTA:
                listaTipoPokemon.current.appendChild(option);//EN MAYUSCULA.
            }
        }

        //Ocultamos la lista cuando el input pierde el foco:
        document.querySelector(".search__section").addEventListener("focusout", () => {
            const listItems = document.querySelectorAll('#list li');
            setTimeout(() => {
                listItems.forEach(li => {
                    return li.hidden = true;
                })
            }, 100);
        });
    }, []);

    //Detectar un cambio en el filtro de pokemones:
    const selectChange = (event) => {
        setOffset(0);//Regresamos a pagina 1.
        if(event.target.value == ""){
            setSearchType("");
        }else{
            setUrl("https://pokeapi.co/api/v2/type/" + event.target.value);
            setSearchType(event.target.value);
        }
    }

    return (
        <section className='pokedex'>
            <p className='welcomeText'><span>Bienvenido {credentials},</span> aquí podras encontrar tu pokemon favorito.</p>
            
            <section className='search__section flex flex-column gap-01'>
                {/* FORMULARIO DE BUSQUEDA */}
                <form onSubmit={buscarPokemon} className='basicShadow' autoComplete="off">
                    <label htmlFor="inputPokemon" id='labelInputPokemon' className='hiddenOpacity'>No Matchs</label>
                    <input type="text" id='inputPokemon' ref={inputPokemon} className='input' required/>
                    <button className='button cursor-pointer'>Buscar</button>
                </form>
                {/* LISTA DE RESULTADOS */}
                <ul className='ulPokemon basicShadow' id='list' ref={ulPokemon}>
                </ul>
                {/* SELECCIONAR TIPO DE POKEMON */}
                <select onChange={selectChange} ref={listaTipoPokemon} className='basicShadow cursor-pointer'>
                    <option value="">--Filtrar por Tipo--</option>
                </select>
            </section>

            {/* AQUI SE MUESTRAN LOS POKEMONES */}
            <div className='pokemons__container'>
                {
                    pokemonesData?.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon}/>)
                }
            </div>

            {/* PAGINATION */}
            <Pagination 
                limit={limit} 
                setLimit={setLimit} 
                offset={offset} 
                setOffset={setOffset} 
                //           se filtra por tipo                                                  se busca de modo normal
                totalPaginas={pokemones?.length > limit ? Math.ceil(pokemones?.length / limit) : Math.ceil
                (totalPokemonesApi?.length / limit)}
            />
        </section>
    )
}

export default Pokedex