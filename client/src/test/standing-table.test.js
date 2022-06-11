import { shallow, mount } from 'enzyme';

import StandingTable from '../components/visualizzazioneClassifiche/standing-table.js';
import React from 'react';


describe('Test StandingTable visualizes intermediate views', function () {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      navError: null,
      navLoading: true,
      season: 0,
      conference: "",
      loading: "toDo",
      standing: [],
      tableError: null,
      teamClicked: false,
      teamName: "",
      setTeamClicked: jest.fn(x => initialProps.teamClicked = x),
      setTeamName: jest.fn(x => initialProps.teamName = x)
    };
  });

  // Test visualizzazione se non riesco a ottenere seasons dal server (visualizzazione vuota)
  it('If Nav Component has an error or it is loading the seasons, then StandingTable should have a React.Fragment', function () {
    initialProps.navError = true;
    initialProps.navLoading = false;
    let wrapper = shallow(<StandingTable {...initialProps} />);
    expect(wrapper.equals(<React.Fragment></React.Fragment>)).toEqual(true);

    initialProps.navError = false;
    initialProps.navLoading = true;
    wrapper = shallow(<StandingTable {...initialProps} />);
    expect(wrapper.equals(<React.Fragment></React.Fragment>)).toEqual(true);
  });

  // Test visualizzazione vuota fino a quando l'utente non ha impostato tutti i parametri di ricerca o non ha avviato la ricerca.
  it('When Nav Component has terminated to load seasons, then StandingTable should show nothing until user starts search Standing', function () {
    initialProps.navError= false;
    initialProps.navLoading= false;
    initialProps.season = 0;
    initialProps.conference = "East";
    initialProps.loading = "";

    let wrapper = shallow(<StandingTable {...initialProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);

    initialProps.season = 2021;
    initialProps.conference = "";
    initialProps.loading = "";
    wrapper = shallow(<StandingTable {...initialProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);

    initialProps.season = 2021;
    initialProps.conference = "East";
    initialProps.loading = "toDo";
    wrapper = shallow(<StandingTable {...initialProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  // Test visualizzazione durante il caricamento della classifica
  it('When the loading of Standing is in progress, then StandingTable should show nothing until the loading is complete', function () {
    initialProps.navError= false;
    initialProps.navLoading= false;
    initialProps.season = 2021;
    initialProps.conference = "East";
    initialProps.loading = "inProgress";

    let wrapper = shallow(<StandingTable {...initialProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  })

  // Test visualizzazione messaggio di errore quando il risultato della ricerca contiene, appunto, un errore
  it('When the call to obtain Standing return an error, then StandingTable should show \' Error: messageOfError \' ', function () {
    initialProps.navError= false;
    initialProps.navLoading= false;
    initialProps.season = 2021;
    initialProps.conference = "East";
    initialProps.loading = "complete";
    initialProps.tableError = {
      message: 'Request failed with status code 403'
    };

    let wrapper = shallow(<StandingTable {...initialProps} />);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.text()).toEqual(' Error: Request failed with status code 403 ');
  })

  // Test visualizzazione quando si ottine una classifica vuota come risultato della ricerca
  it('When the call to obtain Standing return empty standing, then StandingTable should show \' Standing not available for these parameters \' ', function () {
    initialProps.navError= false;
    initialProps.navLoading= false;
    initialProps.season = 2021;
    initialProps.conference = "East";
    initialProps.loading = "complete";

    let wrapper = shallow(<StandingTable {...initialProps} />);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.text()).toEqual(' Standing not available for these parameters ');
  });

});


describe('Test StandingTable visualizes search results', function () {
  // standings per test 
  const testStandings = [
    { 
        id: 1,
        teamName: "washington wizards",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".45"
    },
    { 
        id: 2,
        teamName: "t2",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".50"
    },
    { 
        id: 3,
        teamName: "t3",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".45"
    },
    { 
        id: 4,
        teamName: "t3",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".45"
    },
    { 
        id: 5,
        teamName: "t3",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".45"
    },
    { 
        id: 6,
        teamName: "t3",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".45"
    },
    { 
        id: 7,
        teamName: "t3",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".45"
    },
    { 
        id: 8,
        teamName: "t3",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".45"
    },
    { 
        id: 9,
        teamName: "t3",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".45"
    },
    { 
        id: 10,
        teamName: "t3",
        gamesPlayed: 50,
        wonGames: 12,
        lostGames: 38,
        winPercentage: ".45"
    }
  ];

  const initialProps = {
    navError: false,
    navLoading: false,
    season: 2021,
    conference: "East",
    loading: "complete",
    standing: testStandings,
    tableError: null
  };

  // Test corretta visualizzazione della standing nella tabella
  it('The result standing must be show in a table ', function () {
    const wrapper = mount(<StandingTable {...initialProps} />);
    const table = wrapper.find('table#standingTable');
    expect(table).toHaveLength(1);
    
    let rows = wrapper.find('#standingTable').find('tbody').find('tr');
    expect(rows.length).toEqual(initialProps.standing.length);
    
    let i = 0;
    rows.forEach((node) => {
      expect(node.find('td').length).toEqual(6);

      const texts = node.find('td').map((node) => node.text());
      expect(texts).toEqual([
        "", //<- logo team non ha testo
        testStandings[i].teamName.toString(), 
        testStandings[i].gamesPlayed.toString(), 
        testStandings[i].wonGames.toString(), 
        testStandings[i].lostGames.toString(),
        (testStandings[i].winPercentage* 100).toFixed(2).toString()+'%'.toString()
      ]);
      i++;
    });

  });
});