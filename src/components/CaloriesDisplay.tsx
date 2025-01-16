type CaloriesDisplayProps = {
  text:string
  amount:number
}
export const CaloriesDisplay = ({text , amount}:CaloriesDisplayProps) => {
  return (
    <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
      <span className='font-black text-6xl text-orange'>{amount}</span>
      {text}         
    </p>
  )
}
