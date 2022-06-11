import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import React from 'react';
import axios from 'axios';
import InputFirstLastName from '../components/ricercaGiocatorePerNome/InputFirstLastName';
import PlayersTable from '../components/ricercaGiocatorePerNome/PlayersTable';
import SearchPlayer from '../components/ricercaGiocatorePerNome/SearchPlayer';

describe("Test rendering componenti SearchPlayer", () => {
    let mainProps;
    let initialPropsInput;
    let initialPropsTable;

    beforeEach( () => {
        mainProps = {
            teamClicked: false,
            teamName: "",
            setTeamClicked: jest.fn(x => mainProps.teamClicked = x),
            setTeamName: jest.fn(x => mainProps.teamName = x)
        };
        initialPropsInput = {
            firstname : "",
            setFirstname : jest.fn(x => initialPropsInput.firstname = x),
            lastname : "",
            setLastname : jest.fn(x => initialPropsInput.lastname = x),
            error : null,
            setError : jest.fn(x => initialPropsInput.error = x),
            setPlayersFirstname : [],
            setPlayersLastname : [],
            callToAPI : false,
            setCallToAPI : jest.fn(x => initialPropsInput.callToAPI = x),
            setButtonPlayerClicked : false
        };
        initialPropsTable = {
            teams : [],
            error : null,
            setError : jest.fn(x => initialPropsTable.error = x),
            firstname : "",
            setFirstname : jest.fn(x => initialPropsTable.firstname = x),
            lastname : "",
            setLastname : jest.fn(x => initialPropsTable.lastname = x),
            playersFirstname : [],
            playersLastname : [],
            callToAPI : true,
            setCallToAPI : jest.fn(x => initialPropsTable.callToAPI = x),
            setButtonPlayerClicked:false, 
            setPlayer_Id:""
        };
    });

    it("Rendering iniziale del componente SearchPlayer senza crashare", () => {
        const fakeTeamInfo = [
            {
                "id": 20,
                "name": "Miami Heat",
                "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1c/Miami_Heat_-_Logo.svg/1200px-Miami_Heat_-_Logo.svg.png"
            }
        ];

        const fakeSeasons = [
            2015,
            2016,
            2017,
            2018,
            2019,
            2020,
            2021
        ];

        const fakePlayerInfo = [
            {
                "firstName": "Bam",
                "lastName": "Adebayo",
                "birthday": "1997-07-18",
                "country": "USA",
                "college": "Kentucky",
                "nba_start": 2017,
                "height": "2.06",
                "weight": "115.7",
                "jersey": 13,
                "pos": "C-F"
            }
        ]

        const ApiGetSpy = jest.spyOn(axios, 'get')
                        .mockResolvedValueOnce({ status: 200, data: fakeTeamInfo })
                        .mockResolvedValueOnce({ status: 200, data: fakeSeasons })
                        .mockResolvedValueOnce({ status: 200, data: fakePlayerInfo });

        const wrapper = mount(<SearchPlayer {...mainProps} />);
        expect(wrapper.find('InputFirstLastName')).toHaveLength(1);
        expect(wrapper.find('PlayerInfo')).toHaveLength(0);
        expect(wrapper.find('PlayersTable')).toHaveLength(1);

        ApiGetSpy.mockRestore();
        ApiGetSpy.mockClear();
    });

    it("Rendering del componente InputFirstLastName senza crashare", () => {
        shallow(<InputFirstLastName{...initialPropsInput}/>);
    });

    it("Rendering del bottone Search senza crashare con controllo label", () => {
        const wrapper = mount(<InputFirstLastName{...initialPropsInput}/>);
        const label = wrapper.find("#chooseName").text();
        expect(label).toEqual("Search");
    });

    it("Rendering del componente PlayersTable senza crashare", () => {
        shallow(<PlayersTable{...initialPropsTable}/>);
    });

    it("Rendering del componente PlayersTable nel caso in cui l'API remota non è disponibile", () => {
        initialPropsTable.callToAPI = true;
        initialPropsTable.error = "Errore"; // Basta che non sia null
        const wrapper = mount(<PlayersTable{...initialPropsTable}/>);
        const label = wrapper.find("#apiNotAvailable").text();
        expect(label).toEqual("Service temporarily unavailable. Unable to connect to the remote API.");
    });

    it("Rendering del componente PlayersTable nel caso in cui non vi siano giocatori per la ricerca selezionata", () => {
        initialPropsTable.callToAPI = true;
        const wrapper = mount(<PlayersTable{...initialPropsTable}/>);
        const label = wrapper.find("#noPlayers").text();
        expect(label).toEqual("There are no players for these search parameters.");
    });
    it("Rendering del componente PlayersTable nel caso in cui vi siano giocatori", () => {

        const testTeams = 
        [   
            {id: 103, name: "Utah White", logo: null},
            {id: 102, name: "Utah Blue", logo: null},
            {id: 40, name: "Utah Jazz", logo: "https://upload.wikimedia.org/wikipedia/fr/3/3b/Jazz_de_l%27Utah_logo.png"},
            {id: 35, name: "Team LeBron", logo: null},
            {id: 31,
                logo: "https://upload.wikimedia.org/wikipedia/fr/0/0e/San_Antonio_Spurs_2018.png",
                name: "San Antonio Spurs"},
            {id: 30,
                logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/9/95/Kings_de_Sacramento_logo.svg/1200px-Kings_de_Sacramento_logo.svg.png"
                ,name: "Sacramento Kings"},
            {id: 29,
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Portland_Trail_Blazers_logo.svg/1200px-Portland_Trail_Blazers_logo.svg.png"
                ,name: "Portland Trail Blazers"},
            {id: 28,
                logo: "https://upload.wikimedia.org/wikipedia/fr/5/56/Phoenix_Suns_2013.png"
                ,name: "Phoenix Suns"},
            {id: 25
                ,logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Thunder_d%27Oklahoma_City_logo.svg/1200px-Thunder_d%27Oklahoma_City_logo.svg.png"
                ,name: "Oklahoma City Thunder"},
            {
                id: 23,
                logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/2/21/New_Orleans_Pelicans.png/200px-New_Orleans_Pelicans.png"
                ,name: "New Orleans Pelicans"
            },
            {id: 22
                ,logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d9/Timberwolves_du_Minnesota_logo_2017.png/200px-Timberwolves_du_Minnesota_logo_2017.png"
                ,name: "Minnesota Timberwolves"},
            {id: 19
                ,logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Memphis_Grizzlies.svg/1200px-Memphis_Grizzlies.svg.png"
                ,name: "Memphis Grizzlies"},
            {id: 17
                ,logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/220px-Los_Angeles_Lakers_logo.svg.png"
                ,name: "Los Angeles Lakers"},
            {id: 16
                ,logo: "https://upload.wikimedia.org/wikipedia/fr/d/d6/Los_Angeles_Clippers_logo_2010.png"
                ,name: "LA Clippers"},
            {id: 14
                ,logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Houston_Rockets_logo_2003.png/330px-Houston_Rockets_logo_2003.png"
                ,name: "Houston Rockets"},
            {id: 11
                ,logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Warriors_de_Golden_State_logo.svg/1200px-Warriors_de_Golden_State_logo.svg.png"
                ,name: "Golden State Warriors"},
            {id: 9
                ,logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/3/35/Nuggets_de_Denver_2018.png/180px-Nuggets_de_Denver_2018.png"
                ,name: "Denver Nuggets"},
            {id: 8
                ,logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Mavericks_de_Dallas_logo.svg/150px-Mavericks_de_Dallas_logo.svg.png"
                ,name: "Dallas Mavericks"},
            {id: 41, name: 'Washington Wizards', logo: 'https://upload.wikimedia.org/wikipedia/fr/archive/d/d6/20161212034849%21Wizards2015.png'},
            {id: 38, name: 'Toronto Raptors', logo: 'https://upload.wikimedia.org/wikipedia/fr/8/89/Raptors2015.png'},
            {id: 27, name: 'Philadelphia 76ers', logo: 'https://upload.wikimedia.org/wikipedia/fr/4/48/76ers_2016.png'}
        ];
        
        const testPlayersNate = 
        [
            {id: '698', firstname: 'Nate', lastname: 'Wolters', teamid: null, birth: ''},
            {id: '2578', firstname: 'Nate', lastname: 'Darling', teamid: '5', birth: '1998-08-30'},
            {id: '2672', firstname: 'Nate', lastname: 'Hinton', teamid: '15', birth: '1999-06-08'},
            {id: '3121', firstname: 'Nate', lastname: 'Mason', teamid: '28', birth: '1995-07-25'},
            {id: '3187', firstname: 'Nate', lastname: 'Renfro', teamid: '31', birth: '1996-12-11'}
        ];

        initialPropsTable.callToAPI = true;
        initialPropsTable.teams = testTeams;
        initialPropsTable.playersFirstname = testPlayersNate
        const wrapper = mount(<PlayersTable {...initialPropsTable}/>);

        const playersTable = wrapper.find("table#playersTable");
        expect(playersTable).toHaveLength(1);
        let rows = wrapper.find("#playersTable").find('tbody').find('tr');
        expect(rows.length).toEqual(6);
        let i = 1;

        expect(rows.find('td').length).toEqual(25);

    });
});