import React, { useEffect, useRef, useState } from 'react';

//STYLES//
import "./css/pagination.css";

const Pagination = ({limit, setLimit, offset, setOffset, totalPaginas}) => {//EL 'offset' es la pagina('page').

    const handlePagingNext = (value) => {
        if(offset + value > -1 && (offset + value) / limit <= totalPaginas){
            setOffset(offset + value);
            //Cambiamos los valores de los botones:
            const buttons = document.querySelectorAll(".numberBtn");
            let skipPages = (offset + value) / limit;//No usamos offset porque no se actualiza has ta salir de esta funcion. Ten en cuenta que 'offset' aqui = 'offset + value'.
            for(const btn of buttons){
                btn.innerText = "" + (skipPages + 1);
                skipPages++;
                //Ocultamos los botones que excedan el total de paginas.
                if(skipPages + 1 > totalPaginas + 1){
                    btn.hidden = true;
                }else{
                    btn.hidden = false;
                }
            }
        }
    };

    const handlePagingTo = (value) => {
        setOffset(value);
    };

    // //Creamos los botones:
    // const totalButtons = totalPaginas > 6 ? 6 : totalPaginas;
    // const solidBtn__container = useRef();
    // useEffect(() => {
    //     for(let i = 0; i < totalButtons; i++){
    //         const button = document.createElement("button");
    //         button.setAttribute("class", "cursor-pointer numberBtn");
    //         button.innerText = i + 1;
    //         // const myFun = () => {
    //         //     console.log(limit)
    //         //     console.log(button.innerText - 1)
    //         //     button.removeEventListener("click", myFun)
    //         //     handlePagingTo((button.innerText - 1)*limit)
    //         // }
    //         // button.addEventListener("click", myFun);
    //         solidBtn__container?.current.appendChild(button);
    //     }
    // }, [totalButtons]);

    //ACTUALIZAMOS BOTONES CUANDO SE NECESITE:
    useEffect(() => {
        if(offset == 0){//Cuando 'offset' es 0, es porque volvimos a la pagina 1.
            //Cambiamos los valores de los botones:
            const buttons = document.querySelectorAll(".numberBtn");
            let skipPages = 0;//REINICIO
            for(const btn of buttons){
                btn.innerText = "" + (skipPages + 1);
                skipPages++;
            }
        }

        //Cambiamos los valores de los botones:
        const buttons = document.querySelectorAll(".numberBtn");
        let skipPages = offset / limit;//No usamos offset porque no se actualiza has ta salir de esta funcion.
        for(const btn of buttons){
            btn.innerText = "" + (skipPages + 1);
            skipPages++;
            //Ocultamos los botones que excedan el total de paginas.
            if(skipPages + 1 > totalPaginas + 1){
                btn.hidden = true;
            }else{
                btn.hidden = false;
            }
        }
    }, [offset]);

    //Detectar un cambio en el filtro de pokemones:
    const selectChange = (event) => {
        const value = event.target.value;
        if(value != limit){
            switch(value){
                case "5":
                    setLimit(5);
                    break;
                case "10":
                    setLimit(10);
                    break;
                case "15":
                    setLimit(15);
                    break;
            }
        }
    }

    return (
        <section className='pagination__container'>
            <div className='flex flex-wrap justify-center gap-00_5'>
                <button onClick={() => handlePagingNext(-limit)} className='button cursor-pointer'>{"<"}</button>

                <button onClick={(event) => handlePagingTo((event.target.innerText - 1)*limit)} className='button cursor-pointer numberBtn'>1</button>
                <button onClick={(event) => handlePagingTo((event.target.innerText - 1)*limit)} className='button cursor-pointer numberBtn'>2</button>
                <button onClick={(event) => handlePagingTo((event.target.innerText - 1)*limit)} className='button cursor-pointer numberBtn'>3</button>
                <button onClick={(event) => handlePagingTo((event.target.innerText - 1)*limit)} className='button cursor-pointer numberBtn'>4</button>
                <button onClick={(event) => handlePagingTo((event.target.innerText - 1)*limit)} className='button cursor-pointer numberBtn'>5</button>
                <button onClick={(event) => handlePagingTo((event.target.innerText - 1)*limit)} className='button cursor-pointer numberBtn'>6</button>
                
                <button onClick={() => handlePagingNext(limit)} className='button cursor-pointer'>{">"}</button>
            </div>
            <div className='flex align-center gap-00_5'>
                <span>Pokemones a mostrar: </span>
                <select onChange={selectChange} className='cursor-pointer'>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                </select>
            </div>
        </section>
    )
}

export default Pagination