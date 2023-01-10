import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import IconoCerrar from '../img/cerrar.svg'



const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
  const [nombreGasto, setNombreGasto] = useState('')
  const [cantidadGasto, setCantidadGasto] = useState('')
  const [categoriaGasto, setCategoriaGasto] = useState('')
  const [mensaje, setMensaje]= useState('')
  const [id, setId]= useState('')
  const [fecha, setFecha]= useState('')

 

  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setNombreGasto(gastoEditar.nombreGasto);
      setCantidadGasto(gastoEditar.cantidadGasto);
      setCategoriaGasto(gastoEditar.categoriaGasto);
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

    const handleCerrar = ()=>{
        setGastoEditar({})
        setAnimarModal(false) 
        setTimeout(() => {
         setModal(false);    
        }, 500);
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      if([nombreGasto, cantidadGasto, categoriaGasto].includes('')) {
        setMensaje('Todos los campos son obligatorios');
        setTimeout(() => {
          setMensaje('')
        }, 3000);
        return
      }
      guardarGasto({nombreGasto, cantidadGasto, categoriaGasto, id, fecha});
      setAnimarModal(false) 
      setTimeout(() => {
       setModal(false);    
      }, 1000);
      setNombreGasto('');
      setCantidadGasto('');
      setCategoriaGasto('');
    }

  return (
    <div className="modal">
    <div className="cerrar-modal">
    <img src={IconoCerrar} alt="Cerrar"
    onClick={handleCerrar }/>
    </div>

    <form className={`formulario ${animarModal ? "animar" : "cerrar"}`}
    onSubmit={handleSubmit}>
<legend>{gastoEditar.nombreGasto ? 'editar gasto' : 'Nuevo Gasto'}</legend>
      <div className='campo'>
        <label htmlFor="nombre">Nombre Gasto</label>
        <input type="text" id="nombre" placeholder='Añade el nombre del gasto' value={nombreGasto}
        onChange={(e)=> setNombreGasto(e.target.value)} />
      </div>
      <div className='campo'>
        <label htmlFor="cantidad">Cantidad</label>
        <input type="number" id="cantidad" placeholder='Añade la cantidad' 
        value={cantidadGasto}
        onChange={(e)=> setCantidadGasto(Number(e.target.value))} />
      </div>

      <div className='campo'>
        <label htmlFor="categoria">Categoría</label>
        <select id="categoria" value={categoriaGasto}
        onChange={(e)=> setCategoriaGasto(e.target.value)}>
          <option value="">--Seleccione la categoria--</option>
          <option value="ahorro">Ahorro</option>
          <option value="casa">Casa</option>
          <option value="comida">Comida</option>
          <option value="gastos">Gastos Varios</option>
          <option value="salud">Salud</option>
          <option value="suscripciones">Suscripciones</option>
          <option value="ocio">Ocio</option>
        </select>
      </div>
      <input type="submit" value={gastoEditar.nombreGasto ? 'Guardar cambios' : 'Añadir gasto'} />
      {mensaje && <Mensaje tipo = "error"> {mensaje} </Mensaje>}
    </form>
    </div>
  )
}

export default Modal