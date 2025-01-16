import { useReducer, useEffect, useMemo } from 'react';
import { Form } from './components/Form';
import { initialState, dataReducer } from './reducers/data-reducer';
import { DataList } from './components/DataList';
import { CalorieTracker } from './components/CalorieTracker';

function App() {
  const [state , dispatch]= useReducer(dataReducer , initialState)
  //seteamos en el sessionStorage
  useEffect(()=>{
    sessionStorage.setItem('data',JSON.stringify(state.data))
  },[state.data])
  //si hay elementos en el form devuelve true
  const rebootApp = useMemo(() =>state.data.length > 0, [state.data])
  return (
    <>
      <header className="bg-stone-700 py-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-white text-center text-lg font-bold uppercase">Calorie Tracker</h1>
          <button className='bg-cyan-600 hover:bg-cyan-400 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
          disabled={!rebootApp} //si es true(hay elementos se permite enviar reiniciar)
          onClick={()=>dispatch({type:'reboot'})} //enviamos la accion para reiniciar el formulario
          >
            Reiniciar App</button>
        </div>
      </header>
      <section className="bg-cyan-600 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
          // pasamos la funcion atraves de props
          dispatch = {dispatch}
          state = {state}
          />
        </div>
      </section>
      <section className='bg-stone-700 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker
            data = {state.data}
          />
        </div>
      </section>
      <section className='p-10 mx-auto max-w-4xl'>
        <DataList
          data = {state.data} //solo le pasamos la data del objeto state
          dispatch = {dispatch}
        />
      </section>
    </>
  )
}

export default App
