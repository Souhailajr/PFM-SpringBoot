import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteA from './DeleteA';

const columns = [
  { id: 'image', label: 'Image', minWidth: 150 },
  {
    id: 'firstname',
    label: 'Nom',
    minWidth: 70,
    align: 'center', /* left,center,right */
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'lastname',
    label: 'prenom',
    minWidth: 70,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'username',
    label: 'email',
    maxWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'ville',
    label: 'ville',
    maxWidth: 120,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'phone',
    label: 'phone',
    maxWidth: 120,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
   {
    id: 'options',
    label: 'Option',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];


function createData(image,firstname,lastname,username,ville,phone,options) {
  //const density = population / size;
  return {image,firstname,lastname,username,ville,phone,options};
}


export default function AAssistant() {
  const [page, setPage] = React.useState(0);
  const [datas, setDatas] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [update,setupdate] = React.useState(false);

 const setUpdate = ()=>{
      setupdate(!update)
 }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    handleGetDatas()
  }, [update])

  const handleGetDatas = ()=>{

    axios.get("/userInfos/role",{
        params :{
            role  : "ROLE_ASSISTANT"
        }
    })
    .then((res)=>{
       
      setDatas(res.data)

    })
  }
  
   const alert = ()=> toast.success('succès !', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });



 const Options = (data)=> (
    <div className='flex justify-center items-center space-x-[-5px]'>
                 
                     <Link to={`/admin/assistants/${data.id}/editer`}>
                    <IconButton aria-label="modifier">
                    <DriveFileRenameOutlineIcon />
                    </IconButton>
                    </Link>

                    <Link to={`#`}>
                    <IconButton aria-label="view">
                    <VisibilityIcon />
                    </IconButton>
                    </Link>
                     <DeleteA value={{data,alert,setUpdate}}/>
                  </div>
) 

  const rows =
    datas.sort((a, b) => b.id - a.id).map((item, index) =>
      createData(
          <Avatar
        alt={item.name}
        src={item.image}
        sx={{ width: 54, height: 54 }}
      />,
        item.firstname,
        item.lastname,
        item.username,
        item.ville,
        item.phone,
        Options(item)
      )
    );


  
  return (
   <div >
     <Box sx={{display:'flex' ,marginLeft:5,marginTop:4,marginBottom:4}}>
      <Link to="/admin/assistants/ajouter" className='me-3'> 
      <Button variant="contained" color='success' size="small">Ajouter</Button> </Link>
     </Box>
     <div className='flex justify-center'>
        <Paper sx={{ width: '95%' }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
              <TableCell align="center" colSpan={2}>
                
              </TableCell>
              <TableCell align="center" colSpan={3}>
                 Liste des Assistants
              </TableCell>
               <TableCell align="center" colSpan={3}>
                
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                 <span className='font-black'> {column.label}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                       
                         { column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}

                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
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
  );
}