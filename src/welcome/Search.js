import React,{useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';


function Search() {

    const [show, setShow] = useState(false)

    const handleclickShow = ()=>{

        setShow(!show) ; 
    }

  return (
    <div className='flex items-center  hover:cursor-pointer text-gray-500 hover:text-black duration-300'>
         <div className={`mt-3 px-2 ${show ? 'block' : 'hidden'} duration-300`}>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-slate-600 focus:ring-slate-600 focus:ring-1 sm:text-sm" placeholder="Rechercher..." type="text" name="search"/>
        </div>
        <SearchIcon sx={{fontSize:30}} onClick={handleclickShow}/>

    
    </div>
  )
}

export default Search