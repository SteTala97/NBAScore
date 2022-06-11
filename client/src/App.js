import React from 'react';
import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";


import './App.css';

import GamesPerDateView from './components/ricercaPartitePerData/GamesPerDateView.js';
import Live from './components/visualizzazioneInLive/Live.js';
import StandingView from './components/visualizzazioneClassifiche/standing-view.js';
import GamesPerTeam from './components/partitePerSquadra/GamesPerTeam.js';
import SearchPlayer from './components/ricercaGiocatorePerNome/SearchPlayer.js';
import SearchTeam from './components/ricercaSquadraPerNome/SearchTeam.js';
import StandingsPerTeamView from './components/visualizzazioneClassifichePerSquadra/StandingsPerTeamView.js';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import WinningTeamView from './components/formazioneVincente/WinningTeamView.js';

const theme = createTheme({
  typography: {
    fontFamily: [
      "system-ui",
      "-apple-system",
      "system-ui",
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(",")
  }
});

function App() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  // teamClicked e teamName servono per gestire la visualizzazione di TeamInfo nelle varie altre componenti 
  const [teamClicked, setTeamClicked] = useState(false);
  const [teamName, setTeamName] = useState("");


  return (

    
    <ThemeProvider theme={theme}>
      <div>
      <Router>
      <div className='div-nav'>
      <nav className="navigation">
      <a href="/" className="brand-name">
        NBAScore
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>                
            <Link onClick={() => {setIsNavExpanded(false); }} to="/liveReload">Live</Link>
          </li>
          <li>
            <Link onClick={() => {setIsNavExpanded(false); }} to="/standingsReload">Standings</Link>
          </li>
          <li>
            <Link onClick={() => {setIsNavExpanded(false); }} to="/standingsPerTeamReload">Standings Per Team</Link>
          </li>
          <li>
            <Link onClick={() => {setIsNavExpanded(false); }} to="/gamesPerDateReload">Games Per Date</Link>
          </li>
          <li>
            <Link onClick={() => {setIsNavExpanded(false); }} to="/gamesPerTeamReload">Games Per Team And Season</Link>
          </li>
          <li>
            <Link onClick={() => {setIsNavExpanded(false); }} to="/searchPlayerReload">Search Player</Link>
          </li>
          <li>
            <Link onClick={() => {setIsNavExpanded(false); }} to="/searchTeamReload">Search Team</Link>
          </li>
          <li>
            <Link onClick={() => {setIsNavExpanded(false); }} to="/mostWinningFormationReload">Most Winning Formation</Link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
    <div>
      <Routes>
          <Route path="/" element={ <Navigate replace to="/live"/> } />  
          <Route path="/liveReload" element={ <Navigate replace to="/live"/> } />
          <Route path="/standingsReload" element={ <Navigate replace to="/standings"/> } />
          <Route path="/standingsPerTeamReload" element={ <Navigate replace to="/standingsPerTeam"/> } />
          <Route path="/gamesPerDateReload" element={ <Navigate replace to="/gamesPerDate"/> } />
          <Route path="/gamesPerTeamReload" element={ <Navigate replace to="/gamesPerTeam"/> } />  
          <Route path="/searchPlayerReload" element={ <Navigate replace to="/searchPlayer"/> } />
          <Route path="/searchTeamReload" element={ <Navigate replace to="/searchTeam"/> } />
          <Route path="/mostWinningFormationReload" element={ <Navigate replace to="/mostWinningFormation"/> } />
          <Route path="/live" element={ <Live teamClicked={teamClicked} setTeamClicked={setTeamClicked} teamName = {teamName} setTeamName={setTeamName} /> } />        
          <Route path="/standings" element={ <StandingView teamClicked={teamClicked} setTeamClicked={setTeamClicked} teamName = {teamName} setTeamName={setTeamName} /> } />         
          <Route path="/standingsPerTeam" element={ <StandingsPerTeamView teamClicked={teamClicked} setTeamClicked={setTeamClicked} teamName = {teamName} setTeamName={setTeamName} /> } />        
          <Route path="/gamesPerDate" element={ <GamesPerDateView teamClicked={teamClicked} setTeamClicked={setTeamClicked} teamName = {teamName} setTeamName={setTeamName} /> } />
          <Route path="/gamesPerTeam" element={ <GamesPerTeam teamClicked={teamClicked} setTeamClicked={setTeamClicked} teamName = {teamName} setTeamName={setTeamName} /> } />  
          <Route path="/searchPlayer" element={ <SearchPlayer teamClicked={teamClicked} setTeamClicked={setTeamClicked} teamName = {teamName} setTeamName={setTeamName} /> } />    
          <Route path="/searchTeam" element={ <SearchTeam /> } />
          <Route path="/mostWinningFormation" element={ <WinningTeamView/> } />  
      </Routes>
    </div>
    </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;