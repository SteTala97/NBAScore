import React, { useState, useEffect } from 'react';
const axios = require('axios');


// sezione per selezionare la squadra su cui effettuare la ricerca delle standings
const StandingsPerTeamNavBar = (props) => {

    // teamsNames: elenco dei nomi delle squadre disponibili
    const [teamsNames, setTeamsNames] = useState([]);
    // teams: nome della squadra per cui effettuare la ricerca
    const [teams, setTeams] = useState([]);

   
    //al caricamento del componente, richiesto l'elenco dei nomi delle squadre
    useEffect( () => {
        async function loadTeams() {
            await axios.get("https://nbascore.herokuapp.com/teams") 
                .then(function (response) {
                    const teamsNames = response.data.map(team => team.name);
                    setTeams(response.data); // elenco squadre
                    setTeamsNames(teamsNames); // elenco dei soli nomi delle squadre
                    props.setNavError(null);
                })
                .catch(function (error) {
                    props.setNavError(error);
                })

            props.setNavLoading(false);
        }

        loadTeams();

    }, []);  


    // funzione per la ricerca della classifica
    function searchStandingsPerTeam() {             
        // alert per avvertire che mancano dei dati di ricerca
        if(props.team === "") {
            alert("Yuo have to select a Team!");
        }

        // non deve chiamare l'API quando non è ancora stata selezionata la squadra
        else{
            props.setLoading("inProgress"); // <- dici che hai iniziato a caricare i dati
            props.setStandings([]);         // <- resetto l'elenco delle classifiche

            let standing = [];          // <- classifica della squadra in una certa stagione e conference
            let seasons = [];           // <- elenco delle stagioni disponibili

            //ottengo l'elenco delle stagioni disponibili.
            axios.get("https://nbascore.herokuapp.com/seasons") 
                .then(function (response) {
                    seasons = response.data; // <- ufficiale

                    //ottengo la conference della squadra di interesse nella i-esima stagione
                    let teamConference = teams.filter(function (el) {
                        return el.name === props.team;
                    });
                    teamConference = teamConference[0].conference;

                    // ottengo le classifiche della squadra
                    let count = 0;
                    seasons.forEach((currentSeason)=>{
                         // ottengo la classificazione in quella stagione e in quella conference
                         axios.get("https://nbascore.herokuapp.com/standings", { params: { season: currentSeason, conference: teamConference } }) 
                            .then(function (response) {
                                standing = response.data;
                                standing = standing.filter(function (el) {
                                    return el.teamName === props.team;
                                });

                                // se la classifica non è vuota allora la aggiungo alla lista
                                if(standing.length !== 0){
                                    props.setStandings(oldArray => [...oldArray, standing[0]]);
                                }
                                
                                // se col contatore sono arrivato alla fine dell'elenco delle stagioni, allora ho le classigiche per tutte le stagioni e quindi comunico che il caricamento dei dati è stato completato
                                if(count === (seasons.length-1)) {
                                    props.setLoading("complete"); // <- dici che hai terminato di caricare i dati
                                    props.setTableError(null);
                                }
                                else {
                                    count++;
                                }                                       
                            })
                            .catch(function (error) {
                                props.setLoading("complete"); // <- dici che hai terminato di caricare i dati
                                props.setTableError(error);
                            })
                    });                   
                })
                .catch(function (error) {
                    props.setLoading("complete"); // <- dici che hai terminato di caricare i dati
                    props.setTableError(error);
                })
        }
    }


    // se navError ha un valore diverso da null significa che la richiesta al server per ottenere le squadre è fallita
    if(props.navError){
        return (
            <div>
                Service temporarily unavailable. Unable to connect to the remote API. 
                <br />
                {props.navError.message}
            </div>
        );
    }
    // se navLoading ha valore true, ciò significa che la richiesta al server per ottenere l'elenco delle squadre è ancora in corso
    else if (props.navLoading) {
        return (null)
    }
    // si è pronti a visualizzare la schermata per la ricerca
    else {
        return (
            /* CODICE SCHERMATA PER LA RICERCA */
            <div className='search-menu'>
                <form className='select teamDropDownMenu'>
                    <select data-testid="teamToSearch" id="teamStandingsToSearch" onChange={e=>props.setTeam(e.target.value)}>
                        <option value="" selected disabled>Select Team</option>
                        {
                            teamsNames.map(team => (
                                <option value={team}>{team}</option>
                            )) 
                        }
                    </select>
                </form>
                <button className="search-button" onClick={searchStandingsPerTeam}>Search</button> 
            </div>
        )
    };    
}

export default StandingsPerTeamNavBar;