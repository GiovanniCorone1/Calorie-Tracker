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
} |
{type:'get-id',payload :{id : DataForm['id']}} |
{type:'delete-data',payload:{id:DataForm['id']}}

//type del state inicial , que tomara el type del DataForm,el id se usa ya que queremos otro estado donde se  utilice el id para editar la info
export type dataInitialState = {
  data : DataForm[],
  selectId:DataForm['id']
}
//state inicial , en general se le pone como un objeto ,ya que, se puede tener varias propiedades ,pero puede ser un array , numero ,etc
export const initialSate:dataInitialState={
  data:[], //el state inicial tiene como valor inicial un array vacio
  selectId:""
}

//la funcion reducer
export const dataReducer = (
  state:dataInitialState=initialSate , action :dataActions) =>{
    switch(action.type){
      //a la hora que editemos sobreescriba los datos , y no cree otro 
      case 'save-data':{
        let updatedData:DataForm[]= []
        if(state.selectId){
          // action.payload.newData nos permitira actualizar donde se ha seleccionado a editar
          updatedData=state.data.map((dataSelect)=>dataSelect.id === state.selectId ? action.payload.newData : dataSelect)
        }else{
          //luego se da submit al formulario tendremos nuevos datos , copiamos los datos que habian inicialmente con el sprint(...state.data , a diferencia del state de arriba aca solo se copia lo que hay en data[]) y le aumentamos la nueva data, finalmente tendremos un array de objetos con los nuevos datos
          updatedData = [...state.data , action.payload.newData]
        }
        //muestra los datos ingresados en el form
        // console.log(action.payload.newData)
        //en el return debemos el estado actualizado
        return {
          // copiamos todos los datos del state iniciales , esto permite que si hubiera mas datos se copiarian
          ...state ,
          data : updatedData,
          selectId:"" //el id seleccionado lo reiniciamos para que al ingresar nuevos datos , estos no se sobreescriban donde se selecciono la edicion
        }
      }
      case 'get-id':
          return{
            ...state ,
            selectId : action.payload.id
          }
      case 'delete-data':
        return{
          ...state,
          //devolvemos la data que no hemos seleccionado
          data : state.data.filter(dataSelect => dataSelect.id !== action.payload.id)
        }
      default:
        return state
    }
}  
