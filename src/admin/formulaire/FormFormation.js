import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import { Link, useParams } from 'react-router-dom';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';

export default function FormFormation({loaded}) {

  const [villes, setVilles] = useState([])
  const [categories, setCategories] = useState([])

  const [formation, setFormation] = useState(
    {
      name : "",
      objectif : "",
      programme : "",
      categorie : {
        id:null,
        nom:""
      },
      reserve : "",
      heure : "",
      ville : {
        id:null,
        nom:""
      },
      
      cout:"",
    }
  )

  const navigate = useNavigate()


   const handleChange = (e) => {
  
    const target = e.target;
    const value = target.value;
    const name = target.name ;


   setFormation((prev) => {
        if (name === "ville" || name === "categorie") {
      
          return {
            ...prev,
            [name]: { id: value }
          };
        } else {
          return {
            ...prev,
            [name]: value
          }
        }
     })

  }

  /* React Quill dans le onChange on a seulement e qui contient toute les informations*/
  const handleChangeReactQuilprogramme = (e)=>{

     setFormation((prev)=>({
      ...prev,
      programme : e
     }))
  }

 const handleSubmit = (e) => {
    e.preventDefault();

      formation.name === "" ||
      formation.ville.name === "" ||
      formation.reserve === "" ||
      formation.categorie.name === "" ||
      formation.objectif === "" ||
      formation.cout === "" ||
      formation.objectif === "" ||
      formation.programme === "" ||
      formation.heure === "" ? alert("veuillez remplir tout les champs *") : saveFormation()

  }

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

  const saveFormation = ()=>{
       
   loaded ? 
   axios
      .put("/formations", formation)
      .then((res) => {

        success()
        setTimeout(() => {
          navigate("/admin/formations");
          
        }, 1000);
      
      })
      .catch((error) => {
        console.log(error.message);
    
      })
   :
    axios
      .post("/formations", formation)
      .then((res) => {

        success()
        setTimeout(() => {
          navigate("/admin/formations");
          
        }, 1000);
      
      })
      .catch((error) => {
        console.log(error.message);
    
      });
  }

  useEffect(() => {
    
  handleLoadData()
    
  }, [])

  const handleLoadData = ()=>{

    axios.get("/categories")
      .then((res)=>{
        setCategories(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })

      axios.get("/villes")
      .then((res)=>{
        setVilles(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  
  const {formationID} = useParams() 

  React.useEffect(() => {
    loaded === true && handleload()
  }, [loaded])

 
 const handleload = ()=>{
  axios
      .get(`/formations/${formationID}`)
      .then((res) => {
        setFormation(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
 }

   const Toolbar = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"] // remove formatting button
    ];

  return (
  <div>
     <div className='flex h-[100vh] items-center justify-center'>
        <div className='border-orange-300 bg-white p-3 border-2 rounded-xl'>
            <div className=''>
            <Box 
                component="form"
                onSubmit={handleSubmit}>
                    <p className='mb-7 text-lg p-1 bg-black text-white max-w-lg rounded-xl mx-auto font-black text-center'> {loaded ? "modifier la formation" : "Ajouter une formation"} </p>
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
                            value={formation.name}
                            onChange={handleChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <PersonIcon
                            aria-label="toggle nom visibility"
                            edge="start"
                          >
                          <Visibility />
                          </PersonIcon>
                              </InputAdornment>
                            }
                            label="name"
                          />
                    </FormControl>
                     <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-heure"
                    >
                        heure </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-heure"
                            type="text"
                            name="heure"
                            value={formation.heure}
                            onChange={handleChange} 
                            endAdornment={
                              <InputAdornment position="end">
                                <ContactPhoneIcon
                            aria-label="toggle heure visibility"
                            edge="start"
                          >
                          <Visibility />
                          </ContactPhoneIcon>
                              </InputAdornment>
                            }
                            label="heure"
                          />
                    </FormControl>
                    <br/>

                    <FormControl sx={{ m: 1, width: '35ch' }}>
                      <InputLabel id="demo-simple-select-ville">Ville</InputLabel>
                      <Select
                        autoFocus
                        labelId="demo-simple-select-ville"
                        id="demo-simple-select-ville"
                        type="text"
                        name="ville"
                        value={formation.ville?.id}
                        label="ville"
                        onChange={handleChange}
                      >
                        {villes.map((item,value)=>( 
                             <MenuItem key={value} value={item.id}>{item.name}</MenuItem>                    
                        ))}
                        
                      </Select>
                    </FormControl>

                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-cout"
                    >
                        coût </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-cout"
                            type="text"
                            name="cout"
                            value={formation.cout}
                            onChange={handleChange} 
                             endAdornment={
                              <InputAdornment position="end">
                                <CenterFocusStrongIcon
                            aria-label="toggle ville visibility"
                            edge="start"
                          >
                          <Visibility />
                          </CenterFocusStrongIcon>
                              </InputAdornment>
                            }
                            label="cout"
                          />
                    </FormControl> 
                    
                    
                  <br/>

                       {/* value du champ SELECT, MenuItem,setState doit être du même type ici `.id` */}
                    <FormControl sx={{ m: 1, width: '35ch' }}>
                      <InputLabel id="demo-simple-select-cat">Catégorie</InputLabel>
                      <Select
                        autoFocus
                        labelId="demo-simple-select-cat"
                        id="demo-simple-select-cat"
                        type="text"
                        name="categorie"
                        value={formation.categorie?.id}
                        label="categorie"
                        onChange={handleChange}
                      >
                        {categories.map((item,value)=>( 
                             <MenuItem key={value} value={item.id}>{item.name}</MenuItem>                    
                        ))}
                        
                      </Select>
                    </FormControl> 
                    
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">reserver : </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="reserve"
                      value={formation.reserve}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="INDIVIDU" control={<Radio />} label="individus" />
                      <FormControlLabel value="ENTREPRISE" control={<Radio />} label="enteprises" />
                    </RadioGroup>
                  </FormControl>
                  
                  <br/>

                 <div className=' mb-5 border-3'>
                        <ReactQuill 
                      theme="snow" 
                      value={formation.programme} 
                      onChange={handleChangeReactQuilprogramme}
                      modules={{ toolbar: Toolbar }} 
                      className="w-[112ch]"/>
                 </div>

                   <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-objectif"
                    
                    >
                        objectif</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-objectif"
                            type="text"
                            name="objectif"
                            value={formation.objectif}
                            onChange={handleChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <PersonIcon
                            aria-label="toggle objectif visibility"
                            edge="start"
                          >
                          <Visibility />
                          </PersonIcon>
                              </InputAdornment>
                            }
                            label="objectif"
                            multiline
                            maxRows={7}
                          />
                    </FormControl>

                
                </Box>
                  <div className='flex mb-3 justify-center space-x-7'>                
                        <Link to= "/admin/formations"> 
                        <Button  variant="contained" color="secondary" sx={{mt:3 , width:150}}> retour  </Button> 
                        </Link>        
                     <Button type="submit" variant="contained"  color="success" sx={{mt:3 , width:150}}>Valider</Button>
                </div>
            </Box>
            </div>
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

