import React,{useState,useContext,useEffect} from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { ToastContainer, toast } from 'react-toastify';

const qualites = [
  { id: 1, value: 'Excellente' },
  { id: 2, value: 'Bonne' },
  { id: 3, value: 'Moyenne' },
  { id: 4, value: 'Faible' },
];

const rythmes = [
  { id: 1, value: 'Très rapide' },
  { id: 2, value: 'Rapide' },
  { id: 3, value: 'Modéré' },
  { id: 4, value: 'Lent' },
  { id: 4, value: 'Très lent' },
];

const maitrise  = [
  { id: 1, value: 'Excellente' },
  { id: 2, value: 'Bonne' },
  { id: 3, value: 'Moyenne' },
  { id: 4, value: 'Faible' }
];

const support = [
  { id: 1, value: 'Très bien' },
  { id: 2, value: 'Bien' },
  { id: 3, value: 'Moyen' },
  { id: 4, value: 'Insuffisant' }
];



export default function Evaluation() {

 const {idparticipant,idformateur,idformation} = useParams()

 const [formateur, setFormateur] = useState({})

  const [evaluation, setEvaluation] = useState(
    {
      rythme : "",
      qualite : "",
      support : "",
      maitrise:"",
    }
  )

  const navigate = useNavigate()

   useEffect(() => {
    
  handleLoadData()
    
  }, [])

  const handleLoadData = ()=>{

    axios.get(`/userInfos/${idformateur}`)
      .then((res)=>{
        setFormateur(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  

   const handleChange = (e) => {
  
    const target = e.target;
    const value = target.value;
    const name = target.name ;


   setEvaluation((prev) => {
        return{
            ...prev,
        [name] : value
        }
    })

  }


 const handleSubmit = (e) => {
    e.preventDefault();

      evaluation.rythme === "" ||
      evaluation.qualite === "" ||
      evaluation.support === "" ||
      evaluation.maitrise === ""  ? alert("veuillez remplir tout les champs *") : save()
  
  
  }

  
   const succes = ()=> toast.success('succès !', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

  const save = ()=>{

   evaluation.participant = {id:idparticipant}
   evaluation.userinfo = {id:idformateur}

    axios
      .post("/evaluations", evaluation)
      .then((res) => {

        succes()
        setTimeout(() => {
            navigate(`/formation/${idformation}`);
        }, 2000);

      })
      .catch((error) => {
        console.log(error.message);
    
      });
  }



  return (
    <div className='h-[100vh] bg-slate-100 px-2 pt-12'>
            <p className='italic text-center mb-3'> formulaire d'évaluation </p>
        <div className='border-2 max-w-3xl text-center mx-auto py-3 border-orange-300 '>
            <div className='text-center'>
            <Box 
                component="form"
                onSubmit={handleSubmit}>
                    <div className='flex p-3 items-center space-x-3 mx-auto'>
                     <Avatar
                        alt={formateur.name}
                        src={formateur.image}
                        sx={{ width: 54, height: 54 }}
                         />
                        <div className=''>
                            <div className='flex items-center space-x-1'>
                         <p className='text-black text-lg font-semibold'>{formateur.firstname} {formateur.lastname}</p>
                        </div>
                        <div className='flex items-center space-x-1'>
                         <p>{formateur.username}</p>
                        </div>
                        <div>
                        
                        </div>
                    </div>
                    </div>
               <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '45ch' },
                }}
                noValidate
                autoComplete="off"
              >
                 
                 
                    <FormControl sx={{ m: 1, width: '35ch' }}>
                      <InputLabel id="demo-maitrise-select-label">Maitrise du sujet</InputLabel>
                      <Select
                        labelId="demo-maitrise-select-label"
                        id="demo-maitrise-select"
                        type="text"
                        name="maitrise"
                        value={evaluation.maitrise}
                        label="maitrise"
                        onChange={handleChange}
                      >
                        {maitrise.map((item,value)=>( 
                             <MenuItem key={value} value={item.value}>{item.value}</MenuItem>                    
                        ))}
                        
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }}>
                      <InputLabel id="demo-peda-select-label">Qualité pédagogique</InputLabel>
                      <Select
                        labelId="demo-peda-select-label"
                        id="demo-peda-select"
                        type="text"
                        name="qualite"
                        value={evaluation.qualite}
                        label="qualite"
                        onChange={handleChange}
                      >
                        {qualites.map((item,value)=>( 
                             <MenuItem key={value} value={item.value}>{item.value}</MenuItem>                    
                        ))}
                        
                      </Select>
                    </FormControl> <br/>

                    <FormControl sx={{ m: 1, width: '35ch' }}>
                      <InputLabel id="demo-rythme-select-label">rythme</InputLabel>
                      <Select
                        labelId="demo-rythme-select-rythme"
                        id="demo-rythme-select"
                        type="text"
                        name="rythme"
                        value={evaluation.rythme}
                        label="rythme"
                        onChange={handleChange}
                      >
                        {rythmes.map((item,value)=>( 
                             <MenuItem key={value} value={item.value}>{item.value}</MenuItem>                    
                        ))}
                        
                      </Select>
                    </FormControl>

                     <FormControl sx={{ m: 1, width: '35ch' }}>
                      <InputLabel id="demo-support-select-label">Support cours et tp</InputLabel>
                      <Select
                        labelId="demo-support-select-label"
                        id="demo-support-select"
                        type="text"
                        name="support"
                        value={evaluation.support}
                        label="support"
                        onChange={handleChange}
                      >
                        {support.map((item,value)=>( 
                             <MenuItem key={value} value={item.value}>{item.value}</MenuItem>                    
                        ))}
                        
                      </Select>
                    </FormControl>
                    <br/>


                </Box>
                  <div className='flex mb-3 justify-center space-x-7'>                
                          <Link to= {`/formation/${idformation}`}> 
                        <Button  variant="contained" color="error" sx={{mt:3 , width:150}}> retour  </Button> 
                        </Link>        
                     <Button type="submit" variant="contained"  color="success" sx={{mt:3 , width:150}}>Valider</Button>
                </div>
            </Box>
            </div>
        </div>
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










