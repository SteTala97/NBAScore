import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


// visualizzazione elenco classifiche in forma tabellare se la richiesta è andata a buon fine, altrimenti visualizza a schermo un apposito messaggio di errore
function StandingsPerTeamTable(props) {
    /* se navError ha un valore diverso da null significa che la richiesta al server per ottenere le squadre è fallita.
       se navLoading ha valore true, ciò significa che la richiesta al server per ottenere l'elenco delle squadre disponibili è ancora in corso.
       In entrambi i casi non visualizzo nulla */
    if (props.navError || props.navLoading) {
        return <React.Fragment></React.Fragment>;
    }
    /* Se, invece, team ha valore "" significa che l'utente non ha ancora selezionato il parametro di ricerca.
       Mentre se questo parametro è stato settato ma loading ha valore "toDo", ciò significa che l'utente ha settato il parametro di ricerca ma non ha ancora 
       avviato la ricerca. */
    else if(props.team === "" || props.loading === "toDo"){
        return (null)
    }
    // se, invece, abbiamo che loading ha valore "inProgress", ciò significa che l'utente ha avviato la ricerca ma questa non è ancora stata completata
    else if(props.loading === "inProgress") {
        return (null)
    }
    // se, invece, abbiamo che tableError ha valore diverso da null, ciò vuol dire che c'è stato un errore durante l'ottenimento dei risultati della ricerca delle classifiche
    else if (props.tableError) {
        return <p className="no-data-message"> Error: {props.tableError.message} </p>
    }

    // se, invece, standings è una lista vuota e loading ha valore "complete", ciò significa che la ricerca è stata terminata ma non ha dato alcun risultato
    else if(props.standings.length === 0 && props.loading === "complete") {
        return <p className="no-data-message"> Standings not available for this Team </p>
    }
    
    // altrimenti si ha un elenco di classifiche da visualizzare
    else{
        // MODELLO VISUALIZZAZIONE TABELLARE DELLE STANDINGS + INTESTAZIONE CON NOME E LOGO SQUADRA
        return (
            <React.Fragment>
                <div className="results-title">
                    <img src={props.standings[0].teamLogo} alt="Logo Team" className="team-logo-result select-title selectable-team"></img>
                    <h1 className='teamName-title selectable-team' onClick={() => { props.setTeamClicked(true); props.setTeamName(props.standings[0].teamName) }} >
                        {props.standings[0].teamName}
                    </h1>                    
                </div>
                <div className="results-conference">
                    <h2>Conference: {props.standings[0].conference}</h2>
                </div>

                <TableContainer>
                    <Table id="standingTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table" cellSpacing="0" className="standingTable">
                        <TableHead>
                            <TableRow key="1">
                                <TableCell align="center"><strong>Season</strong></TableCell>
                                <TableCell align="center"><strong>Position In Standing</strong></TableCell>
                                <TableCell align="center"><strong>Played</strong></TableCell>
                                <TableCell align="center"><strong>Won</strong></TableCell>
                                <TableCell align="center"><strong>Lost</strong></TableCell>
                                <TableCell align="center"><strong>Win Percentage</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {// ordina le classifiche in base alla stagione e ne visualizza i dati
                            props.standings.sort((a, b) => a.season - b.season).map((singleStanding) => (                            
                                <TableRow key={"team" + singleStanding.id + "-season"+singleStanding.season}>                                
                                    <TableCell align="center">{singleStanding.season}</TableCell>
                                    <TableCell align="center">{singleStanding.positionInStanding}</TableCell>
                                    <TableCell align="center">{singleStanding.gamesPlayed}</TableCell>
                                    <TableCell align="center">{singleStanding.wonGames}</TableCell>
                                    <TableCell align="center">{singleStanding.lostGames}</TableCell>
                                    <TableCell align="center">{(singleStanding.winPercentage * 100).toFixed(2)}%</TableCell>
                                </TableRow>                            
                            ))
                            }
                        </TableBody>                    
                    </Table>
                </TableContainer>
            </React.Fragment>
        );
    }
}

export default StandingsPerTeamTable;
