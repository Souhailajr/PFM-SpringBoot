import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Search from './Search';
import {Link,useNavigate} from "react-router-dom"
import { PrincipalContext } from '../Context';
import { ToastContainer, toast } from 'react-toastify';

export default function MenuPerson() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const {connected,setConnected} = React.useContext(PrincipalContext)
  const navigate = useNavigate()
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  const handleLogout = ()=>{   
          alertToast()
          setConnected({
            id : -1
          })
          sessionStorage.removeItem("connected")
          setTimeout(() => {
            navigate("/connexion/admin")
          }, 3000);
          handleClose() 
      }

  return (
    <React.Fragment>
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
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 20 }}> <Search/> </Typography>
        
        {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 30, height: 30 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {connected.id === -1 &&
        <MenuItem onClick={handleClose}>
           <Link to="/inscription/formateur" className='flex items-center'>
           <Avatar /> Créer un compte
          </Link>
        </MenuItem>
        }

         {(connected.role === "ROLE_ADMIN" ||  connected.role === "ROLE_ASSISTANT")  &&
         <MenuItem onClick={handleClose}>
           <Link to="/admin/acceuil" className='flex items-center'>
           <Avatar /> Dashboard
          </Link>
        </MenuItem>}
          {connected.role === "ROLE_FORMATEUR"  &&
         <MenuItem onClick={handleClose}>
           <Link to="/formateur/acceuil" className='flex items-center'>
           <Avatar /> Dashboard
          </Link>
        </MenuItem>}

        {connected.id === -1  &&
          <MenuItem onClick={handleClose}>
          <Link to="/connexion/admin" className='flex items-center'>
          <Avatar /> Se connecter
          </Link>
        </MenuItem>
        }
        
      
        {connected.id !== -1  &&
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Déconnexion
        </MenuItem>}
      </Menu>
    </React.Fragment>
  );
}
