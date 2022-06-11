import React from 'react';

import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import WinningTeamView from '../components/formazioneVincente/WinningTeamView';
import WinningTeamSearch from '../components/formazioneVincente/WinningTeamSearch';
import WinningTeamTable from '../components/formazioneVincente/WinningTeamTable';

describe("Test rendering componenti WinningTeam", () => {

    let initialProps;

    beforeEach( () => {
        initialProps = {
            team: "",
            teams: [],
            teamError: null,
            season : 0,
            seasons: [], 
            seasonError: null,
            searchStarted: false,
            winningGames: [],
            winningGamesError: null,
            statistics: [],
            statisticsError: null,
            playerInfo: false,
            playerId: 0,
            setTeam: jest.fn(x => initialProps.team = x),
            setTeams: jest.fn(x => initialProps.teams = x),
            setTeamError: jest.fn(x => initialProps.teamError = x),
            setSeason: jest.fn(x => initialProps.season = x),
            setSeasons: jest.fn(x => initialProps.seasons = x),
            setSeasonError: jest.fn(x => initialProps.seasonError = x),
            setSearchStarted: jest.fn(x => initialProps.searchStarted = x),
            setWinningGames: jest.fn(x => initialProps.winningGames = x),
            setWinningGamesError: jest.fn(x => initialProps.winningGamesError = x),
            setStatistics: jest.fn(x => initialProps.statistics = x),
            setStatisticsError: jest.fn(x => initialProps.statisticsError = x),
            setPlayerInfo: jest.fn(x => initialProps.playerInfo = x),
            setPlayerId: jest.fn(x => initialProps.playerId = x),
        };
    });
  
    it("Rendering del componente WinningTeamView senza crashare", () => {
        shallow(<WinningTeamView{...initialProps}/>);
    });

    it("Rendering del componente WinningTeamSearch senza crashare", () => {
        shallow(<WinningTeamSearch{...initialProps}/>);
    });

    it("Rendering del componente WinningTeamTable senza crashare", () => {
        shallow(<WinningTeamTable{...initialProps}/>);
    });

    it('Rendering dei menù a tendina delle stagioni e delle squadre', () => {
        initialProps.seasons = [2019, 2020, 2021];
        initialProps.teams = ["Chicago Bulls", "Dallas Mavericks", "Phoenix Suns"];
    
        let wrapper = mount(<WinningTeamSearch{...initialProps}/>);
        let seasonOptions = wrapper.find('#seasonToSearch').find('option');
        let teamOptions = wrapper.find('#teamToSearch').find('option');
    
        expect(seasonOptions.length).toEqual(initialProps.seasons.length + 1);
    
        let i = 0;
        seasonOptions.forEach((node) => {
          const texts = node.text();
          if(i == 0) {
            expect(texts).toEqual('Select Season'); 
          }
          else {
            expect(texts).toEqual(initialProps.seasons[i-1].toString()); 
          }
          i++;
        });
    
        expect(teamOptions.length).toEqual(initialProps.teams.length + 1);

        i = 0;
        teamOptions.forEach((node) => {
          const texts = node.text();
          if(i == 0) {
            expect(texts).toEqual('Select Team'); 
          }
          else {
            expect(texts).toEqual("");
          }
          i++;
        });   
      });

      it("Rendering del bottone Ricerca senza crashare con controllo label", () => {
        const wrapper = mount(<WinningTeamSearch{...initialProps}/>);
        const label = wrapper.find("#search-button").text();
        expect(label).toEqual("Search");
      });

      it("Snapshot componente WinningTeamView", () => {
        const tree = shallow(<WinningTeamView{...initialProps}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
      });

      it("Snapshot componente WinningTeamSearch", () => {
        const tree = shallow(<WinningTeamSearch{...initialProps}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
      });

      it("Snapshot componente WinningTeamTable", () => {
        const tree = shallow(<WinningTeamTable{...initialProps}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
      });
});