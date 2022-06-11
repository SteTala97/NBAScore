import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/* Visualizzazione delle info di una specifica squadra.
    Richiede come props un oggetto Json contenete:
        1) l'id della squadra
        2) il nome della squadra
        3) il logo della squadra
        4) il nickname della squadra
        5) la città della squadra
        6) la Conference della squadra
        7) la Division della squadra
    Se una di queste informazioni non è disponibile, al suo posto viene visualizzato "NA".
*/
function TeamInfoTable(props) {
    return (
        <TableContainer>
            <Table id="teamInfoTable" sx={{ minWidth: 650, maxWidth: 1000}}  aria-label="simple table" cellSpacing="0" className="teamTable">
                <TableHead>
                    <TableRow key="1">
                        <TableCell align="center" ><strong>Team</strong></TableCell>
                        <TableCell align="center"><strong>Nickname</strong></TableCell>
                        <TableCell align="center"><strong>City</strong></TableCell>
                        <TableCell align="center"><strong>Conference</strong></TableCell>
                        <TableCell align="center"><strong>Division</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>                        
                    <TableRow key={props.teamInfo.teamId}>
                        <TableCell align="center">{props.teamInfo.teamName ? props.teamInfo.teamName : "NA"}</TableCell>
                        <TableCell align="center">{props.teamInfo.nickname ? props.teamInfo.nickname : "NA"}</TableCell>
                        <TableCell align="center">{props.teamInfo.city ? props.teamInfo.city : "NA"}</TableCell>
                        <TableCell align="center">{props.teamInfo.conference ? props.teamInfo.conference : "NA"}</TableCell>
                        <TableCell align="center">{props.teamInfo.division ? props.teamInfo.division : "NA"}</TableCell>
                    </TableRow>
                </TableBody>                    
            </Table>
        </TableContainer>
    );
}

export default TeamInfoTable;
