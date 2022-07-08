import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import Api from './services/api'
import "./style.css"


function App() {
  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})


  async function Alert(){
    if(!input) return
  
  try {
    const response = await Api.get(`${input}/json/`)
    console.log(response.data)
    setCep(response.data)
    setInput("")
  } catch (error) {
   alert("ops, cep não encontrado")
   setInput("")
  }
}


  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="container-input">
          <input 
          type="text"
          placeholder="  digite seu cep..."
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          />
          <button className="buttonSearch" onClick={Alert}>
            <FiSearch size={25} color="#fff" />
          </button>
      </div>

      {Object.keys(cep).length > 0 && (

          <main className="main">
           <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}



    </div>
  );
  }

export default App;
