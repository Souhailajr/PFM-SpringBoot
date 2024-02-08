import { useContext } from "react"
import { PrincipalContext } from "../Context"

export default function AdminAcceuil() {
  const {connected} = useContext(PrincipalContext)
  return (
    <div className='flex items-center justify-center h-[100vh]'>
        <p className='text-xl font-black'> 
        Bivenue dans votre tableau de bord {connected.role ==="ROLE_ASSISTANT" ? "d'assistant":"d'administration" }.</p>
    </div>
  )
}
