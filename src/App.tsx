import { useReducer } from 'react';
import { Form } from './components/Form';
import { initialSate, dataReducer } from './reducers/data-reducer';
import { DataList } from './components/dataList';

function App() {
  const [state , dispatch]= useReducer(dataReducer , initialSate)
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
          />
        </div>
      </section>
      <section className='p-10 mx-auto max-w-4xl'>
        <DataList
          data = {state.data} //solo le pasamos la data del objeto state
        />
      </section>
    </>
  )
}

export default App
