import { useState , ChangeEvent} from 'react';
import { categories } from '../data/categories';
export const Form = () => {
  // state para el formulario
  const[dataForm , setDataForm]=useState({
    category:1,
    activity:"",
    calories:0
  })
  // e:React.ChangeEvent<HTMLSelectElement> importamos ChangeEvent para eliminar el React
  // ChangeEvent<HTMLInputElement> es para los html de tipo input
  const handleChange =(e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
    // hacemos que durante la escritura (evento change) se vaya guardando lo que escribimos
    setDataForm({
      // para que no se pierda los valores iniciales
      ...dataForm, 
      //e.target nos permite identificar sobre que estamos escribiendo
      // asignamos al input que corresponde:valor que se ingrese
      // el uso de corchete hace que el valor sea diferente(propiedad computada (o computed property):Característica que permite definir dinámicamente el nombre de una clave) ,por cada ,input seleccionado , ya que , estamos usando la misma funcion para los 3 diferentes inputs
      [e.target.id]:e.target.value
    })
  }
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" id="category"
        //  este value permite mostrar el valor predeterminado del select,es decir si tiene el valor de "1" busca en la option la category con valor de 1 y muestra el name({category.name} ) ;es decir ,comida .
        //   Tambien tomara el valor de la option seleccionada 
          value={dataForm.category}
          // para que el input cambie necesitamos del onChange
          onChange={handleChange}
          >
          {
            categories.map((category)=>(
              <option 
              key={category.id} 
            //  este value toma el valor que sera enviado cuando se de submit del formulario
              value={category.id}> 
                {category.name}
              </option>
            ))
          }
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-bold">Actividad:</label>
        <input 
          id="activity"
          type="text" 
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Ejemplo:Ensalada , ejercicio , juga de naranja ,..."
          // conectamos el state con el formulario
          value={dataForm.activity} 
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorías:</label>
        <input 
          id="calories"
          type="number" 
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Digite las calorías (ej.300 o 500)"
          // conectamos el state con el formulario
          value={dataForm.calories}
          onChange={handleChange}
        />
      </div>
      <input 
      type="submit" 
      className="bg-gray-800 w-full p-2 font-bold text-white uppercase hover:bg-gray-600"
      value="Guardar comida o Guardar ejercicio"
      />
    </form>
  )
}
