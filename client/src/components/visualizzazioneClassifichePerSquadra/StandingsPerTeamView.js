import React, { useState, useEffect } from 'react';

// import degli altri componenti per la visualizzazione delle classifiche per squadra
import StandingsPerTeamNavBar from './StandingsPerTeamNavBar';
import StandingsPerTeamTable from './StandingsPerTeamTable';
import TeamInfo from '../visualizzazioneInformazioniSquadra/TeamInfo';


import '../visualizzazioneClassifiche/standing.css';
import '../visualizzazioneClassifiche/standing-nav-style.css';
import './StandingsPerTeam.css';

// Pagina per la visualizzazione delle classifiche
function StandingsPerTeamView (props) {
    // team: indica il nome della squadra di cui si vogliono le classifiche
    const [team, setTeam] = useState("");
    // teams: indica l'elenco dei nomi delle squadre disponibili
    const [teams, setTeams] = useState([]);
    // standings: rappresenta le classifiche ottenute dalla ricerca
    const [standings, setStandings] = useState([]); 

    // navError: indica se c'è stato un errore durante la richiesta al server per ottenere 'teams'
    const [navError, setNavError] = useState(null);
    // tableError: indica se c'è stato un errore durante l'ottenimento dei risultati della ricerca
    const [tableError, setTableError] = useState(null);
    /* loading: indica lo 'stato' della ricerca della classifica ed ha 3 valori possibili: 
            'toDo' se la ricerca è ancora da fare, 
            'inProgress' se la ricerca è in corso ma non è ancora stata completata, 
            'complete' se la ricerca è stata completata */
    const [loading, setLoading] = useState("toDo"); 
    // navLoading: indica lo 'stato' del caricamento di StandingsPerTeamNavBar 
    const [navLoading, setNavLoading] = useState(true);

    useEffect(() => {
        props.setTeamClicked(false);
        props.setTeamName("");
    }, []);
    

    return (
        props.teamClicked === true ?
            <TeamInfo teamName={props.teamName}/>
            :
            <React.Fragment>
                <StandingsPerTeamNavBar
                    team={team}
                    setTeam={setTeam}
                    teams={teams}
                    setTeams={setTeams}
                    standings={standings}
                    setStandings={setStandings}
                    navError = {navError}
                    setNavError = {setNavError}
                    loading = {loading}
                    setLoading = {setLoading}
                    tableError = {tableError}
                    setTableError = {setTableError}
                    navLoading = {navLoading}
                    setNavLoading = {setNavLoading}
                />
                <StandingsPerTeamTable 
                    team={team}
                    standings={standings}
                    navError = {navError}
                    tableError = {tableError}
                    loading = {loading}
                    navLoading = {navLoading}
                    setTeamClicked={props.setTeamClicked}
                    setTeamName={props.setTeamName}
                />
            </React.Fragment>
    );
}

export default StandingsPerTeamView;