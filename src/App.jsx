import { useState, useEffect } from 'react'
import Header from './components/Header';
import { generarID } from './helpers';
import Modal from './components/Modal';
import ListaGastos from './components/ListaGastos';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import FiltroGastos from './components/FiltroGastos';

function App() {

  const [presupuesto, setPresupuesto]= useState(
    Number(localStorage.getItem('presupuesto'))?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto]= useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos]= useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])

  const [gastoEditar, setGastoEditar]= useState({})
  const [filtro, setFiltro]= useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])

 

  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
     
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }

  }, [gastoEditar])

  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(()=>{
    const presupuestoLS= Number(localStorage.getItem('presupuesto'))?? 0;
    if(presupuestoLS >= 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(()=>{
    if(filtro){
      const gastosFiltrados=gastos.filter((gasto)=> gasto.categoriaGasto === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
}, [filtro])

  const handleNuevoGasto = () => {
      setModal(true)
      setGastoEditar({})
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
  }
 
  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizados = gastos.map((gastoState => gastoState.id === gasto.id ? gasto: gastoState))
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
    gasto.id = generarID();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto])
    }
    
  }

  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter((gasto)=> gasto.id !== id)
    setGastos(gastosActualizados)
  }


  
  return (
    <div className={modal ? 'fijar': ''} >
      <Header
      gastos = {gastos}
      setGastos = {setGastos}
      presupuesto= {presupuesto}
      setPresupuesto= {setPresupuesto}
      isValidPresupuesto = {isValidPresupuesto}
      setIsValidPresupuesto = {setIsValidPresupuesto}
      />
    {isValidPresupuesto && 
    <>
      <main>
      <FiltroGastos
      filtro= {filtro}
      setFiltro={setFiltro}
      />
      
      <ListaGastos
      setGastoEditar= {setGastoEditar}
      eliminarGasto={eliminarGasto}
      gastos={gastos}
      gastosFiltrados = {gastosFiltrados}
      filtro= {filtro}/>
      </main>
        <div className='nuevo-gasto'>
        <img src={IconoNuevoGasto} alt="Icono Nuevo Gasto" 
        onClick={handleNuevoGasto}/>
      </div>
     </>
     }

     {modal && <Modal
     setGastoEditar={setGastoEditar}
     gastoEditar ={gastoEditar}
     setModal= {setModal}
     animarModal ={animarModal}
     setAnimarModal= {setAnimarModal}
     guardarGasto={guardarGasto}
     />}


    </div>
  )
}

export default App
