import React from 'react'
import Gasto from './Gasto'

const ListaGastos = ({gastos, setGastoEditar, eliminarGasto, gastosFiltrados, filtro}) => {
  return (
    <div className="listado-gastos contenedor">
        
        {filtro !== '' ?
            <>
            <h2>{gastosFiltrados.length ? `Gastos de ${filtro} `: `No hay gastos de ${filtro}`}</h2>
        { gastosFiltrados.map((gasto)=> 
         <Gasto
         eliminarGasto={eliminarGasto}
         setGastoEditar= {setGastoEditar}
         key = {gasto.id}
         gasto = {gasto}/>
         )}
         </>
        :
        <>
        <h2>{gastos.length ? 'Gastos': 'No hay gastos registrados'}</h2>
        {gastos.map((gasto)=> 
        <Gasto
        eliminarGasto={eliminarGasto}
        setGastoEditar= {setGastoEditar}
        key = {gasto.id}
        gasto = {gasto}/>
        )}
        </>
         }
        
    </div>
  )
}

export default ListaGastos