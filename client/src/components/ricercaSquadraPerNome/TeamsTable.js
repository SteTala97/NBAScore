import React from 'react';
import './TeamsTable.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Info from '@mui/icons-material/Info';
import Button from '@mui/material/Button';

function TeamsTable(props) {
    if(props.callToAPI) {
        // Se l'API remota non è disponibile
        if(props.error) {
            return (
                <p id="apiNotAvailable" className='text-center'>Service temporarily unavailable. Unable to connect to the remote API.</p>
            );
        }

        var teamsTable = null;
        if(props.teamsRes.length !== 0) {
            teamsTable = <div>
                        <TableContainer>
                            <Table id='teamsTable' className="teamsTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table">
                                <TableHead>
                                    <TableRow key="1">
                                    <TableCell id="title-table-firstname" align="center"><strong>Logo</strong></TableCell>
                                    <TableCell id="title-table-lastname" align="center"><strong>Name</strong></TableCell>
                                    <TableCell id="title-table-team" align="center"><strong>Nickname</strong></TableCell>
                                    <TableCell id="title-table-pos" align="center"><strong>Code</strong></TableCell>
                                    <TableCell id="title-table-birth" align="center"><strong>City</strong></TableCell>
                                    <TableCell id="title-table-button" align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.teamsRes.map(team => (
                                        <TableRow key={team.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell id="content-table-team" align="center" sx={{width:'15%'}}>
                                            <img src={team.logo} className="team-logo" alt={team.name}/>
                                        </TableCell>
                                        <TableCell id="content-table-firstname" scope="row" align="center" sx={{width:'10%'}}>
                                            {team.name}
                                        </TableCell>
                                        <TableCell id="content-table-lastname" scope="row" align="center" sx={{width:'10%'}}>
                                            {team.nickname}
                                        </TableCell>
                                        <TableCell id="content-table-position" align="center" sx={{width:'15%'}}>
                                            {team.code} 
                                        </TableCell>
                                        <TableCell id="content-table-birth" align="center" sx={{width:'10%'}}>
                                            {team.city}
                                        </TableCell>
                                        <TableCell id="content-table-button" align="center" sx={{width:'10%'}}> 
                                            <div>
                                            <Button onClick={() => { props.setButtonTeamClicked(true); props.setTeamNameSel(team.name) }} variant="contained" color="success" endIcon={<Info fontSize='medium'/>}>
                                                More Info
                                            </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                    <TableRow>
                                    </TableRow>
                                </TableBody>                    
                            </Table>
                        </TableContainer>
                       </div>
            return (
                <div className='teamsTables'>
                    {teamsTable}
                </div>
            );
        }else{
            return (
                <p id="resNotAvailable" className='text-center'>There are no teams for these search parameters</p>
            );
        }
    }
    else {
        return (null);
    }
}

export default TeamsTable;