import { useState , ChangeEvent ,FormEvent , Dispatch} from 'react';
import { categories } from '../data/categories';
import { DataForm } from '../types/index';
import { dataActions } from '../reducers/data-reducer';
type FormProp = {
  //es de tipo Dispatch , mediante un generic estamos indicando que el dispatch debe estar preparado para recibir una acción que siga la estructura de dataActions
  dispatch :Dispatch<dataActions>
}

const INITIALSTATE = {
  category:1,
  activity:"",
  calories:0
}
export const Form = ({dispatch}:FormProp) => {
  // state para el formulario
  const[dataForm , setDataForm]=useState<DataForm>(INITIALSTATE)
  // e:React.ChangeEvent<HTMLSelectElement> importamos ChangeEvent para eliminar el React
  // ChangeEvent<HTMLInputElement> es para los html de tipo input
  const handleChange =(e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
    // include el array y si el valor de e.target.id es uno de lo que esta en el array devuelve true
    //esto nos permite saber donde estamos escribiendo y para convertir la category en un number , ya que , en el state aparece en forma de string , aunque le hallamos puesto su type en el index
    // entonces durante el seteo verifico mediante un ternario si estamos sobre el input necesario y si es así lo convierto de string a number con un "+"
    const isNumberField = ["category","calories"].includes(e.target.id)
    // hacemos que durante la escritura (evento change) se vaya guardando lo que escribimos
    setDataForm({
      // para que no se pierda los valores iniciales
      ...dataForm, 
      //e.target nos permite identificar sobre que estamos escribiendo
      // asignamos al input que corresponde:valor que se ingrese
      // el uso de corchete hace que el valor sea diferente(propiedad computada (o computed property):Característica que permite definir dinámicamente el nombre de una clave) ,por cada ,input seleccionado , ya que , estamos usando la misma funcion para los 3 diferentes inputs
      [e.target.id]:isNumberField ? +e.target.value :e.target.value
    })
  }

  const isValidActivity = () =>{
    const {calories , activity} = dataForm
    return calories > 0 && activity.trim() !== '';
  }
  //Para enviar el formulario
  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    //enviando los datos que cambiara entonces usamos el dispatch
    dispatch({type:'save-data' , payload : {newData : dataForm}})
    //luego de enviar los datos reiniciamos con los valores iniciales
    setDataForm(INITIALSTATE)
  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg"
    onSubmit={handleSubmit}
    >
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
      className="bg-gray-800 w-full p-2 font-bold text-white uppercase disabled:opacity-10 hover:bg-gray-600"
      // como este es un input de tipo submit el value nos indica que valor se muestra en ese input
      value={dataForm.category === 1 ? "Guardar comida":"Guardar ejercicio"}
      // lo usamos en react para que el boton se habilite/desahabilite mediante una condicion , se habilita el btn si la condicion es false(por eso ponemos el !) y funciona con () , ya que , debemos saber el valor , no esperar a que suceda un evento
      //para que tenga más sentido le damos estilos con disabled:opacity-10
      disabled={!isValidActivity()}
      />
    </form>
  )
}
