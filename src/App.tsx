import { useReducer, useEffect } from 'react';
import { Form } from './components/Form';
import { initialSate, dataReducer } from './reducers/data-reducer';
import { DataList } from './components/DataList';

function App() {
  const [state , dispatch]= useReducer(dataReducer , initialSate)
  //seteamos en el sessionStorage
  useEffect(()=>{
    sessionStorage.setItem('data',JSON.stringify(state.data))
  },[state.data])
  return (
    <>
      <header className="bg-stone-700 py-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-white text-center text-lg font-bold uppercase">Calorie Tracker</h1>
          <button>Actualizar</button>
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
