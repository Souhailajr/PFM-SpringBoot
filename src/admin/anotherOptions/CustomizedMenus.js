import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BadgeIcon from '@mui/icons-material/Badge';
import AddTaskIcon from '@mui/icons-material/AddTask';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Divider } from '@mui/material';
import AddImage from './AddImage';
import AddFormateur from './AddFormateur';
import AddDate from './AddDate';
import AddEntreprise from './AddEntreprise';
import { Link } from 'react-router-dom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus({datas}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {data,alert,setUpdate} = datas

   const [opened, setOpenImg] = React.useState(false);
  const [type, setType] = React.useState('');

  const handleOpenImg = () => {
    setOpenImg(true)
    setType("image")
    handleClose()
  }

   const handleOpenFormateur = () => {
    setOpenImg(true)
    setType("formateur")
    handleClose()
  }

   const handleOpenEntreprise= () => {
    setOpenImg(true)
    setType("entreprise")
    handleClose()
  }

     const handleOpenDate= () => {
    setOpenImg(true)
    setType("planification")
    handleClose()
  }

   const handleCloseImg = () => {
    setOpenImg(false);
  }

  const handleUpdate = ()=>{

    setUpdate() 
  }

  const handleUpdateAlertandData  = ()=>{
      setUpdate()
      alert()
  }

   const selectedType = ()=>{

    let componentToRender;
    switch (type) {
    case "image":
      componentToRender = <AddImage value={{ handleCloseImg,handleUpdateAlertandData, opened, data }} />;
      break;
    case "entreprise":
      componentToRender = <AddEntreprise value={{ handleCloseImg, handleUpdateAlertandData, opened, data }} />;
      break;
    case "formateur":
      componentToRender = <AddFormateur value={{ handleCloseImg,handleUpdateAlertandData, opened, data }} />;
      break;
      case "planification":
      componentToRender = <AddDate value={{ handleCloseImg,handleUpdateAlertandData, opened, data }} />;
      break;
    default:
      componentToRender = <AddFormateur value={{ handleCloseImg, opened, data }} />;
      }
    return componentToRender;

  }

  return (
    <div>
        {selectedType()}
      <Link>
        <AddTaskIcon
            sx={{marginX:1}}
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
        >
      </AddTaskIcon></Link>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenFormateur} disableRipple>
          <BadgeIcon />
          Ajouter un formateur
        </MenuItem>
        <MenuItem onClick={handleOpenEntreprise} disableRipple>
          <AddBusinessIcon />
          Ajouter des entreprises
        </MenuItem>
         <MenuItem onClick={handleOpenDate} disableRipple>
          <AddBusinessIcon />
          Planifier la date
        </MenuItem>
        <Divider  sx={{marginY:3}}/>
         <MenuItem onClick={handleOpenImg} disableRipple>
          <ImageIcon />
           Modifier l'image
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
