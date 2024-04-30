import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import { useEffect, useState } from "react";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Pokedex from "./pages/Pokedex";
import axios from "axios";
import Pokemon from "./pages/Pokemon";
import { useSelector } from "react-redux";

import "./attributes.css";

function App() {
  const [credentials, setCredentials] = useState();

  //CARGAR TODOS LOS TIPOS DE POKEMON:
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const url = "https://pokeapi.co/api/v2/type";
  useEffect(() => {
    axios.get(url)
        .then(res => setPokemonTypes(res.data.results))
        .catch(err => console.log(err));
  }, []);
  
  //REACT-REDUX:
  const pokemonId = useSelector((store) => store.pokemonId);//ES UN HOOK.
  
  return (
  <>
    <Header/>

    <Routes>
        <Route element={<ProtectedRoutes credentials={credentials}/>}>
          <Route path='/pokedex' element={<Pokedex credentials={credentials} pokemonTypes={pokemonTypes}/>}/>
          <Route path={'/pokedex/' + pokemonId} element={<Pokemon/>}/>
        </Route>
      <Route path="/" element={<Landing setCredentials={setCredentials}/>}/>
      <Route path="*" element={<div className="flex flex-column align-center">
                                  <h2>404:</h2>
                                  <h3>Ups...talvez deverias volver.</h3>
                                  <img src="https://i.pinimg.com/originals/64/db/a5/64dba523e4ce31583945464bc674017f.gif" alt="IMG" width="200" height="200"/>
                              </div>}/>
    </Routes>
  </>
  )
}

export default App;
