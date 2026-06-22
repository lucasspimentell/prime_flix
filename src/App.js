import RoutesApp from "./routes";
import {ToastContainer} from 'react-toastify'
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} className={"container"} toastClassName={"conteudo"}/>
      <RoutesApp/>
    </div>
  );
}

export default App;
