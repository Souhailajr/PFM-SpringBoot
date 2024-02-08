import React,{useState,useEffect} from 'react';
import './App.css';
import { Routes, Route, useParams } from "react-router-dom";
import { PrincipalContext } from './Context';
import axios from 'axios';
import Barre from './welcome/Barre';
import Welcome from './welcome/Welcome';
import AboutFormation from './welcome/AboutFormation';
import Admin from './formulaire/Admin';
import Assistant from './formulaire/Assistant';
import User from './formulaire/User';
import Formateur from './formulaire/Formateur';
import RegisterU from './formulaire/RegisterU';
import RegisterF from './formulaire/RegisterF';
import DashboardAdmin from './admin/DashboardAdmin';
import 'react-toastify/dist/ReactToastify.css';
import Formation from './admin/Formation';
import AFormateur from './admin/AFormateur';
import Entreprise from './admin/Entreprise';
import AAssistant from './admin/AAssistant';
import AParticipant from './admin/AParticipant';
import ListEval from './admin/ListEval';
import DashboardFormateur from './formateur/DashboardFormateur';
import SidebarFormateur from './formateur/SidebarFormateur';
import ListEvaluationFormateur from './formateur/ListEvaluationFormateur';
import ListFormationFormateur from './formateur/ListFormationFormateur';
import AdminAcceuil from './admin/AdminAcceuil';
import Acceuil from './formateur/Acceuil';
import Addformateur from './admin/formulaire/FormFormateur';
import FormFormateur from './admin/formulaire/FormFormateur';
import FormAssistant from './admin/formulaire/FormAssistant';
import FormFormation from './admin/formulaire/FormFormation';
import FormEntreprise from './admin/formulaire/FormEntreprise';
import Evaluation from './formulaire/Evaluation';
import FormateurAcceuil from './formateur/FormateurAcceuil';

function App() {

   const login = sessionStorage.getItem("connected") ? JSON.parse( sessionStorage.getItem("connected")) : null ; 

  const [connected,setConnected] = useState({
    id : -1
  }) 

  useEffect(() => {
  login && setConnected(login)
}, [login?.id])
console.log(connected)

   useEffect(() => {
    intecepteurs()
  })


  const intecepteurs = ()=>{
        axios.interceptors.request.use(function (request) {
      const person = connected
          const username =  "souhaila@gmail.com"
          const password = 1234

      if (person.username) {
        request.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
      }
      return request
    }, (error) => {
     console.error(error)
    });
  }
  
  return (
   <>
    <PrincipalContext.Provider value={{connected,setConnected}}>
          <Routes>
            <Route path="/" element={<Barre />}>
              <Route index path="" element={<Welcome />}/>
              <Route path="formation/:idformation" element={<AboutFormation />}/>
              <Route path="formation/:idformation/participant/:idparticipant/formateur/:idformateur/evaluation" element={<Evaluation />}/>
              <Route path="connexion/admin" element={<Admin />}/>
              <Route path="connexion/assistant" element={<Assistant />}/>
              <Route path="connexion/user" element={<User />}/>
              <Route path="connexion/formateur" element={<Formateur />}/>
              <Route path="formation/:idformation/inscription" element={<RegisterU />}/>
              <Route path="inscription/formateur" element={<RegisterF />}/>
            </Route >
            
            { ( connected.role === "ROLE_ADMIN" || connected.role === "ROLE_ASSISTANT" ) &&
             <Route path="/admin" element={<DashboardAdmin />}>
                <Route index path="acceuil" element={<AdminAcceuil />}/>
                <Route  path="formations" element={<Formation />}/>
                <Route  path="formations/:formationID/editer" element={<FormFormation loaded={true}/>}/>
                <Route  path="formations/ajouter" element={<FormFormation loaded={false}/>}/>
                <Route  path="formateurs" element={<AFormateur />}/>
                <Route  path="formateurs/:formateurID/editer" element={<FormFormateur loaded={true}/>}/>
                <Route  path="formateurs/ajouter" element={<FormFormateur loaded={false}/>}/>
                <Route  path="entreprises" element={<Entreprise />}/>
                <Route  path="entreprises/:entrepriseID/editer" element={<FormEntreprise loaded={true}/>}/>
                <Route  path="entreprises/ajouter" element={<FormEntreprise loaded={false}/>}/>
                <Route  path="assistants" element={<AAssistant />}/>
                <Route  path="assistants/:assistantID/editer" element={<FormAssistant loaded={true}/>}/>
                <Route  path="assistants/ajouter" element={<FormAssistant loaded={false}/>}/>
                <Route  path="participants" element={<AParticipant />}/>
                <Route  path="evaluations" element={<ListEval />}/>
             </Route>
             }

              {
                connected.role === "ROLE_FORMATEUR" &&
                <Route path="/formateur" element={<DashboardFormateur />}>
                <Route index path="acceuil" element={<FormateurAcceuil />}/>
                <Route  path="evaluations" element={<ListEvaluationFormateur />}/>
                <Route  path="formations" element={<ListFormationFormateur />}/>
              </Route>
              }

          </Routes>
    </PrincipalContext.Provider></>
  );
}

export default App;
