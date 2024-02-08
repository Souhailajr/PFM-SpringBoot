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
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PrincipalContext } from '../Context'; 

const columns = [
  { id: 'image', label: 'Image', minWidth: 150 },
  { id: 'cout', label: 'Coût', minWidth: 50 },
  {
    id: 'name',
    label: 'Nom',
    minWidth: 100,
    align: 'center', /* left,center,right */
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'programme',
    label: 'programme',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'ville',
    label: 'ville',
    minWidth: 70,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  
  {
    id: 'date',
    label: 'Date',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toFixed(2),
  }
  ,
  {
    id: 'entreprises',
    label: 'entreprises',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }
];

function createData(image,name,cout,programme,ville,date,entreprises) {
  //const density = population / size;
  return {image, name,cout,programme,ville,date,entreprises};
}


export default function ListFormationFormateur() {

  const { connected, setConnected } = React.useContext(PrincipalContext);


  const [page, setPage] = React.useState(0);
  const [formations, setFormations] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [update,setUpdate] = React.useState(false);

 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
   connected.id !== -1 && handleLoad()
  }, [update])

  const handleLoad = ()=>{

    axios.get(`/formations/formateur/${connected.id}`)
    .then((res)=>{
       
      setFormations(res.data)

    })
  }


  
  const rows =
    formations.sort((a, b) => b.id - a.id).map((item, index) =>
      createData(
        <img
          src={item.image? item.image : '/image/formation.png'}
          alt="Image"
          className="w-20  h-16"
        />,
        item.name,
        <div className='flex items-center space-x-2'> <span>{item.cout}</span> <span>DHS</span> </div>,
        <span>{item.programme?.slice(0,17)}...</span>,
        item.ville?.name,
        item.date,
        item.entreprises?.length,
        <div className='text-slate-400'>{item.userinfo?.firstname ? (<span className='text-blue-400'>{item.userinfo?.firstname} {item.userinfo?.lastname}</span>) : "aucun formateur"} </div>,
 
      )
    );

  
  return (
   <div >
     <Box sx={{display:'flex' ,marginLeft:5,marginTop:4,marginBottom:4}}>
      <Link  className='me-3'> <Button variant="contained" size="small">Formations</Button> </Link>
    
     </Box>
     <div className='flex justify-center'>
        <Paper sx={{ width: '95%' }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                details
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
               <TableCell align="center" colSpan={3}>
                Details
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
   </div>
  );
}