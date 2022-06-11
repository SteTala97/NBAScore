import axios from 'axios';
import { shallow, mount } from 'enzyme';
import { render, act } from '@testing-library/react';
import React from 'react';

import StandingsPerTeamView from '../components/visualizzazioneClassifichePerSquadra/StandingsPerTeamView';
import StandingsPerTeamNavBar from '../components/visualizzazioneClassifichePerSquadra/StandingsPerTeamNavBar';
import StandingsPerTeamTable from '../components/visualizzazioneClassifichePerSquadra/StandingsPerTeamTable';


describe('Test StandingView visualization', function () {
  let initialProps;

  beforeEach( () => {      
    initialProps = {
      teamClicked: false, 
      teamName: "",
      setTeamClicked: jest.fn(x => initialProps.teamClicked = x),
      setTeamName: jest.fn(x => initialProps.teamName = x)
    };
  });

  // Test visualizzazione StandingsPerTeamView (verifica che vengano renderizzati StandingsPerTeamNavBar e StandingsPerTeamTable)
  it('Test StandingPerTeamView is properly rendered', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<StandingsPerTeamView 
                            teamClicked={initialProps.teamClicked} 
                            setTeamClicked={initialProps.setTeamClicked} 
                            teamName = {initialProps.teamName} 
                            setTeamName={initialProps.setTeamName}/>);
    });

    expect(wrapper.find('StandingsPerTeamNavBar')).toHaveLength(1);
    expect(wrapper.find('StandingsPerTeamTable')).toHaveLength(1);
  });

  it('Test StandingPerTeamView is properly rendered when request TeamInfo', async () => {

    const Fake_Team_Info_Body = {
      "teamId": 20,
      "teamLogo": "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1c/Miami_Heat_-_Logo.svg/1200px-Miami_Heat_-_Logo.svg.png",
      "teamName": "Miami Heat",
      "nickname": "Heat",
      "city": "Miami",
      "conference": "East",
      "division": "Southeast",
      "players": [
        {
            "playerId": 724,
            "playerName": "Bam Adebayo"
        },
        {
            "playerId": 2201,
            "playerName": "Mychal Mulder"
        },
        {
            "playerId": 2242,
            "playerName": "Caleb Martin"
        },
        {
            "playerId": 1018,
            "playerName": "Duncan Robinson"
        },
        {
            "playerId": 1775,
            "playerName": "Gabe Vincent"
        },
        {
            "playerId": 1815,
            "playerName": "Haywood Highsmith"
        },
        {
            "playerId": 2077,
            "playerName": "Zylan Cheatham"
        },
        {
            "playerId": 2051,
            "playerName": "Max Strus"
        },
        {
            "playerId": 1866,
            "playerName": "Tyler Herro"
        },
        {
            "playerId": 1884,
            "playerName": "KZ Okpala"
        },
        {
            "playerId": 1861,
            "playerName": "Kyle Guy"
        },
        {
            "playerId": 1917,
            "playerName": "Aric Holman"
        },
        {
            "playerId": 2391,
            "playerName": "Chris Silva"
        },
        {
            "playerId": 2785,
            "playerName": "Omer Yurtseven"
        },
        {
            "playerId": 2880,
            "playerName": "Marcus Garrett"
        },
        {
            "playerId": 2922,
            "playerName": "DJ Stewart"
        },
        {
            "playerId": 2917,
            "playerName": "Javonte Smart"
        },
        {
            "playerId": 2884,
            "playerName": "DeJon Jarreau"
        },
        {
            "playerId": 2901,
            "playerName": "RJ Nembhard Jr."
        },
        {
            "playerId": 327,
            "playerName": "Kyle Lowry"
        },
        {
            "playerId": 520,
            "playerName": "P.J. Tucker"
        },
        {
            "playerId": 374,
            "playerName": "Markieff Morris"
        },
        {
            "playerId": 86,
            "playerName": "Jimmy Butler"
        },
        {
            "playerId": 131,
            "playerName": "Dewayne Dedmon"
        },
        {
            "playerId": 403,
            "playerName": "Victor Oladipo"
        },
        {
            "playerId": 496,
            "playerName": "Nik Stauskas"
        },
        {
            "playerId": 225,
            "playerName": "Udonis Haslem"
        }
      ]
        },
        Fake_Seasons = [2019, 2020, 2021];           
         

    const ApiGetSpy = jest.spyOn(axios, 'get')
                        .mockResolvedValueOnce({ status: 200, data: Fake_Seasons })
                        .mockResolvedValueOnce({ status: 200, data: Fake_Team_Info_Body });


    initialProps.teamClicked= true;
    initialProps.teamName= "Miami Heat";

    let wrapper;
    await act(async () => {
      wrapper = mount(<StandingsPerTeamView 
                            teamClicked={initialProps.teamClicked} 
                            setTeamClicked={initialProps.setTeamClicked} 
                            teamName = {initialProps.teamName} 
                            setTeamName={initialProps.setTeamName}/>);
      wrapper.update();
    });

    expect(wrapper.find('TeamInfo')).toHaveLength(1);
    
    ApiGetSpy.mockRestore();
    ApiGetSpy.mockClear();
  });
});


describe('Testing main functions of StandingsPerTeamNavBar component',() => {

    let initialProps;
  
    beforeEach( () => {   
        initialProps = {
            team: "",
            setTeam: jest.fn(x => initialProps.team = x),
            teams: [],
            setTeams: jest.fn(x => initialProps.teams = x),
            standings: [],
            setStandings: jest.fn(x => initialProps.standings = x),
            navError: null,
            setNavError: jest.fn(x => initialProps.navError = x),
            loading: "toDo",
            setLoading: jest.fn(x => initialProps.loading = x), 
            tableError: null,
            setTableError: jest.fn(x => initialProps.tableError = x),
            navLoading: true,
            setNavLoading: jest.fn(x => initialProps.navLoading = x)
        };
    });

    
  // test ottenimento lista delle squadre
  it('should obtain teams by axios Get teams API call', async () => {
    const Fake_Teams = [{
        "id": 1,
        "name": "Miami Heat",
        "conference": "East",
        "nbaFranchise": true
    },
    {
        "id": 2,
        "name": "Toronto Raptors",
        "conference": "East",
        "nbaFranchise": true
    },
    {
        "id": 4,
        "name": "Boston Celtics",
        "conference": "East",
        "nbaFranchise": true
    },
    {
        "id": 14,
        "name": "Houston Rockets",
        "conference": "West",
        "nbaFranchise": true
    }];
    
    const ApiGetTeamsSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: Fake_Teams });
    let component;
    await act(async () => {
        component = render(<StandingsPerTeamNavBar {...initialProps}/>);
    });
      
    expect(initialProps.setNavError).toHaveBeenCalledWith(null);
    expect(initialProps.navError).toEqual(null);

    expect(initialProps.setNavLoading).toHaveBeenCalledWith(false);
    expect(initialProps.navLoading).toEqual(false);

    ApiGetTeamsSpy.mockRestore();
    ApiGetTeamsSpy.mockClear();
  });

  // test API Get teams ritorna un errore
  it('axios get Teams should be rejected', async () => {
    const Fake_Error = 'Request failed with status code 403';

    const ApiGetTeamsSpy = jest.spyOn(axios, 'get').mockRejectedValueOnce({ message: Fake_Error });
    let component;
    await act(async () => {
      component = render(<StandingsPerTeamNavBar {...initialProps} />);
    });
      
    expect(initialProps.setNavError).toHaveBeenCalledWith({ message: Fake_Error });
    expect(initialProps.navError.message).toEqual(Fake_Error);

    expect(initialProps.setNavLoading).toHaveBeenCalledWith(false);
    expect(initialProps.navLoading).toEqual(false);

    ApiGetTeamsSpy.mockRestore();
    ApiGetTeamsSpy.mockClear();
   });


  // Test visualizzazione 'Service temporarily unavailable. Unable to connect to the remote API.'
  it('If the API call fails, then StandingsPerTeamNavBar should show \'Service temporarily unavailable. Unable to connect to the remote API.\' and the relative error message', async() => {
    const Fake_Error = 'Request failed with status code 403';
    initialProps.navError= {message: Fake_Error};

    let wrapper;
    await act(async () => {
        wrapper = mount(<StandingsPerTeamNavBar {...initialProps}> </StandingsPerTeamNavBar>);
    });

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.text()).toEqual('Service temporarily unavailable. Unable to connect to the remote API.'.concat(Fake_Error));
    expect(wrapper.find('br')).toHaveLength(1);    
  });

  // Test attesa visualizzazione 
  it('If the call to the API Get Teams is in progess, then StandingTable should nothing', () => {
    let wrapper = shallow(<StandingsPerTeamNavBar {...initialProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });


  // Test visualizzazione sezione di ricerca (drop-down menu e bottone di ricerca)
  it('If the API call success then StandingsPerTeamNavBar should show one drop down menu to choose the team for the research and a button to execute the research', async() => {
    initialProps.navLoading= false;
    const Fake_Teams = [{
        "id": 1,
        "name": "Miami Heat",
        "conference": "East",
        "nbaFranchise": true
    },
    {
        "id": 2,
        "name": "Toronto Raptors",
        "conference": "East",
        "nbaFranchise": true
    },
    {
        "id": 4,
        "name": "Boston Celtics",
        "conference": "East",
        "nbaFranchise": true
    },
    {
        "id": 14,
        "name": "Houston Rockets",
        "conference": "West",
        "nbaFranchise": true
    }];
    
    const ApiGetTeamsSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: Fake_Teams });
    
    let wrapper;
    await act(async () => {
        wrapper = mount(<StandingsPerTeamNavBar {...initialProps} />);
    });

    await act(async () => {
        wrapper.update();
    });

    let teamOptions = wrapper.find('#teamStandingsToSearch').find('option');
    // test Team drop down menu
    expect(teamOptions.length).toEqual(Fake_Teams.length + 1); // +1 perchè oltre alle stagione c'è anche l'opzione 'Select Team' (non selezionabile)
    let i = 0;
    teamOptions.forEach((node) => {
      const texts = node.text();

      if(i == 0) {
        expect(texts).toEqual('Select Team'); 
      }
      else {
        expect(texts).toEqual(Fake_Teams[i-1].name); 
      }
      i++;
    });

    // test Search button
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('Search');  
    
    ApiGetTeamsSpy.mockRestore();
    ApiGetTeamsSpy.mockClear();  
  });

});


describe('Testing main functions of StandingsPerTeamTable component',() => {

    let initialProps;
  
    beforeEach( () => {   
        initialProps = {
            team: "",
            standings: [],
            navError: null,
            loading: "toDo",
            tableError: null,
            navLoading: true,
            teamClicked: false,
            teamName: "",
            setTeamClicked: jest.fn(x => initialProps.teamClicked = x),
            setTeamName: jest.fn(x => initialProps.teamName = x)
        };
    });


    // Test visualizzazione se non riesco a ottenere teams dal server (visualizzazione vuota)
    it('If Nav Component has an error or it is loading the teams then StandingsPerTeamTable should have a React.Fragment', function () {
        initialProps.navError = true;
        initialProps.navLoading = false;
        let wrapper = shallow(<StandingsPerTeamTable {...initialProps} />);
        expect(wrapper.equals(<React.Fragment></React.Fragment>)).toEqual(true);

        initialProps.navError = false;
        initialProps.navLoading = true;
        wrapper = shallow(<StandingsPerTeamTable {...initialProps} />);
        expect(wrapper.equals(<React.Fragment></React.Fragment>)).toEqual(true);
    });


    
  // Test visualizzazione vuota fino a quando l'utente non ha impostato tutti i parametri di ricerca o non ha avviato la ricerca.
  it('When Nav Component has terminated to load teams then StandingsPerTeamTable should show nothing until user starts search Standings', function () {
    initialProps.navError= false;
    initialProps.navLoading= false;
    initialProps.team = "";

    let wrapper = shallow(<StandingsPerTeamTable {...initialProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);

    initialProps.team = "Miami Heat";
    wrapper = shallow(<StandingsPerTeamTable {...initialProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  // Test visualizzazione vuota durante il caricamento delle classifiche (ossia durante il caricamento del risultato della ricerca)
  it('When the loading of Standings is in progess then StandingsPerTeamTable should show nothing until the loading is complete', function () {
    initialProps.navError= false;
    initialProps.navLoading= false;
    initialProps.team = "Miami Heat";
    initialProps.loading = "inProgress";

    let wrapper = shallow(<StandingsPerTeamTable {...initialProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  })
  
  // Test visualizzazione messaggio di errore quando il risultato della ricerca contiene, appunto, un messaggio di errore
  it('When the call to obtain Standings return an error then StandingsPerTeamTable should show \' Error: messageOfError \' ', function () {
    initialProps.navError= false;
    initialProps.navLoading= false;
    initialProps.team = "Miami Heat";
    initialProps.loading = "complete";
    initialProps.tableError = {
      message: 'Request failed with status code 403'
    };

    let wrapper = shallow(<StandingsPerTeamTable {...initialProps} />);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.text()).toEqual(' Error: Request failed with status code 403 ');
  });

  // Test visualizzazione quando non si ottiene alcuna classifica come risultato della ricerca
  it('When the call to obtain Standings return empty standings then StandingsPerTeamTable should show \' Standings not available for this Team \' ', function () {
    initialProps.navError= false;
    initialProps.navLoading= false;
    initialProps.team = "Miami Heat";
    initialProps.loading = "complete";

    let wrapper = shallow(<StandingsPerTeamTable {...initialProps} />);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.text()).toEqual(' Standings not available for this Team ');
  });

  it('Search results must be show in a table except teamLogo, teamName and conference that are displayed separately', function () {
    const teamStandings = [
        {
            conference: "East",
            gamesPlayed: 82,
            id: 7,
            lostGames: 63,
            positionInStanding: 14,
            season: 2018,
            teamLogo: "https://upload.wikimedia.org/wikipedia/fr/thumb/0/06/Cavs_de_Cleveland_logo_2017.png/150px-Cavs_de_Cleveland_logo_2017.png",
            teamName: "Cleveland Cavaliers",
            winPercentage: ".232",
            wonGames: 19,
        },
        {
            conference: "East",
            gamesPlayed: 65,
            id: 7,
            lostGames: 46,
            positionInStanding: 15,
            season: 2019,
            teamLogo: "https://upload.wikimedia.org/wikipedia/fr/thumb/0/06/Cavs_de_Cleveland_logo_2017.png/150px-Cavs_de_Cleveland_logo_2017.png",
            teamName: "Cleveland Cavaliers",
            winPercentage: ".292",
            wonGames: 19
        },
        {
            conference: "East",
            gamesPlayed: 72,
            id: 7,
            lostGames: 50,
            positionInStanding: 13,
            season: 2020,
            teamLogo: "https://upload.wikimedia.org/wikipedia/fr/thumb/0/06/Cavs_de_Cleveland_logo_2017.png/150px-Cavs_de_Cleveland_logo_2017.png",
            teamName: "Cleveland Cavaliers",
            winPercentage: ".306",
            wonGames: 22
        },
        {
            conference: "East",
            gamesPlayed: 82,
            id: 7,
            lostGames: 38,
            positionInStanding: 8,
            season: 2021,
            teamLogo: "https://upload.wikimedia.org/wikipedia/fr/thumb/0/06/Cavs_de_Cleveland_logo_2017.png/150px-Cavs_de_Cleveland_logo_2017.png",
            teamName: "Cleveland Cavaliers",
            winPercentage: ".537",
            wonGames: 44
        }
    ];

    initialProps.navError= false;
    initialProps.navLoading= false;
    initialProps.team= "Cleveland Cavaliers";
    initialProps.loading= "complete";
    initialProps.standings= teamStandings;
    initialProps.tableError= null;

    const wrapper = mount(<StandingsPerTeamTable {...initialProps} />);
    // nome e logo della squadra
    const titleBox = wrapper.childAt(0);
    const img = titleBox.find('div').find('img');
    expect(img).toHaveLength(1); 
    expect(img.prop("src")).toEqual(teamStandings[0].teamLogo);
    const teamName = titleBox.find('div').find('h1');
    expect(teamName).toHaveLength(1); 
    expect(teamName.text()).toEqual(teamStandings[0].teamName);
    // conference della squadra
    const conferenceBox = wrapper.childAt(1);
    const conference = conferenceBox.find('div').find('h2');
    expect(conference).toHaveLength(1); 
    expect(conference.text()).toEqual('Conference: '.concat(teamStandings[0].conference));
        
    //tabella col resto dei risultati
    const table = wrapper.find('table#standingTable');
    expect(table).toHaveLength(1);
    
    let rows = wrapper.find('#standingTable').find('tbody').find('tr');
    expect(rows.length).toEqual(initialProps.standings.length); 
    let i = 0;
    rows.forEach((node) => {
      expect(node.find('td').length).toEqual(Object.keys(teamStandings[i]).length - 4); // non conto id, teamName, logo e conference

      const texts = node.find('td').map((node) => node.text());
      expect(texts).toEqual([
        teamStandings[i].season.toString(), 
        teamStandings[i].positionInStanding.toString(), 
        teamStandings[i].gamesPlayed.toString(), 
        teamStandings[i].wonGames.toString(), 
        teamStandings[i].lostGames.toString(),
        (teamStandings[i].winPercentage* 100).toFixed(2).toString()+'%'.toString()
      ]);
      i++;
    });

  });

});