import { useContext } from "react"
import { PrincipalContext } from "../Context"

export default function FormateurAcceuil() {
  const {connected} = useContext(PrincipalContext)
  return (
    <div className='flex items-center justify-center h-[100vh]'>
        <p className='text-xl font-black'> 
        Bivenue dans votre tableau de bord Mr/Mlle <span className="text-blue-500">{connected.firstname} {connected.lastname}</span>.</p>
    </div>
  )
}
