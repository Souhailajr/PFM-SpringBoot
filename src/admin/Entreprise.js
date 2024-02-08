import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteE from './DeleteE';

const columns = [
  { id: 'image', label: 'Image', minWidth: 150 },
  {
    id: 'name',
    label: 'Nom',
    minWidth: 170,
    align: 'center', /* left,center,right */
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'email',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'url',
    label: 'url',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'phone',
    label: 'phone',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'address',
    label: 'address',
    minWidth: 150,
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

function createData(image,name,email,url,phone,address,options) {
  //const density = population / size;
  return {image, name,email,url,phone,address,options};
}


export default function Entreprise() {
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

    axios.get("/entreprises")
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
                 
                    <Link to={`/admin/entreprises/${data.id}/editer`}>
                    <IconButton aria-label="modifier">
                    <DriveFileRenameOutlineIcon />
                    </IconButton>
                    </Link>

                    <Link to={`#`}>
                    <IconButton aria-label="view">
                    <VisibilityIcon />
                    </IconButton>
                    </Link>
                    <DeleteE value={{data,alert,setUpdate}}/>
                  </div>
) 

  const rows =
    datas.sort((a, b) => b.id - a.id).map((item, index) =>
      createData(
        <img
          src={item.image ? item.image : '/image/entreprise.png'}
          alt={item.name}
          className="w-20  h-16"
        />,
        item.name,
        item.email,
        <a href ={`${item.url}`} className='text-blue-600' target="_blank">{item.url}</a>,
        item.phone,
        <span>{item.address?.slice(0,15)}...</span>,
        Options(item)
      )
    );

  
  return (
   <div >
     <Box sx={{display:'flex' ,marginLeft:5,marginTop:4,marginBottom:4}}>
      <Link to="/admin/entreprises/ajouter" className='me-3'> 
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
                 Liste des entreprises
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