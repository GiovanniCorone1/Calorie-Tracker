import type { DataForm } from '../types/index';
import { useMemo } from 'react';
import { CaloriesDisplay } from './CaloriesDisplay';
type CalorieTrackerProp ={
  data : DataForm[]
}
export const CalorieTracker= ({data}:CalorieTrackerProp) => {
  const caloriesConsumed = useMemo(() =>data.reduce((valorInitial , valorItem )=> valorItem.category === 1 ? valorInitial+valorItem.calories : valorInitial ,0), [data])
  
  const caloriesEliminated = useMemo(() => data.reduce((valorInitial , valorItem) => valorItem.category === 2 ? valorInitial+valorItem.calories : valorInitial ,0) , [data])

  const caloriesDifference = useMemo(() => caloriesConsumed - caloriesEliminated ,[data])
  
  return (
    <>
      <h2 className='text-white text-center font-bold text-3xl'>Resumen de Calorías</h2>
      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
        <CaloriesDisplay
          text="comida" 
          amount={caloriesConsumed} 
        />
        <CaloriesDisplay
          text="ejercicio" 
          amount={caloriesEliminated}
        />
        <CaloriesDisplay
          text="diferencia"
          amount={caloriesDifference}
        />
      </div>
    </>
  )
}
