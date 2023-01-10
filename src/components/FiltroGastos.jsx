
const FiltroGastos = ({filtro, setFiltro}) => {
  

  return (
    <div className='filtros sombra contenedor'>
        <form >
        <div className='campo'>
           <label>Filtrar</label> 
           <select id="filtro" value={filtro}
        onChange={(e)=> setFiltro(e.target.value)}>
            <option value="">--Todas las categorias--</option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos Varios</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="ocio">Ocio</option>
           </select>
        </div>
        </form>
        
    </div>
  )
}

export default FiltroGastos