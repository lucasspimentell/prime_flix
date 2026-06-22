import {useEffect,useState} from 'react'
import './home.css'
import api from '../../services/api'
import {Link} from 'react-router-dom'

//movie/now_playing?api_key=50239ae5c0477377a119dc40fe75e949&language=pt-br


function Home(){
    const [filmes,setfilmes] = useState([]);
    const [loadFilmes,setload] = useState(true);

    
    
    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key:"50239ae5c0477377a119dc40fe75e949",
                    language:"pt-BR",
                    page:1
                }

            })
            /* console.log(response.data.results.slice(0,10)) */

            setload(false)
            setfilmes(response.data.results.slice(0,10))
        }

        loadFilmes();

    },[])

    
   /*  function carregar() {
       
    } */


    if(loadFilmes){
      return(
        <h2 className='loadtext'>Carregando filmes...</h2>
      )
    }

    return(
        <div className='containerHome'>
           
            <div className="filmes">
                {filmes.map((item)=>{
                return(
                    <div key={item.id} className='filmesItem'>

                    <h2>{item.title}</h2>

                    <div className="imagem"><Link to={`/Filme/${item.id}`}><img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title}/></Link></div>

                    <Link className='link' to={`/Filme/${item.id}`}>Acessar</Link>
                    
                    </div>
                )
            })}
            </div>
            {/* <div className="carregarContainer"><button className='carregarBtn' onClick={carregar}>Carregar</button></div> */}
        </div>
    )
}

export default Home;