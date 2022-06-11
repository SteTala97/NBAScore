import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Team from '../visualizzazioneInLive/Team';

// visualizzazione classifiche in forma tabellare se la richiesta è andata a buon fine, altrimenti visualizza a schermo un apposito messaggio di errore
function StandingTable(props) {
    /* se navError ha un valore diverso da null significa che la richiesta al server per ottenere le stagioni è fallita.
       se navLoading ha valore true, ciò significa che la richiesta al server per ottenere l'elenco delle stagioni disponibili è ancora in corso.
       In entrambi i casi non visualizzo nulla */
    if (props.navError || props.navLoading) {
        return <React.Fragment></React.Fragment>;
    }
    /* Se, invece, season ha valore 0 oppure conference ha valore "" significa che l'utente non ha ancora selezionato almeno uno dei parametri di ricerca.
       Mentre se questi 2 parametri sono settati ma loading ha valore "toDo", ciò significa che l'utente ha settato i parametri di ricerca ma non ha ancora 
       avviato la ricerca. */
    else if((props.season === 0 || props.conference === "") || props.loading === "toDo"){
        return (null)
    }
    // se, invece, abbiamo che loading ha valore "inProgress", ciò significa che l'utente ha avviato la ricerca ma questa non è ancora stata completata
    else if(props.loading === "inProgress") {
        return (null)
    }
    // se, invece, abbiamo che tableError ha valore diverso da null, ciò vuol dire che c'è stato un errore durante l'ottenimento dei risultati della ricerca della classifica
    else if (props.tableError) {
        return <p className="no-data-message"> Error: {props.tableError.message} </p>
    }
    // se, invece, standing è una lista vuota
    else if(props.standing.length === 0) {
        return <p className="no-data-message"> Standing not available for these parameters </p>
    }
    // altrimenti si ha una classifica non vuota da visualizzare
    else{
        // MODELLO VISUALIZZAZIONE TABELLARE DELLA STANDING
        return (
            <TableContainer>
                <Table id="standingTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table" cellSpacing="0" className="standingTable">
                    <TableHead>
                        <TableRow key="1">
                            <TableCell align="center" colSpan={2} sx={{width:'30%'}}><strong>Team</strong></TableCell>
                            <TableCell align="center"><strong>Played</strong></TableCell>
                            <TableCell align="center"><strong>Won</strong></TableCell>
                            <TableCell align="center"><strong>Lost</strong></TableCell>
                            <TableCell align="center"><strong>Win Percentage</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.standing.map((classified) => (
                            <TableRow key={classified.id}>
                                <TableCell align="right">
                                    <img src={classified.teamLogo} alt="" className="team-logo selectable-team" onClick={() => { props.setTeamClicked(true); props.setTeamName(classified.teamName) }}></img>
                                </TableCell>
                                <TableCell align="left">
                                    <Team name={classified.teamName} setTeamName={props.setTeamName} setTeamClicked={props.setTeamClicked} /> 
                                </TableCell>
                                <TableCell align="center">{classified.gamesPlayed}</TableCell>
                                <TableCell align="center">{classified.wonGames}</TableCell>
                                <TableCell align="center">{classified.lostGames}</TableCell>
                                <TableCell align="center">{(classified.winPercentage * 100).toFixed(2)}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>                    
                </Table>
            </TableContainer>
        );
    }
}

export default StandingTable;
