import React from "react"
import { Button } from "@mui/material"
import axios from "axios";

function Basic() {

 const loginPerson = ()=>{
  
    const username =  "elanrif@yahoo.fr"
    const password = 1234
    axios
      .get("/admin",{
          headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
    }
      })
      .then((res) => {

         console.log("admin : " , res.data)
       
      })
      .catch((error) => {
        console.log(error.message);
    
      });
  }

  return (
    <div>
         <div className="flex justify-center">
                     <Button onClick={loginPerson} variant="contained" sx={{mt:3 , width:150}}>Envoyer</Button>
                    </div>
    </div>
  )
}

export default Basic

