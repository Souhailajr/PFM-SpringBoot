import React,{useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import AllFormations from './AllFormations';
import Foot from './Foot';


export default function Welcome() {

    const [chevron, setChevron] = useState(false)

  return (
    <div>
          <div className=' px-7 mx-auto hover:cursor-pointer  duration-300 ease-in-out bg-orange-50'>
       <div className='flex justify-around'>
          <div className='flex max-w-3xl space-x-5 justify-center '>
            <div className='w-[40rem] h-full flex  items-center '>
              <div>
                  <h1 className=' text-3xl font-black'> <span className='text-4xl'>B</span>ienvenu sur note site de formation 
                </h1>
                <p className='py-3 text-slate-700'>Bienvenue sur notre plateforme de formation dédiée à l'épanouissement professionnel et à l'acquisition de compétences transformantes. Chez nous, l'apprentissage devient une aventure passionnante, où chaque cours est une porte ouverte vers de nouvelles opportunités. Explorez des formations variées animées par des experts chevronnés, et plongez-vous dans un environnement d'apprentissage interactif conçu pour stimuler votre croissance personnelle et professionnelle. </p>

                <Link to="#" onClick={()=>alert("veuillez choisir une des formations ci-dessous !")}>
                 <Button sx={{mt:2}} variant="contained"> Démarrer mon inscription</Button>
                </Link>
              </div>
            </div>
        </div>

         <div className='flex min-h-[10rem] justify-start space-x-16 items-center'>
            
            <div className='h-full text-center'>
                <img
                className='h-full w-[45rem]'
                alt="Formation"
                src='/image/admin/formation.jpg'
                />
            </div>

        </div>
       </div>
    </div>

    <AllFormations/>
    
   <Foot/>
    </div>
  )
}
