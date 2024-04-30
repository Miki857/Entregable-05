import { useDispatch } from 'react-redux';
import { changeID } from '../store/slices/pokemon.slice';
import "./css/pokemonCard.css"
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({pokemon}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const buscarPokemon = (event) => {
        event.preventDefault();
        dispatch(changeID(pokemon.id))//CANMBIAMOS EL 'pokemonId'(Variable Global).
        navigate("/pokedex/" + pokemon.id);//Redireccionamos.
    }

    return (
        <div className={`pokemonCard ${pokemon.types[0].type.name} cursor-pointer`} onClick={buscarPokemon}>
            <img src={pokemon.sprites.other.showdown.front_default} alt="Pokemon IMG"/>

            <div>
                <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} <span>#{pokemon.id}</span></h2>
                <div className='flex flex-column align-center'>
                    <h3>{pokemon.types.map((type) => type.type.name[0].toUpperCase() + type.type.name.slice(1) + "/")}</h3>
                    <h4>Tipo</h4>
                </div>
            </div>

            <div className='stats__container flex flex-wrap'>
                {
                    pokemon.stats.map((stat, index) => 
                    <div key={index} className='flex flex-column align-center justify-center'>
                        <h5>{stat.stat.name}</h5>
                        <h4>{stat.base_stat}</h4>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default PokemonCard