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
  {
    id: 'support',
    label: 'Support',
    minWidth: 70,
    align: 'center', /* left,center,right */
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'qualite',
    label: 'Qualite pédagogique',
    minWidth: 70,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'maitrise',
    label: 'Maitrise sujet',
    maxWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'rythme',
    label: 'rythme',
    maxWidth: 120,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'participant',
    label: 'participant',
    minWidth: 20,
    align: 'right',
    format: (value) => value.toFixed(2),
  }
];


function createData(support,qualite,maitrise,rythme,participant) {
  //const density = population / size;
  return {support,qualite,maitrise,rythme,participant};
}


export default function ListEvaluationFormateur() {

 const { connected, setConnected } = React.useContext(PrincipalContext);


  const [page, setPage] = React.useState(0);
  const [evaluations, setEvaluations] = React.useState([]);
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

    axios.get(`/evaluations/formateur/${connected.id}`)
    .then((res)=>{
       
      setEvaluations(res.data)

    })
  }
  

  const rows =
    evaluations.sort((a, b) => b.id - a.id).map((item, index) =>
      createData(
        item.support,
        item.qualite,
        item.maitrise,
        item.rythme,
        item.participant?.username,
      )
    );

  
  return (
   <div >
     <Box sx={{display:'flex' ,marginLeft:5,marginTop:4,marginBottom:4}}>
      <Link  className='me-3'> <Button variant="contained" size="small">Évaluations</Button> </Link>

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
                 <span className='font-semibold'> {column.label}</span>
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