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


export default function FormAssistant({loaded}) {


  const [assistant, setAssistant] = useState(
    {
      firstname : "",
      lastname : "",
      username : "",
      password : "",
      secondPassword:"",
      phone : "",
      ville : "",
    }
  )

  const {assistantID} = useParams() 

  React.useEffect(() => {
    loaded === true && handleload()
  }, [loaded])

  console.log(" assistant : " , assistant)
  
 const handleload = ()=>{
  axios
      .get(`/userInfos/${assistantID}`)
      .then((res) => {
        res.data.password = ""
        setAssistant(res.data)
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


    setAssistant((prev) => ({
      ...prev,
      [name]: value,
    }))

  }


 const handleSubmit = (e) => {
    e.preventDefault();

     if(assistant.password != assistant.secondPassword)
    {
     
     alert("Mot de passe ne correspondent pas !")
     setAssistant((prev)=>({
      ...prev,
      password : "",
      secondPassword : "", 
     }))
    }
    else {

      assistant.firstname === "" ||
      assistant.lastname === "" ||
      assistant.username === "" ||
      assistant.password ==="" ||
      assistant.phone === "" ? alert("veuillez remplir tout les champs *") : save()
    }
  
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
       
     // Supprimer la clé 'secondPassword' et sa valeur du state
   const { secondPassword, ...data } = assistant;

   /* on ajoute son role et outsie à true, avec active a true aussi. */
    data.role = "ROLE_ASSISTANT"
 

    loaded === false ?
    axios
      .post("/userInfos", data)
      .then((res) => {

         alertToast()

         setTimeout(() => {
         navigate("/admin/assistants");
         }, 1000);
       
      })
      .catch((error) => {
        console.log(error.message);
        alert("cette assistant existe déjà !.")
      })
      :
       axios
      .put("/userInfos", data)
      .then((res) => {

         alertToast()

         setTimeout(() => {
         navigate("/admin/assistants");
         }, 1000);
       
      })
      .catch((error) => {
        console.log(error.message);
        alert("cette assistant existe déjà !.")
      })
  }


  return (
    <div className='bg-slate-50 '>
        <div className='flex h-[100vh] items-center justify-center'>
            <div className='border-orange-300 min-h-[64vh] p-2 border-2 rounded-xl'>
              <div className='font-black  bg-black rounded-xl text-white p-x max-w-[25rem] mx-auto flex justify-center items-center space-x-4 my-6 text-md'>
                <AccountBoxIcon  sx={{fontSize:40}}/> <p>Ajouter un assistant</p> </div>
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
                            name="firstname"
                            value={assistant.firstname}
                            onChange={handleChange}
                            
                            label="name"
                          />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-lastname"
                    >
                        Prenom</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-lastname"
                            type="text"
                            name="lastname"
                            value={assistant.lastname}
                            onChange={handleChange}
                            label="prenom"
                          />
                    </FormControl> <br/>

                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username"
                    >
                        Email</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-username"
                            type="text"
                            name="username"
                            value={assistant.username}
                            onChange={handleChange}
                            label="username"
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
                            value={assistant.phone}
                            onChange={handleChange} 
                            label="phone"
                          />
                    </FormControl> <br/>

                 <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-ville"
                    >
                        Ville </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-ville"
                            type="text"
                            name="ville"
                            value={assistant.ville}
                            onChange={handleChange}
                            label="Ville"
                          />
                    </FormControl>
                    <br/>

                  <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password"
                    startadornment={
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                }
              >
                  Mot de passe</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name= "password"
                      value={assistant.password}
                      onChange={handleChange}
                      type={showPassword ? 'text' : 'password'}
                       endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    
                  </FormControl>

                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password"
                    startadornment={
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                }
              >
                  Mot de passe</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password2"
                      name="secondPassword"
                      value={assistant.secondPassword}
                      onChange={handleChange}
                      type={showPassword ? 'text' : 'password'}
                       endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password2"
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

