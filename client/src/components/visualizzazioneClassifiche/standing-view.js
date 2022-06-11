import React, { useState, useEffect } from 'react';

// import degli altri componenti per la visualizzazione delle classifiche
import StandingsNavBar from './standings-navbar';
import StandingTable from './standing-table';
import TeamInfo from '../visualizzazioneInformazioniSquadra/TeamInfo';


import './standing.css';
import './standing-nav-style.css';

// Pagina per la visualizzazione delle classifiche
function StandingView (props) {
    // conference: indica le conference (East o West) di cui si vuole la classifica
    const [conference, setConference] = useState("");
    // season: indica la stagione di cui si vuole la classifica
    const [season, setSeason] = useState(0);
    // seasons: rappresenta la lista di tutte le possibili stagioni tra cui scegliere per effettuare la ricerca, tale lista verrà fornita dal server su richiesta
    const [seasons, setSeasons] = useState([]);  
    // standing: rappresenta la classifica ottenuta dalla ricerca ed è organizzata come una lista di 'classificati'
    const [standing, setStanding] = useState([]); 
    // navError: indica se c'è stato un errore durante la richiesta al server per ottenere 'seasons'
    const [navError, setNavError] = useState(null);
    // tableError: indica se c'è stato un errore durante l'ottenimento dei risultati della ricerca
    const [tableError, setTableError] = useState(null);
    /* loading: indica lo 'stato' della ricerca della classifica ed ha 3 valori possibili: 
            'toDo' se la ricerca è ancora da fare, 
            'inProgress' se la ricerca è in corso ma non è ancora stata completata, 
            'complete' se la ricerca è stata completata */
    const [loading, setLoading] = useState("toDo"); 
    // navLoading: indica lo 'stato' del caricamento di StandingsNavBar (serve per visualizzare un apposito messaggio che informi l'utente che si sta caricando la pagina web)
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
                <StandingsNavBar
                    season={season}
                    setSeason={setSeason}
                    seasons={seasons}
                    setSeasons={setSeasons}
                    conference={conference}
                    setConference={setConference}
                    standing={standing}
                    setStanding={setStanding}
                    navError = {navError}
                    setNavError = {setNavError}
                    loading = {loading}
                    setLoading = {setLoading}
                    tableError = {tableError}
                    setTableError = {setTableError}
                    navLoading = {navLoading}
                    setNavLoading = {setNavLoading}
                />
                <StandingTable 
                    season={season}
                    conference={conference}
                    standing={standing}
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

export default StandingView;