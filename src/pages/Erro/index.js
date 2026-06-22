import{Link} from 'react-router-dom'
import './erro.css'

function Erro(){
    return(
        <div>
            <div className="containerErro">
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <Link className='btnErro' to='/'>Ver todos os filmes!</Link>
            </div>
        </div>
    )
}

export default Erro;