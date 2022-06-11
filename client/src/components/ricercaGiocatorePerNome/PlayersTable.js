import React from 'react';
import './PlayersTable.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Info from '@mui/icons-material/Info';
import Button from '@mui/material/Button';

function PlayersTable(props) {
    if(props.callToAPI) {
        // Se l'API remota non è disponibile
        if(props.error) {
            return (
                <p id="apiNotAvailable" className='text-center'>Service temporarily unavailable. Unable to connect to the remote API.</p>
            );
        }

        // Se non vi sono giocatori che corrispondono alla ricerca
        if(props.playersFirstname.length === 0 && props.playersLastname.length === 0) {
            return (
                <p id="noPlayers" className='text-center'>There are no players for these search parameters.</p>
            );
        }
        var players = [];
        if(props.playersFirstname.length !== 0 && props.playersLastname.length !== 0) // entrambi c'è qualcosa
        {
            for (let i_first = 0; i_first < props.playersFirstname.length; i_first++) {
                const elementFirst = props.playersFirstname[i_first];
                for (let i_last = 0; i_last < props.playersLastname.length; i_last++) {
                    const elementLast = props.playersLastname[i_last];
                    if(elementFirst.id === elementLast.id)
                        players.push(elementFirst);
                }
            }
        }else if(props.playersLastname.length !== 0) // c'è solo nel lastname
        {
            players = props.playersLastname;
        }else if(props.playersFirstname.length !== 0) //c'è solo nel firstname
        { 
            players = props.playersFirstname;
        } // altrimenti rimane vuota la lista

        if(players.length !== 0){
            players.forEach(player => {
                props.teams.forEach(team => {
                    if(team.id === Number(player.teamid))
                    {
                        player.teamlogo = team.logo;
                        player.teamname = team.name;
                    }
                });
            });
        }
        var playersTable = null;
        if(players.length !== 0) {
            playersTable = <div>
                        <TableContainer>
                            <Table id='playersTable' className="playersTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table">
                                <TableHead>
                                    <TableRow key="1">
                                    <TableCell id="title-table-firstname" align="center"><strong>Firstname</strong></TableCell>
                                    <TableCell id="title-table-lastname" align="center"><strong>Lastname</strong></TableCell>
                                    <TableCell id="title-table-team" align="center"><strong>Team</strong></TableCell>
                                    {/* <TableCell id="title-table-pos" align="center"><strong>Position</strong></TableCell> */}
                                    <TableCell id="title-table-birth" align="center"><strong>Birth Date</strong></TableCell>
                                    <TableCell id="title-table-button" align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {players.map(player => (
                                        <TableRow key={player.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell id="content-table-firstname" scope="row" align="center" sx={{width:'10%'}}>
                                            {player.firstname}
                                        </TableCell>
                                        <TableCell id="content-table-lastname" scope="row" align="center" sx={{width:'10%'}}>
                                            {player.lastname}
                                        </TableCell>
                                        <TableCell id="content-table-team" align="center" sx={{width:'15%'}}>
                                            { player.teamlogo ? 
                                                <img src={player.teamlogo} className="team-logo selectable-team" alt={player.teamname}  onClick={() => { props.setTeamClicked(true); props.setTeamName(player.teamname) }} />
                                                :
                                                "-"
                                            }
                                        </TableCell>
                                        {/* <TableCell id="content-table-position" align="center" sx={{width:'15%'}}>
                                            {player.position} 
                                        </TableCell> */}
                                        <TableCell id="content-table-birth" align="center" sx={{width:'10%'}}>                    
                                            {player.birth ? player.birth : "-"}
                                        </TableCell>
                                        <TableCell id="content-table-button" align="center" sx={{width:'10%'}}> 
                                            <div>
                                            <Button onClick={() => { props.setButtonPlayerClicked(true); props.setPlayer_Id(player.id) }} variant="contained" color="success" endIcon={<Info fontSize='medium'/>}>
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
                <div className='playersTables'>
                    {playersTable}
                </div>
            );
        }
    }
    else {
        return (null);
    }
}

export default PlayersTable;