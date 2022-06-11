import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import React from 'react';
import axios from 'axios';
import InputName from '../components/ricercaSquadraPerNome/InputName';
import SearchTeam from '../components/ricercaSquadraPerNome/SearchTeam';
import TeamsTable from '../components/ricercaSquadraPerNome/TeamsTable';

describe("Test rendering componenti SearchTeam", () => {
    let initialPropsInput;
    let initialPropsTable;

    const fakeTeams = [
        {
            "id": 1,
            "name": "Atlanta Hawks",
            "nickname": "Hawks",
            "code": "ATL",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png",
            "city": "Atlanta"
        },
        {
            "id": 2,
            "name": "Boston Celtics",
            "nickname": "Celtics",
            "code": "BOS",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/6/65/Celtics_de_Boston_logo.svg/1024px-Celtics_de_Boston_logo.svg.png",
            "city": "Boston"
        },
        {
            "id": 3,
            "name": "Brisbane Bullets",
            "nickname": "Bullets",
            "code": "BNE",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1b/Brisbane_Bullets_1992.png/130px-Brisbane_Bullets_1992.png",
            "city": "Brisbane"
        },
        {
            "id": 4,
            "name": "Brooklyn Nets",
            "nickname": "Nets",
            "code": "BKN",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/130px-Brooklyn_Nets_newlogo.svg.png",
            "city": "Brooklyn"
        },
        {
            "id": 5,
            "name": "Charlotte Hornets",
            "nickname": "Hornets",
            "code": "CHA",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/f/f3/Hornets_de_Charlotte_logo.svg/1200px-Hornets_de_Charlotte_logo.svg.png",
            "city": "Charlotte"
        },
        {
            "id": 6,
            "name": "Chicago Bulls",
            "nickname": "Bulls",
            "code": "CHI",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d1/Bulls_de_Chicago_logo.svg/1200px-Bulls_de_Chicago_logo.svg.png",
            "city": "Chicago"
        },
        {
            "id": 7,
            "name": "Cleveland Cavaliers",
            "nickname": "Cavaliers",
            "code": "CLE",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/0/06/Cavs_de_Cleveland_logo_2017.png/150px-Cavs_de_Cleveland_logo_2017.png",
            "city": "Cleveland"
        },
        {
            "id": 8,
            "name": "Dallas Mavericks",
            "nickname": "Mavericks",
            "code": "DAL",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Mavericks_de_Dallas_logo.svg/150px-Mavericks_de_Dallas_logo.svg.png",
            "city": "Dallas"
        },
        {
            "id": 9,
            "name": "Denver Nuggets",
            "nickname": "Nuggets",
            "code": "DEN",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/3/35/Nuggets_de_Denver_2018.png/180px-Nuggets_de_Denver_2018.png",
            "city": "Denver"
        },
        {
            "id": 10,
            "name": "Detroit Pistons",
            "nickname": "Pistons",
            "code": "DET",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Detroit_Pistons_primary_logo_2017.png/150px-Detroit_Pistons_primary_logo_2017.png",
            "city": "Detroit"
        },
        {
            "id": 11,
            "name": "Golden State Warriors",
            "nickname": "Warriors",
            "code": "GSW",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Warriors_de_Golden_State_logo.svg/1200px-Warriors_de_Golden_State_logo.svg.png",
            "city": "Golden State"
        },
        {
            "id": 12,
            "name": "Guangzhou Long-Lions",
            "nickname": "Long-Lions",
            "code": "GUA",
            "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Guangzhou_Long-Lions_logo.png/220px-Guangzhou_Long-Lions_logo.png",
            "city": "Guangzhou"
        },
        {
            "id": 13,
            "name": "Haifa Maccabi Haifa",
            "nickname": "Maccabi Haifa",
            "code": "MAC",
            "logo": "https://upload.wikimedia.org/wikipedia/en/4/4c/Maccabi_Haifa_B.C_logo.png",
            "city": "Haifa"
        },
        {
            "id": 14,
            "name": "Houston Rockets",
            "nickname": "Rockets",
            "code": "HOU",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Houston_Rockets_logo_2003.png/330px-Houston_Rockets_logo_2003.png",
            "city": "Houston"
        },
        {
            "id": 15,
            "name": "Indiana Pacers",
            "nickname": "Pacers",
            "code": "IND",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/c/cf/Pacers_de_l%27Indiana_logo.svg/1180px-Pacers_de_l%27Indiana_logo.svg.png",
            "city": "Indiana"
        },
        {
            "id": 16,
            "name": "LA Clippers",
            "nickname": "Clippers",
            "code": "LAC",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/d/d6/Los_Angeles_Clippers_logo_2010.png",
            "city": "LA"
        },
        {
            "id": 17,
            "name": "Los Angeles Lakers",
            "nickname": "Lakers",
            "code": "LAL",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/220px-Los_Angeles_Lakers_logo.svg.png",
            "city": "Los Angeles"
        },
        {
            "id": 18,
            "name": "Melbourne United",
            "nickname": "United",
            "code": "MEL",
            "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Melbourne_United_logo.svg/220px-Melbourne_United_logo.svg.png",
            "city": "Melbourne"
        },
        {
            "id": 19,
            "name": "Memphis Grizzlies",
            "nickname": "Grizzlies",
            "code": "MEM",
            "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Memphis_Grizzlies.svg/1200px-Memphis_Grizzlies.svg.png",
            "city": "Memphis"
        },
        {
            "id": 20,
            "name": "Miami Heat",
            "nickname": "Heat",
            "code": "MIA",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1c/Miami_Heat_-_Logo.svg/1200px-Miami_Heat_-_Logo.svg.png",
            "city": "Miami"
        },
        {
            "id": 21,
            "name": "Milwaukee Bucks",
            "nickname": "Bucks",
            "code": "MIL",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/3/34/Bucks2015.png",
            "city": "Milwaukee"
        },
        {
            "id": 22,
            "name": "Minnesota Timberwolves",
            "nickname": "Timberwolves",
            "code": "MIN",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d9/Timberwolves_du_Minnesota_logo_2017.png/200px-Timberwolves_du_Minnesota_logo_2017.png",
            "city": "Minnesota"
        },
        {
            "id": 23,
            "name": "New Orleans Pelicans",
            "nickname": "Pelicans",
            "code": "NOP",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/2/21/New_Orleans_Pelicans.png/200px-New_Orleans_Pelicans.png",
            "city": "New Orleans"
        },
        {
            "id": 24,
            "name": "New York Knicks",
            "nickname": "Knicks",
            "code": "NYK",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/d/dc/NY_Knicks_Logo_2011.png",
            "city": "New York"
        },
        {
            "id": 25,
            "name": "Oklahoma City Thunder",
            "nickname": "Thunder",
            "code": "OKC",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Thunder_d%27Oklahoma_City_logo.svg/1200px-Thunder_d%27Oklahoma_City_logo.svg.png",
            "city": "Oklahoma City"
        },
        {
            "id": 26,
            "name": "Orlando Magic",
            "nickname": "Magic",
            "code": "ORL",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/b/bd/Orlando_Magic_logo_2010.png",
            "city": "Orlando"
        },
        {
            "id": 27,
            "name": "Philadelphia 76ers",
            "nickname": "76ers",
            "code": "PHI",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/4/48/76ers_2016.png",
            "city": "Philadelphia"
        },
        {
            "id": 28,
            "name": "Phoenix Suns",
            "nickname": "Suns",
            "code": "PHX",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/5/56/Phoenix_Suns_2013.png",
            "city": "Phoenix"
        },
        {
            "id": 29,
            "name": "Portland Trail Blazers",
            "nickname": "Trail Blazers",
            "code": "POR",
            "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Portland_Trail_Blazers_logo.svg/1200px-Portland_Trail_Blazers_logo.svg.png",
            "city": "Portland"
        },
        {
            "id": 30,
            "name": "Sacramento Kings",
            "nickname": "Kings",
            "code": "SAC",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/9/95/Kings_de_Sacramento_logo.svg/1200px-Kings_de_Sacramento_logo.svg.png",
            "city": "Sacramento"
        },
        {
            "id": 31,
            "name": "San Antonio Spurs",
            "nickname": "Spurs",
            "code": "SAS",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/0/0e/San_Antonio_Spurs_2018.png",
            "city": "San Antonio"
        },
        {
            "id": 32,
            "name": "Shanghai Sharks",
            "nickname": "Sharks",
            "code": "SDS",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/f/f3/Shangaisharks.jpg/130px-Shangaisharks.jpg",
            "city": "Shanghai"
        },
        {
            "id": 33,
            "name": "Sydney Kings",
            "nickname": "Kings",
            "code": "SYD",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c4/Sydney_Kings.jpg/220px-Sydney_Kings.jpg",
            "city": "Sydney"
        },
        {
            "id": 34,
            "name": "Team Team Durant",
            "nickname": "Team Durant",
            "code": "DRT",
            "logo": null,
            "city": "Team"
        },
        {
            "id": 35,
            "name": "Team LeBron",
            "nickname": "Team LeBron",
            "code": "LBN",
            "logo": null,
            "city": "Team"
        },
        {
            "id": 36,
            "name": "Away Team Wilbon",
            "nickname": "Team Wilbon",
            "code": "WLB",
            "logo": null,
            "city": "Away"
        },
        {
            "id": 37,
            "name": "Home Team Stephen A",
            "nickname": "Team Stephen A",
            "code": "SAS",
            "logo": null,
            "city": "Home"
        },
        {
            "id": 38,
            "name": "Toronto Raptors",
            "nickname": "Raptors",
            "code": "TOR",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/8/89/Raptors2015.png",
            "city": "Toronto"
        },
        {
            "id": 39,
            "name": "USA USA",
            "nickname": "USA",
            "code": "USA",
            "logo": null,
            "city": "USA"
        },
        {
            "id": 40,
            "name": "Utah Jazz",
            "nickname": "Jazz",
            "code": "UTA",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/3/3b/Jazz_de_l%27Utah_logo.png",
            "city": "Utah"
        },
        {
            "id": 41,
            "name": "Washington Wizards",
            "nickname": "Wizards",
            "code": "WAS",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/archive/d/d6/20161212034849%21Wizards2015.png",
            "city": "Washington"
        },
        {
            "id": 42,
            "name": "World World",
            "nickname": "World",
            "code": "WLD",
            "logo": null,
            "city": "World"
        },
        {
            "id": 43,
            "name": "Team Africa",
            "nickname": "Africa",
            "code": "AFR",
            "logo": null,
            "city": "Team"
        },
        {
            "id": 44,
            "name": "Team World",
            "nickname": "World",
            "code": "WLD",
            "logo": null,
            "city": "Team"
        },
        {
            "id": 83,
            "name": "",
            "nickname": "Paschoalotto/Bauru",
            "code": "BAU",
            "logo": null,
            "city": "Bauru"
        },
        {
            "id": 84,
            "name": "",
            "nickname": "Fenerbahce Sports Club",
            "code": "FEN",
            "logo": null,
            "city": "Istanbul"
        },
        {
            "id": 85,
            "name": "",
            "nickname": "Olimpia Milano",
            "code": "MLN",
            "logo": null,
            "city": "Milano"
        },
        {
            "id": 86,
            "name": "Real Madrid Real Madrid",
            "nickname": "Real Madrid",
            "code": "RMD",
            "logo": null,
            "city": "Real Madrid"
        },
        {
            "id": 87,
            "name": "Rio de Janeiro Flamengo",
            "nickname": "Flamengo",
            "code": "FLA",
            "logo": null,
            "city": "Rio de Janeiro"
        },
        {
            "id": 88,
            "name": "Barcelona FC Barcelona",
            "nickname": "FC Barcelona",
            "code": "FCB",
            "logo": null,
            "city": "Barcelona"
        },
        {
            "id": 89,
            "name": "Buenos Aires San Lorenzo",
            "nickname": "San Lorenzo",
            "code": "SLA",
            "logo": null,
            "city": "Buenos Aires"
        },
        {
            "id": 90,
            "name": "Adelaide 36ers",
            "nickname": "36ers",
            "code": "ADL",
            "logo": null,
            "city": "Adelaide"
        },
        {
            "id": 91,
            "name": "Beijing Ducks",
            "nickname": "Ducks",
            "code": "BJD",
            "logo": null,
            "city": "Beijing"
        },
        {
            "id": 92,
            "name": "New Zealand Breakers",
            "nickname": "Breakers",
            "code": "NZB",
            "logo": null,
            "city": "New Zealand"
        },
        {
            "id": 93,
            "name": "Perth Wildcats",
            "nickname": "Wildcats",
            "code": "PER",
            "logo": null,
            "city": "Perth"
        },
        {
            "id": 94,
            "name": "Team USA",
            "nickname": "USA",
            "code": "USA",
            "logo": null,
            "city": "Team"
        },
        {
            "id": 95,
            "name": "Team World",
            "nickname": "World",
            "code": "WLD",
            "logo": null,
            "city": "Team"
        },
        {
            "id": 96,
            "name": "Team China",
            "nickname": "China",
            "code": "CHN",
            "logo": null,
            "city": "China"
        },
        {
            "id": 97,
            "name": "Team Croatia",
            "nickname": "Croatia",
            "code": "CRO",
            "logo": null,
            "city": "Croatia"
        },
        {
            "id": 99,
            "name": "Franca Franca",
            "nickname": "Franca",
            "code": "FRA",
            "logo": null,
            "city": "Franca"
        },
        {
            "id": 102,
            "name": "Utah Blue",
            "nickname": "Jazz",
            "code": "UTB",
            "logo": null,
            "city": "Utah"
        },
        {
            "id": 103,
            "name": "Utah White",
            "nickname": "Jazz",
            "code": "UTW",
            "logo": null,
            "city": "Utah"
        }
    ]

    const fakeTeamsRes = [
        {
            "id": 1,
            "name": "Atlanta Hawks",
            "nickname": "Hawks",
            "code": "ATL",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png",
            "city": "Atlanta"
        },
        {
            "id": 2,
            "name": "Boston Celtics",
            "nickname": "Celtics",
            "code": "BOS",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/6/65/Celtics_de_Boston_logo.svg/1024px-Celtics_de_Boston_logo.svg.png",
            "city": "Boston"
        },
        {
            "id": 3,
            "name": "Brisbane Bullets",
            "nickname": "Bullets",
            "code": "BNE",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1b/Brisbane_Bullets_1992.png/130px-Brisbane_Bullets_1992.png",
            "city": "Brisbane"
        },
        {
            "id": 4,
            "name": "Brooklyn Nets",
            "nickname": "Nets",
            "code": "BKN",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/130px-Brooklyn_Nets_newlogo.svg.png",
            "city": "Brooklyn"
        },
        {
            "id": 5,
            "name": "Charlotte Hornets",
            "nickname": "Hornets",
            "code": "CHA",
            "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/f/f3/Hornets_de_Charlotte_logo.svg/1200px-Hornets_de_Charlotte_logo.svg.png",
            "city": "Charlotte"
        }
    ]

    beforeEach( () => {
        initialPropsInput = {
            setName : "",
            setError : null,
            setCallToAPI : false,
            setButtonTeamClicked : false,
            teams : fakeTeams,
            setTeamsRes : [],
            setTeamNameSel:""
        };
        initialPropsTable = {
            teamsRes : fakeTeamsRes,
            error : null,
            callToAPI : true,
            setButtonTeamClicked : false, 
            setTeamNameSel : ""
        };
    });

    it("Rendering iniziale del componente SearchTeam senza crashare", () => {
        
        const fakeSeasons = [
            2015,
            2016,
            2017,
            2018,
            2019,
            2020,
            2021
        ];
        
        const fakeTeamInfo = [
            {"teamId":1,"teamLogo":"https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png","teamName":"Atlanta Hawks","nickname":"Hawks","city":"Atlanta","conference":"East","division":"Southeast","players":[{"playerId":553,"playerName":"Lou Williams"},{"playerId":564,"playerName":"Delon Wright"},{"playerId":329,"playerName":"Timothe Luwawu-Cabarrot"},{"playerId":761,"playerName":"John Collins"},{"playerId":738,"playerName":"Jordan Bell"},{"playerId":1011,"playerName":"Cameron Oliver"},{"playerId":980,"playerName":"Kevin Huerter"},{"playerId":987,"playerName":"Kevin Knox II"},{"playerId":1046,"playerName":"Trae Young"},{"playerId":2579,"playerName":"Javin DeLaurier"},{"playerId":1948,"playerName":"DaQuan Jeffries"},{"playerId":1889,"playerName":"Cam Reddish"},{"playerId":1868,"playerName":"De'Andre Hunter"},{"playerId":1892,"playerName":"Admiral Schofield"},{"playerId":2388,"playerName":"Jeremiah Martin"},{"playerId":2629,"playerName":"Onyeka Okongwu"},{"playerId":2620,"playerName":"Skylar Mays"},{"playerId":2800,"playerName":"Sharife Cooper"},{"playerId":2819,"playerName":"Jalen Johnson"},{"playerId":2794,"playerName":"Chaundee Brown Jr."},{"playerId":2890,"playerName":"A.J. Lawson"},{"playerId":3380,"playerName":"Malcolm Hill"},{"playerId":181,"playerName":"Danilo Gallinari"},{"playerId":497,"playerName":"Lance Stephenson"},{"playerId":141,"playerName":"Gorgui Dieng"},{"playerId":92,"playerName":"Clint Capela"},{"playerId":743,"playerName":"Bogdan Bogdanovic"}]}
        ];

        const ApiGetSpy = jest.spyOn(axios, 'get')
                        .mockResolvedValueOnce({ status: 200, data: fakeTeamInfo })
                        .mockResolvedValueOnce({ status: 200, data: fakeSeasons })

        const wrapper = mount(<SearchTeam/>);
        expect(wrapper.find('InputName')).toHaveLength(1);
        expect(wrapper.find('TeamInfo')).toHaveLength(0);
        expect(wrapper.find('TeamsTable')).toHaveLength(1);

        ApiGetSpy.mockRestore();
        ApiGetSpy.mockClear();
    });

    it("Rendering del componente InputName senza crashare", () => {
        shallow(<InputName{...initialPropsInput}/>);
    });

    it("Rendering del componente PlayersTable senza crashare", () => {
        shallow(<TeamsTable{...initialPropsTable}/>);
    });

    it("Rendering del componente TeamsTable nel caso in cui l'API remota non è disponibile", () => {
        initialPropsTable.callToAPI = true;
        initialPropsTable.error = "Errore"; // Basta che non sia null
        const wrapper = mount(<TeamsTable{...initialPropsTable}/>);
        const label = wrapper.find("#apiNotAvailable").text();
        expect(label).toEqual("Service temporarily unavailable. Unable to connect to the remote API.");
    });

    it("Rendering del componente TeamsTable nel caso in cui non vi siano squadre per la ricerca selezionata", () => {
        initialPropsTable.callToAPI = true;
        initialPropsTable.teamsRes = [];
        const wrapper = mount(<TeamsTable{...initialPropsTable}/>);
        const label = wrapper.find("#resNotAvailable").text();
        expect(label).toEqual("There are no teams for these search parameters");
    });
    it("Rendering del componente TeamsTable nel caso in cui vi siano squadre", () => {

        initialPropsTable.callToAPI = true;
        initialPropsTable.teams = fakeTeams;
        initialPropsTable.teamsRes = fakeTeamsRes;
        const wrapper = mount(<TeamsTable {...initialPropsTable}/>);

        const teamsTable = wrapper.find("table#teamsTable");
        expect(teamsTable).toHaveLength(1);
        let rows = wrapper.find("#teamsTable").find('tbody').find('tr');
        expect(rows.length).toEqual(6);
        let i = 1;

        expect(rows.find('td').length).toEqual(30);

    });
});