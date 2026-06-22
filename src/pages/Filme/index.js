
import { useEffect, useState } from "react";
import { useParams,useNavigate, Navigate } from "react-router-dom";
import api from '../../services/api'
import './filmes.css'
import { toast } from "react-toastify";

function Filme() {

    const { id } = useParams();

    const [detailFimes, setDetail] = useState([]);
    const [loadDetail,setLoadDetail] = useState(true); //tratamento de erro
    const navigate = useNavigate()

    useEffect(() => {

        async function loadDetail() {

            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "50239ae5c0477377a119dc40fe75e949",
                    language: "pt-BR",
                    
                }
            })
            
            .then((response)=>{
                console.log(response);
                setDetail(response.data);
                setLoadDetail(false)
            })
            .catch(()=>{
                console.log("não encontrado")
                //para qundo não encontrar o filme ele volta para a página Home
                navigate("/",{replace:true})
            })



        }
        loadDetail()
        return()=>{
            console.log("Componente desmontado")
        }

    }, [navigate,id])


    function salvarFilme() {

        const minhaLista = localStorage.getItem("@primeFlix");

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilmes = filmeSalvos.some((filmeSalvos)=>filmeSalvos.id === detailFimes.id)

        if (hasFilmes) {
            toast.warning("já existe em sua lista!")
            return
        }

        filmeSalvos.push(detailFimes)
        localStorage.setItem("@primeFlix",JSON.stringify(filmeSalvos))
        toast.success("Adicionado a sua lista!")
    }









    if (loadDetail) {
     
        return(
            <div className="loadinDetail">
                <h1>Carregando detalhes do Filme ...</h1>
            </div>
        )
    }




    return (
        <div className="detailInfo" >

        <div className="imgDetail"><img src={`https://image.tmdb.org/t/p/original/${detailFimes.backdrop_path}`} alt={detailFimes.title}/></div>
        
            <div className="titleBtn">
                
                    <h2>{detailFimes.title} <strong>{detailFimes.vote_average}</strong></h2>
                
                <div className="areaButtom">
                    <button onClick={salvarFilme}>Salvar</button>
                    <button><a href={`https://www.youtube.com/results?search_query=${detailFimes.title} Trailer`} target="blank" rel="external">Trailer</a></button>
                    </div>
            </div>

        <div className="informacoes">
            <h3>Sinops</h3>
            <p>{detailFimes.overview}</p>
        </div>


        </div>

    )
}

export default Filme;