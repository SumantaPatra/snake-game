import {AiOutlineTrophy} from 'react-icons/ai'
export function Score({score}){
    return <div className='absolute rounded-3xl  flex justify-center items-center space-x-2 top-[-2rem] right-0'>
         <span className='absolute font-bold bottom-1 text-lg left-5 z-20 text-white text-center'>{score}</span>
         <AiOutlineTrophy size={25}/>
     </div>
}