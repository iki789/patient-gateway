import React, { useState } from 'react';
import { createStyles, makeStyles, Paper, Table, TableBody,TableRow, TableCell, TableHead, Theme, Typography } from '@material-ui/core';
import { IPatient } from '../../../db/schema/patient';
import { Patient } from '../../../lib/patient';
import { Pagination } from '../../UI/Pagination';

const useStyles = makeStyles((theme: Theme)=>
  createStyles({
    paper:{
      padding: theme.spacing(2)
    },
    wrapper:{
      height: 300,
      overflowX: 'hidden',
      overflowY: 'scroll'
    }
  })
);

export default function Patients() {
  const classes = useStyles();
  const patientService: Patient = new Patient(0);
  patientService.setPerPage = 6;
  const [ patients, setPatients] = useState(patientService.getAll(1));
  
  const handlePageChange = (page: number) =>{
    setPatients(patientService.getAll(page))
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant='h5'>Your Patients</Typography>
      <div className={classes.wrapper}>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell>Patient Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {patients.map((p:IPatient)=>
            <TableRow key={p.id}>
              <TableCell>{p.firstname} {p.middleInitial ? p.middleInitial + '. ' : ''}{p.lastname} ({p.gender.charAt(0)}, {patientService.getAge(p.dateOfBirth)})</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </div>
      <Pagination pageCount={patientService.pageCount} handlePageChange={handlePageChange} />
    </Paper>
  )
}
