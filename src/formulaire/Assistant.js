import React,{useState,useEffect,useContext} from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useNavigate } from 'react-router-dom';
import { PrincipalContext } from '../Context';
import axios from 'axios';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function Assistant() {

  const navigate = useNavigate()
  const {connected,setConnected} = useContext(PrincipalContext)
  const [person, setPerson] = useState({
    username : "",
    password : ""
  })

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

   const handleChange = (e) => {
  
    const target = e.target;
    const value = target.value;
    const name = target.name ;


    setPerson((prev) => ({
      ...prev,
      [name]: value,
    }))

  }

  const handleSubmit = (e)=>{
    e.preventDefault() 
    person.password ==="" ||
    person.username === "" ? console.log("veuillez remplir tout les champs *") : loginPerson()
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

   const loginPerson = ()=>{
  
    axios
      .post("/userInfos/login", person)
      .then((res) => {

       alertToast()

        setTimeout(() => {
           navigate("/admin/acceuil");
        }, 1000);
       /* stocker le pwd en claire ,ainsi ecrasé le pwd encrypté. */
        res.data.password = person.password

         setConnected(res.data)
         sessionStorage.setItem("connected", JSON.stringify(res.data));
        
         setPerson(
          {
            username : "",
            password : ""
          }
        )
      })
      .catch((error) => {
        console.log(error.message);
    
      });
  }


  return (
    <div className=' '>
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
        <div className='flex h-[100vh] items-center justify-center'>
            <div className='p-10 border-2 rounded-xl border-orange-300'>
              <div className='font-black flex justify-center items-center space-x-4 my-5 text-3xl'><PersonOutlineIcon sx={{fontSize:40}}/> <p>Assistant</p> </div>
              <p className='font-black my-5 text-slate-500 text-3xl'> Connectez-vous à votre compte </p>
               <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  '& > :not(style)': { m: 1, width: '55ch' },
                }}
                noValidate
                autoComplete="off"
              >
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email"
                    >
                        E-mail</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-email"
                            type="email"
                            name="username"
                            value={person.username}
                            onChange={handleChange}
                          
                            label="email"
                          />
                    </FormControl> <br/>

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
                      type={showPassword ? 'text' : 'password'}
                        value={person.password}
                        name="password"
                        onChange={handleChange}
                     
                      label="Password"
                    />
                     <div className='flex justify-center'>
                     <Button type='submit' variant="contained" sx={{mt:3 , width:150}}>Se connecter</Button>
                    </div>

                  </FormControl>
                </Box>

                <div>
                    <div className='text-blue-500 mb-2'> Qui êtes-vous ? </div>
                     <div>
                     <Link to="/connexion/admin" className='text-black hover:text-blue-500 duration-300 ease-in-out'> Admin -</Link>
                     <Link to="/connexion/formateur" className='text-black hover:text-blue-500 duration-300 ease-in-out'> Formateur -</Link>
                     <Link to="/connexion/user" className='text-black hover:text-blue-500 duration-300 ease-in-out'> Utilisateur </Link>
                     </div>
                </div>
            </div>
        </div>

    </div>
  )
}
