import type { DataForm } from '../types/index';
//como base se debe tener el state initial , la funcion reducer y las acciones , el stateInitial y el reducer lo exportaremos en mi archivo app

//las acciones(Es una "plantilla" que le dice a TypeScript qué tipo de datos esperar cuando despaches una acción.) lo ponemos de tipo type , ya que , nos permite definir como deben lucir esas acciones
export type dataActions = {
  type:'save-data',
  //el payload lo ponemos como objeto ya que es más flexible (puedes incluir múltiples datos),es más legible (cada dato tiene un nombre claro),facilita la validación y el mantenimiento en sistemas grandes,aprovecha la validación automática de TypeScript.
  payload:{
    //este son los datos(objeto) que cambian al state y que es de tipo DataForm
    newData : DataForm
  }
}

//type del state inicial , que tomara el type del DataForm
type dataInitialState = {
  data : DataForm[]
}
//state inicial , en general se le pone como un objeto ,ya que, se puede tener varias propiedades ,pero puede ser un array , numero ,etc
export const initialSate:dataInitialState={
  data:[] //el state inicial tiene como valor inicial un array vacio
}

//la funcion reducer
export const dataReducer = (
  state:dataInitialState=initialSate , action :dataActions) =>{
    switch(action.type){
      case 'save-data':
        //muestra los datos ingrresados en el form
        // console.log(action.payload.newData)
        //en el return debemos el estado actualizado
        return {
          // copiamos todos los datos del state iniciales , esto permite que si hubiera mas datos se copiarian
          ...state ,
          //luego se da submit al formulario tendremos nuevos datos , copiamos los datos que habian inicialmente con el sprint(...state.data , a diferencia del state de arriba a ca solo se copia lo que hay en data[]) y le aumentamos la nueva data, finalmente tendremos un array de objetos con los nuevos datos
          data : [...state.data , action.payload.newData]
        }
      default:
        return state
    }
}  
