import React, { useEffect } from 'react'
import DateRangeIcon from '@mui/icons-material/DateRange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PlaceIcon from '@mui/icons-material/Place';
import { Link } from 'react-router-dom';
import axios from 'axios';

const reducer = (state, action) => {

  switch (action.type) {
  
    case 'ville':
      return state.filter((formation) => formation.ville?.nom === action.payload);

    case 'categorie':
    return state.filter((formation) => formation.categorie?.nom === action.payload);;


    case 'date':
      return state.filter((formation) => new Date(formation.date) >= new Date(action.payload) );

    case 'initialisation' : 
    return action.payload ;

    default:
      return state ;
  }
};

export default function AllFormations() {

      const [formations, dispatchFormations] = React.useReducer(reducer,[]);

useEffect(() => {
    handleLoading()
  }, [])
  

const handleLoading = ()=>{

    axios.get("/formations")
    .then((res)=>{
       
      dispatchFormations({type:"initialisation",payload:res.data})
    })
  }
  return (
    <div className='divide-y'>
        <div className='mt-5 mb-2 bg-cyan-800 text-white p-3 max-w-6xl mx-auto justify-between flex items-center space-x-2'>
            <div>
                Nom des formations
            </div>
            <div className='flex items-center space-x-10'>
                <div className='flex items-center space-x-2'> <PlaceIcon/> <p>Ville</p></div>
                 <div className='flex items-center space-x-2'> <DateRangeIcon/> <p>Date</p></div>
                 <div className='flex items-center space-x-2'> <MonetizationOnIcon/> <p>Prix</p></div>
            </div>
        </div>

        {/* formations */}

        <div className='my-3'>
             {formations.map((formation,index)=>{
            return(
            <React.Fragment key={index}>
                <Link to={`/formation/${formation.id}`} className='divide-y my-3 bg-stone-200 hover:bg-blue-50 duration-300 ease-in-out p-3 max-w-6xl mx-auto justify-between flex items-center space-x-2'>
            <div className='flex items-center space-x-5'>
               <div>
                <img 
                className='h-[8rem] w-[10rem]'
                alt={formation.nom}
                src={formation.image  ? formation.image : `/image/formation.png`}
                /></div>
               <div><p className='text-xl font-black'>{formation.name}</p></div>
            </div>
            <div className='flex items-center text-md font-semibold space-x-5'>
                <div className='flex items-center space-x-2'>  <p>{formation.ville?.name}</p></div>
                 <div className='flex items-center space-x-2'>  <p>{formation.date}</p></div>
                 {formation.cout &&
                 <div className='flex items-center space-x-2'>  <p>{formation.cout} </p> <span className='capitalize'>dhs</span></div>}
            </div>
             </Link>
            </React.Fragment>)
         })}
        </div>


    </div>
  )
}
