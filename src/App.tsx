import { Form } from './components/Form';
function App() {

  return (
    <>
      <header className="bg-stone-700 py-4">
        <div className="max-w-4xl mx-4 flex justify-between">
          <h1 className="text-white text-center text-lg font-bold uppercase">Calorie Tracker</h1>
        </div>
      </header>
      <section className="bg-cyan-600 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form/>
        </div>
      </section>
    </>
  )
}

export default App
