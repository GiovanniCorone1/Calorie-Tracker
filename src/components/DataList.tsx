import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useMemo , Dispatch} from 'react';
import { DataForm } from '../types/index';
import { categories } from '../data/categories';
import { dataActions } from '../reducers/data-reducer';
//al usar useMemo
type DataListProp= {
  data : DataForm[],
  dispatch : Dispatch<dataActions>
}
export const DataList = ({data , dispatch}:DataListProp) => {
  //cada vez que hay una nueva categories(nuevos datos) se usa el useMemo
  //DataForm['category'] significa que solo usamos la category de ese array
  const categoryName = useMemo(() => (category : DataForm['category'])=> categories.map((cat)=>cat.id === category ? cat.name : ""), [categories])
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
      {
        data.map((info)=>(
          <div key={info.id} className='px-5 py-10 bg-slate-100 mt-5 flex justify-between'>
            <div className='space-y-2 relative'>
              <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${info.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                {categoryName(+info.category)}
              </p>
              <p className='text-2xl font-bold pt-5'>{info.activity}</p>
              <p className='font-black text-4xl text-yellow-500'>
                {info.calories}{' '}<span>Calorías</span>
              </p>
            </div>
            <div className='flex gap-5 items-center'>
              <button onClick={()=>dispatch({type:'get-id' , payload :{id:info.id}})}>
                <PencilSquareIcon
                className='h-8 w-8 text-gray-800'/>
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}
