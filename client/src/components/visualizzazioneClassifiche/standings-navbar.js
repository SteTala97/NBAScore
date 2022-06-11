import React, { useEffect } from 'react';
const axios = require('axios');


// sezione per selezionare la conference e la season su cui effettuare la ricerca della standing
const StandingsNavBar = (props) => {
    
    //al caricamento del componente, richiesto l'elenco delle seasons
    useEffect( () => {
        async function loadSeasons() {
            await axios.get("https://nbascore.herokuapp.com/seasons") 
                .then(function (response) {
                    props.setSeasons(response.data);
                    props.setNavError(null);
                })
                .catch(function (error) {
                    props.setNavError(error);
                })
        
            props.setNavLoading(false);
        }

        loadSeasons();
    }, []);
        

    // funzione per la ricerca della classifica
    function searchStanding() {             
        // alert per avvertire che mancano dei dati di ricerca
        if(props.season === 0) {
            alert("You have to select a Season!");
        }
        else if(props.conference === "") {
            alert("You have to select a Conference!");
        }

        // non deve chiamare l'API NBA quando non sono ancora state selezionate conference e season
        else{
            props.setLoading("inProgress"); // <- dici che hai iniziato a caricare i dati
            axios.get("https://nbascore.herokuapp.com/standings", { params: { season: props.season, conference: props.conference } })
                .then(function (response) {
                    props.setStanding(response.data);
                    props.setLoading("complete"); // <- dici che hai terminato di caricare i dati
                    props.setTableError(null);
                })
                .catch(function (error) {
                    props.setLoading("complete"); // <- dici che hai terminato di caricare i dati
                    props.setTableError(error);
                })
        }
    }
    // se navError ha un valore diverso da null significa che la richiesta al server per ottenere le stagioni è fallita
    if(props.navError){
        return (
            <div>
                Service temporarily unavailable. Unable to connect to the remote API. 
                <br />
                {props.navError.message}
            </div>
        );
    }
    // se navLoading ha valore true, ciò significa che la richiesta al server per ottenere l'elenco delle stagioni disponibili è ancora in corso
    else if (props.navLoading) {
        return (null)
    }
    // si è pronti a visualizzare la schermata per la ricerca
    else {
        return (
            /* CODICE SCHERMATA PER LA RICERCA */
            <div className='search-menu'>
                    <form className='select'>
                        <select data-testid="seasonToSearch" id="seasonToSearch" onChange={e=>props.setSeason(e.target.value)}>
                            <option value="" selected disabled>Select Season</option>
                            {
                                props.seasons.map(season => (
                                    <option value={season}>{season}</option>
                                )) 
                            }
                        </select>
                    </form>
                    <form className='select'>
                        <select data-testid="conferenceToSearch" id="conferenceToSearch" onChange={e => props.setConference(e.target.value)}>
                            <option value="" selected disabled>Select Conference</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                        </select>
                    </form>
            <button className="search-button" onClick={searchStanding}>Search</button> 
            </div>
        )
    };    
}

export default StandingsNavBar;