import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Avatar, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import DialogEvaluer from './DialogEvaluer';

export default function AboutFormation() {

    const {idformation} = useParams()
      
    const [formation, setFormation] = useState({})

       useEffect(() => {
      handle()
    }, [idformation])

    const handle = ()=>{
        axios.get(`/formations/${idformation}`)
        .then((res)=>{
            setFormation(res.data)
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    const alertToast = ()=> toast.warning('réservé aux entreprises !', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

    const errorToast = ()=> toast.error('aucun individu n\a été trouvé !', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

      const success = ()=> toast.success('succès !', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

  return (
    <div className='pb-10'>
        <div className='bg-blue-900 p-5 text-white h-[70vh]'>

          <div className='max-w-4xl border-white mx-auto'>
           {formation.categorie &&
            <p className='rounded-lg bg-red-300 px-2 max-w-[20rem]'>
              catégorie - {formation.categorie?.name}
            </p>}
           <h1 className='text-3xl my-3 font-black'>{formation.name}</h1>


              <div className='rounded-xl text-md  bg-white text-black'> 
                     <div className='text-md mt-3 justify-center py-2 flex items-center space-x-4'>
                    
                      <div className='flex items-center space-x-1'>
                          <WatchLaterIcon /> <p>{formation.heure} heures</p>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <PlaceIcon className='text-blue-600'/> <p>{formation.ville?.nom}</p>
                      </div>
                      <div className='flex items-center normal-case space-x-1'>
                        <EventIcon sx={{fontSize:20}}/> <p> commence le {formation.date}</p>
                      </div>
                      <div className='flex items-center normal-case space-x-1'>
                        <EventIcon sx={{fontSize:20}} /> <p> termine au {formation.date}</p>
                      </div>
                  </div>
                  </div>

              <div className='flex mt-8 space-x-5'>
                <div>
                  <img  
                   className='h-[12rem] w-[15rem]'
                   alt={formation.nom}
                   src={formation.image  ? formation.image : `/image/formation.png`}/>
                </div>
                <div>
                  {
                    formation.objectif &&
                    <>
                  
                    <p className='w-[30rem]'>
                       Objectif :  {formation.objectif}
                   </p>
                    </>
                  }
                   {
                    formation.reserve === "INDIVIDU" ?
                    <Link to={`/formation/${idformation}/inscription`}>
                   <Button sx={{marginTop:3, marginLeft:0}} variant="contained" color="error"> s'inscrire
                   </Button>
                   </Link>
                   :
                   <Button onClick={alertToast} sx={{marginTop:3, marginLeft:0}} variant="contained" color="error"> 
                   réservé
                   </Button>
                   }
                </div>
              </div>
          </div>
        </div>
        <div className='max-w-4xl mt-5 mx-auto'>

            <h1 className='font-bold text-slate-500 text-3xl'>Objectif - formation</h1>
            <p className='mt-3'>
             {formation.objectif} </p>
        </div>
        <div className='max-w-4xl mt-5 mx-auto'>

            <h1 className='font-bold text-3xl text-blue-600'>Programme detaillé </h1>
            <div className='mt-3'>
               <div className='p-3 bg-cyan-100 text-slate-800' dangerouslySetInnerHTML={{ __html: formation.programme }} />
              </div>
        </div>
        {formation.userinfo &&
        <div className='bg-stone-200 mt-5 py-10'>
          <div className='max-w-4xl flex items-center justify-center  mx-auto'>
             <div>
               <h1 className='text-4xl text-slate-500 text-center mb-7 font-black'> Formateur</h1>
              
                <div className='bg-white flex space-x-4 rounded-xl p-3'>
                  <div>
                    <Avatar 
                    src="/image/admin/formateur/katrine.jpg"
                    sx={{ width: 55, height: 55 }}/>
                  </div>
                  <div className=''>
                    <div className='flex items-start space-x-3'>
                      <div>
                         <h1 className='text-xl '> 
                          {formation.userinfo?.firstname}  &nbsp;
                          {formation.userinfo?.lastname}
                          </h1>
                          <p className='text-slate-600 my-1'> {formation.userinfo?.username} </p>
                      </div>
                      <DialogEvaluer data={{formation,errorToast,success}}/>
                    </div>
                    <p className='my-3  min-w-96'>
                      {formation.userinfo?.description}
                    </p>
                  </div>
                </div>
             </div>
        </div>
        </div>
        }
       <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
    </div>
  )
}
