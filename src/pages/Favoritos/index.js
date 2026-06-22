

import { useState, useEffect } from "react";
import{Link} from 'react-router-dom'
import { toast } from "react-toastify";
import'./favoritos.css'


function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        let meusFilmes = localStorage.getItem("@primeFlix");
        setFilmes(JSON.parse(meusFilmes) || [])


    }, [])


function excluirFilme(id) {

    let filtroFilmes = filmes.filter((itemsNovo)=>{
        return(itemsNovo.id !== id)
    });

    setFilmes(filtroFilmes);

    localStorage.setItem("@primeFlix",JSON.stringify(filtroFilmes))
    toast.success("Excluido com sucesso!")
}

    return (
    <div className="container">

            
        
        
            <h3>Minha lista</h3>
            {filmes.length===0 ? <span>lista vazia</span> : null}
            


                {filmes.map((items) => {
                return(
                    <div className="items" key={items.id}>
                        
                        <h4>{items.title}</h4>
                        <div className="itmsImg"><img src={`https://image.tmdb.org/t/p/original/${items.poster_path}`} alt={items.title} />
                        
                        <Link to={`/Filme/${items.id}`}>detalhes</Link>
                        <button onClick={()=>excluirFilme(items.id)}>Excluir</button>
                        </div>

                    </div>

                    )
                })}
            
    </div>
            
    )

}

export default Favoritos;

