import React,{useState,useContext, useEffect} from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PrincipalContext } from '../Context'; 
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ToastContainer, toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


export default function RegisterF() {

 
  const {connected,setConnected} = useContext(PrincipalContext)

  const [formateur, setFormateur] = useState(
    {
      firstname : "",
      lastname : "",
      username : "",
      description: "",
      password : "",
      secondPassword:"",
      phone : "",
      ville : "",
      competence:"",
    }
  )

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


    setFormateur((prev) => ({
      ...prev,
      [name]: value,
    }))

  }


 const handleSubmit = (e) => {
    e.preventDefault();

     if(formateur.password != formateur.secondPassword)
    {
     
     alert("Mot de passe ne correspondent pas !")
     setFormateur((prev)=>({
      ...prev,
      password : "",
      secondPassword : "", 
     }))
    }
    else {

      formateur.firstname === "" ||
      formateur.lastname === "" ||
      formateur.competence === "" ||
      formateur.description === "" ||
      formateur.username === "" ||
      formateur.password ==="" ||
      formateur.phone === "" ? alert("veuillez remplir tout les champs *") : save()
    }
  
  }

 
const alertToast = ()=> toast.success('succès !', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });


  const save = ()=>{
       
     // Supprimer la clé 'secondPassword' et sa valeur du state
   const { secondPassword, ...data } = formateur;

   /* on ajoute son role et outsie à true, avec active a true aussi. */
    data.role = "ROLE_FORMATEUR"
    /* on active son compte a cause de userDetails dans spring boot. */
    data.active = true
    /* formateur externe */
    data.outside = true 

    axios
      .post("/userInfos", data)
      .then((res) => {

         alertToast()

         setTimeout(() => {
           navigate("/formateur/acceuil");
         }, 3000);
         setConnected(res.data)
         sessionStorage.setItem("connected", JSON.stringify(res.data));
       
      })
      .catch((error) => {
        console.log(error.message);
        alert("cette formateur existe déjà !.")
      });
  }


  return (
    <div className=' bg-slate-50 '>
        <div className='flex h-[100vh]  justify-center'>
            <div className='border-orange-300 h-[84vh] p-4 border-2 rounded-xl'>
              <div className='font-black bg-black rounded-xl text-white p-x max-w-[25rem] mx-auto flex justify-center items-center space-x-4 my-5 text-md'>
                <AccountBoxIcon  sx={{fontSize:40}}/> <p>S'inscrire en tant que formateur</p> </div>
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
                            value={formateur.firstname}
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
                            value={formateur.lastname}
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
                            value={formateur.username}
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
                            value={formateur.phone}
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
                            value={formateur.ville}
                            onChange={handleChange}
                            label="Ville"
                          />
                    </FormControl>

                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-competence"
                    >
                        compétence </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-competence"
                            type="text"
                            name="competence"
                            value={formateur.competence}
                            onChange={handleChange} 
                            label="competence"
                            multiline
                            maxRows={2}
                          
                          />
                    </FormControl> <br/>

                   <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-description"
                    >
                        description </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-description"
                            type="text"
                            name="description"
                            value={formateur.description}
                            onChange={handleChange} 
                            label="description"
                            multiline
                            maxRows={3}
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
                      value={formateur.password}
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
                      value={formateur.secondPassword}
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
                <div className='flex mb-3 justify-center'>
                     <Button type="submit" variant="contained" sx={{mt:3 , width:150}}>Valider</Button>
                </div>
            </Box>
            </div>
        </div>
   <ToastContainer
      position="top-right"
      autoClose={2000}
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

