import React from 'react';

import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

import GamesPerTeam from '../components/partitePerSquadra/GamesPerTeam';
import GamesPerTeamMatch from '../components/partitePerSquadra/GamesPerTeamMatch';
import GamesPerTeamTable from '../components/partitePerSquadra/GamesPerTeamTable';
import GamesPerTeamNavbar from '../components/partitePerSquadra/GamesPerTeamNavbar';


const testGames = [
    { 
        id: 1,
        typeGame: 'Finished',
        currentPeriods: 4,
        totalPeriods: 4,
        linescoreHome: ["30", "20", "35", "22"],
        linescoreVisitors: ["36", "25", "36", "24"],
        teamScoreHome: 100,
        teamScoreVisitors: 110,
        teamNameHome: 'Dallas Mavericks',
        teamLogoHome: 'https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Mavericks_de_Dallas_logo.svg/150px-Mavericks_de_Dallas_logo.svg.png',
        teamNameVisitors: 'Phoenix Suns',
        teamLogoVisitors: 'https://upload.wikimedia.org/wikipedia/fr/5/56/Phoenix_Suns_2013.png',
    },
    { 
        id: 2,
        typeGame: 'Scheduled',
        currentPeriods: 0,
        totalPeriods: 4,
        linescoreHome: [],
        linescoreVisitors: [],
        teamScoreHome: null,
        teamScoreVisitors: null,
        teamNameHome: 'Golden State Warriors',
        teamLogoHome: 'https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Warriors_de_Golden_State_logo.svg/1200px-Warriors_de_Golden_State_logo.svg.png',
        teamNameVisitors: 'Boston Celtics',
        teamLogoVisitors: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/65/Celtics_de_Boston_logo.svg/1024px-Celtics_de_Boston_logo.svg.png',
    },
    { 
        id: 3,
        typeGame: 'In Play',
        currentPeriods: 1,
        totalPeriods: 4,
        linescoreHome: ["15", "0", "0", "0"],
        linescoreVisitors: ["21", "0", "0", "0"],
        teamScoreHome: 15,
        teamScoreVisitors: 21,
        teamNameHome: 'Philadelphia 76ers',
        teamLogoHome: 'https://upload.wikimedia.org/wikipedia/fr/4/48/76ers_2016.png',
        teamNameVisitors: 'Miami Heat',
        teamLogoVisitors: 'https://upload.wikimedia.org/wikipedia/fr/thumb/1/1c/Miami_Heat_-_Logo.svg/1200px-Miami_Heat_-_Logo.svg.png',
    }
];

const testTeams = [ "Dallas Mavericks", "Phoenix Suns", "Golden State Warriors", "Boston Celtics", "Philadelphia 76ers", "Miami Heat"];
const testSeasons = [ "2015", "2016", "2017", "2018", "2019", "2020", "2021",];
const testTeam = "Dallas Mavericks";
const testSeason = "2021";
const testSearchStarted = true;
const testGamesError = false;
const testTeamError = false;
const testSeasonError = false;


describe("Rendering single components", () => {
  
    it("Renders GamesPerTeam component without crashing", () => {
        shallow(<GamesPerTeam />);
    });

    it("Renders GamesPerTeamMatch component without crashing for 'finished' game", () => {
        shallow(<GamesPerTeamMatch data={testGames[0]} />);
    });
    it("Renders GamesPerTeamMatch component without crashing for 'scheduled' game", () => {
        shallow(<GamesPerTeamMatch data={testGames[1]} />);
    });
    it("Renders GamesPerTeamMatch component without crashing for 'in play' game", () => {
        shallow(<GamesPerTeamMatch data={testGames[2]} />);
    });

    it("Renders GamesPerTeamTable component without crashing", () => {
        shallow(<GamesPerTeamTable 
                    teams={testTeams} 
                    seasons={testSeasons} 
                    searchStarted={testSearchStarted} 
                    gamesError={testGamesError} 
                    games={testGames}
                />);
    });

    it("Renders GamesPerTeamNavbar component without crashing", () => {
        shallow(<GamesPerTeamNavbar 
                    teams={testTeams} 
                    seasons={testSeasons} 
                    team={testTeam} 
                    season={testSeason} 
                    teamError={testTeamError} 
                    seasonError={testSeasonError}
                />);
    });

});

// Test that the rendering does not change when the same input data is given
describe("Snapshots testing", () => {

    it("GamesPerTeam renders correctly", () => {
        const tree = shallow(<GamesPerTeam />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("GamesPerTeamMatch renders correctly for 'finished' game", () => {
        const tree = shallow(<GamesPerTeamMatch data={testGames[0]} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("GamesPerTeamMatch renders correctly for 'scheduled' game", () => {
        const tree = shallow(<GamesPerTeamMatch data={testGames[1]} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("GamesPerTeamMatch renders correctly for 'in play' game", () => {
        const tree = shallow(<GamesPerTeamMatch data={testGames[2]} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("GamesPerTeamTable renders correctly", () => {
        const tree = shallow(<GamesPerTeamTable 
                                teams={testTeams} 
                                seasons={testSeasons} 
                                searchStarted={testSearchStarted} 
                                gamesError={testGamesError} 
                                games={testGames}
                            />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("GamesPerTeamNavbar renders correctly", () => {
        const tree = shallow(<GamesPerTeamNavbar 
                                teams={testTeams} 
                                seasons={testSeasons} 
                                team={testTeam} 
                                season={testSeason} 
                                teamError={testTeamError} 
                                seasonError={testSeasonError}
                            />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

})
