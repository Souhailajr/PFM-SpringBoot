import React,{useState,useContext, useEffect} from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ToastContainer, toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


export default function FormEntreprise({loaded}) {


  const [entreprise, setEntreprise] = useState(
    {
      name : "",
      email : "",
      url : "",
      phone : "",
      address : "",
    }
  )

  const {entrepriseID} = useParams() 

  React.useEffect(() => {
    loaded === true && handleload()
  }, [loaded])

  
 const handleload = ()=>{
  axios
      .get(`/entreprises/${entrepriseID}`)
      .then((res) => {

        setEntreprise(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
 }


  const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

   const handleChange = (e) => {
  
    const target = e.target;
    const value = target.value;
    const name = target.name ;


    setEntreprise((prev) => ({
      ...prev,
      [name]: value,
    }))

  }


 const handleSubmit = (e) => {
    e.preventDefault();

      entreprise.name === "" ||
      entreprise.email === "" ||
      entreprise.url === "" ||
      entreprise.address ==="" ||
      entreprise.phone === "" ? alert("veuillez remplir tout les champs *") : save()
    
  
  }

 
const alertToast = ()=> toast.success('succès !', {
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
 
    loaded === false ?
    axios
      .post("/entreprises", entreprise)
      .then((res) => {

         alertToast()

         setTimeout(() => {
         navigate("/admin/entreprises");
         }, 1000);
       
      })
      .catch((error) => {
        console.log(error.message);
        alert("cette entreprise existe déjà !.")
      })
      :
       axios
      .put("/entrerises", entreprise)
      .then((res) => {

         alertToast()

         setTimeout(() => {
         navigate("/admin/entreprises");
         }, 1000);
       
      })
      .catch((error) => {
        console.log(error.message);
        alert("cette entreprise existe déjà !.")
      })
  }


  return (
    <div className='bg-slate-50 '>
        <div className='flex h-[100vh] items-center justify-center'>
            <div className='border-orange-300 min-h-[57vh] p-2 border-2 rounded-xl'>
              <div className='font-black  bg-black rounded-xl text-white p-x max-w-[25rem] mx-auto flex justify-center items-center space-x-4 my-6 text-md'>
                <AccountBoxIcon  sx={{fontSize:40}}/> <p>Ajouter un entreprise</p> </div>
            <Box 
                component="form"
                onSubmit={handleSubmit}>
               <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '55ch' },
                }}
                noValidate
                autoComplete="off"
              >
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-name"
                    >
                        Nom</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-name"
                            type="text"
                            name="name"
                            value={entreprise.name}
                            onChange={handleChange}
                            
                            label="name"
                          />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-address"
                    >
                        addresse</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-address"
                            type="text"
                            name="address"
                            value={entreprise.address}
                            onChange={handleChange}
                            label="address"
                          />
                    </FormControl> <br/>

                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email"
                    >
                        Email</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-email"
                            type="email"
                            name="email"
                            value={entreprise.email}
                            onChange={handleChange}
                            label="email"
                          />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-phone"
                    >
                        Phone </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-phone"
                            type="text"
                            name="phone"
                            value={entreprise.phone}
                            onChange={handleChange} 
                            label="phone"
                          />
                    </FormControl> <br/>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-url"
                    >
                        Url </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-url"
                            type="text"
                            name="url"
                            value={entreprise.url}
                            onChange={handleChange} 
                            label="url"
                          />
                    </FormControl>

                </Box>
                <div className='flex mb-1 justify-center'>
                     <Button type="submit" variant="contained" sx={{mt:3 , width:150}}>Valider</Button>
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

