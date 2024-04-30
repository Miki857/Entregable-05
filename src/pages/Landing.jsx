import React, { useRef } from 'react'
import "./css/landing.css"
import { useNavigate } from 'react-router-dom';

const Landing = ({setCredentials}) => {//Este componente se va a encargar de darle un valor a las credenciales.
  const inputUser = useRef();//Hacemos una referencia al 'input' del username.
    
  const navigate = useNavigate();//Para poder rediriginos.

  const handleSubmit = (event) => {
    event.preventDefault();
    setCredentials(inputUser.current.value);//Le doy un valor a las credenciales.
    navigate("/pokedex");
  };

  return (
    <main className='flex align-center justify-center'>

      <div className='container flex flex-column align-center'>
        <h2>¡Hola entrenador!</h2>
        <p>Para poder comenzar, dame tu nombre</p>

        <form onSubmit={handleSubmit} className='basicShadow'>
          <input className='input' type="text" ref={inputUser} minLength="3" maxLength="15" required/>
          <button className='button cursor-pointer'>Comenzar</button>
        </form>
      </div>
    </main>
  )
}

export default Landing;