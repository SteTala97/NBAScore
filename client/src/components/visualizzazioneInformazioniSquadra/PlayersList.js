import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import { grey } from '@mui/material/colors';

/* Visualizzazione elenco dei giocatori per una specifica squadra.
    Richiede come props:
        1) l'id della squadra
        2) l'elenco dei giocatori (formato array di array) 
    Se elenco dei giocatori è vuoto allora la pagina visualizza "NA", altrimenti la pagina visulizza l'elenco dei nominativi dei giocatori.
    Richiede che l'elenco di giocatori sia fornito come un'array di array (ES: [ [giocatore1, giocatore2], [giocatore3, giocatore4], ...])
    con tanti sotto-array quante sono le colonne su cui si vuole sia distribuito l'elenco dei giocatori (Con l'ES sopra avremmo 2 colonne)
*/
function PlayersList(props) {
    return (
        <TableContainer>
            <Table id="teamInfoTable" sx={{ height: "max-content", minWidth: 650, maxWidth: 1000}} aria-label="simple table" cellSpacing="0" className="playersTable">
                <TableHead>
                    <TableRow key="1">
                        <TableCell align="center" colSpan={2} sx={{width:'30%'}}><strong>Players</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>                        
                    <TableRow key={props.teamId}>
                        <TableCell align="center">
                            {   
                                props.playersSubList.length !== 0 ? 
                                    <Grid container spacing={2} justifyContent="center" >
                                        { props.playersSubList.map((subPlayers) => (
                                                <Grid item key={props.playersSubList.indexOf(subPlayers)}>
                                                    <List >
                                                    { 
                                                        subPlayers.map((player) => (
                                                            <ListItem key={player.playerId} id={"player"+player.playerId}>
                                                                <ListItemButton onClick={() => { props.setPlayerInfo(true); props.setPlayerId(player.playerId) /* collegamento alle info del giocatore */ } } >
                                                                    <ListItemIcon>
                                                                        <SportsBasketballIcon sx={{ color: grey[900] }} />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={player.playerName}
                                                                    />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        ))                                                   
                                                    }
                                                    </List>
                                                </Grid>
                                            ))}
                                    </Grid>                                   
                                    :
                                    "NA"                                                                
                            }
                        </TableCell>            
                    </TableRow>
                </TableBody>                    
            </Table>
        </TableContainer>
    );
}

export default PlayersList;