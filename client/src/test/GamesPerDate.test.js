import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import React from 'react';
import GamesPerDateView from '../components/ricercaPartitePerData/GamesPerDateView';
import CalendarAndButton from '../components/ricercaPartitePerData/CalendarAndButton';
import Calendar from 'react-calendar';
import GamesTable from '../components/ricercaPartitePerData/GamesTable';

describe("Test rendering componenti gamesPerDate", () => {
    let initialProps;

    beforeEach( () => {
        initialProps = {
            date: new Date(),
            error: null,
            games: [],
            callToAPI : false,
            teamClicked: false, 
            teamName: "",
            setDate: jest.fn(x => initialProps.date = x),
            setError: jest.fn(x => initialProps.error = x),
            setGames: jest.fn(x => initialProps.games = x),
            setCallToAPI: jest.fn(x => initialProps.callToAPI = x),
            setTeamClicked: jest.fn(x => initialProps.teamClicked = x),
            setTeamName: jest.fn(x => initialProps.teamName = x)
        };
    });

    it("Rendering iniziale del componente GamesPerDateView senza crashare", () => {
        const wrapper = mount(<GamesPerDateView
                                    teamClicked={initialProps.teamClicked} 
                                    setTeamClicked={initialProps.setTeamClicked} 
                                    teamName = {initialProps.teamName} 
                                    setTeamName={initialProps.setTeamName}/>);
        expect(wrapper.find('CalendarAndButton')).toHaveLength(1);
        expect(wrapper.find('GameInfo')).toHaveLength(0);
        expect(wrapper.find('Live')).toHaveLength(0);
        expect(wrapper.find('GamesTable')).toHaveLength(0);
    });
    
    it("Rendering iniziale del componente GamesPerDateView con TeamInfo", () => {
        initialProps.teamClicked = true;
        initialProps.teamName = "Miami Heat";
        const wrapper = mount(<GamesPerDateView
                                    teamClicked={initialProps.teamClicked} 
                                    setTeamClicked={initialProps.setTeamClicked} 
                                    teamName = {initialProps.teamName} 
                                    setTeamName={initialProps.setTeamName}/>);
        expect(wrapper.find('TeamInfo')).toHaveLength(1);
    });

    it("Rendering del componente CalendarAndButton senza crashare", () => {
        shallow(<CalendarAndButton{...initialProps}/>);
    });

    it("Rendering del componente Calendar senza crashare", () => {
        shallow(<Calendar/>);
    });

    it("Rendering del bottone Scegli Data senza crashare con controllo label", () => {
        const wrapper = mount(<CalendarAndButton{...initialProps}/>);
        const label = wrapper.find("#chooseDate").text();
        expect(label).toEqual("Choose Date");
    });

    it("Rendering del componente GamesTable senza crashare", () => {
        shallow(<GamesTable{...initialProps}/>);
    });

    it("Rendering del componente GamesTable nel caso in cui l'API remota non è disponibile", () => {
        initialProps.callToAPI = true;
        initialProps.error = "Errore"; // Basta che non sia null
        const wrapper = mount(<GamesTable{...initialProps}/>);
        const label = wrapper.find("#apiNotAvailable").text();
        expect(label).toEqual("Service temporarily unavailable. Unable to connect to the remote API.");
    });

    it("Rendering del componente GamesTable nel caso in cui non vi siano partite per la data selezionata", () => {
        initialProps.callToAPI = true;
        const wrapper = mount(<GamesTable{...initialProps}/>);
        const label = wrapper.find("#noGames").text();
        expect(label).toEqual("There are no games for this date");
    });
    it("Rendering del componente GamesTable nel caso in cui vi siano partite", () => {
        const testGames = [
            {
                id: 1,
                homeTeam: "Cleveland Cavaliers",
                currentPeriods: 0,
                totalPeriods: 4,
                visitorTeam: "Brooklyn Nets",
                homeScore: null,
                visitorScore: null,
                status: 1,
                type: "Scheduled",
                linescoreHome: [],
                linescoreVisitors: [], 
                teamLogoHome: "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d9/Timberwolves_du_Minnesota_logo_2017.png/200px-Timberwolves_du_Minnesota_logo_2017.png",
                teamLogoVisitors: "https://upload.wikimedia.org/wikipedia/fr/0/0e/San_Antonio_Spurs_2018.png",
                time: "02:00"
            },
            {
                id: 3,
                homeTeam: "Golden State Warriors",
                currentPeriods: 4,
                totalPeriods: 4,
                visitorTeam: "San Antonio Spurs",
                homeScore: 95,
                visitorScore: 116,
                status: 3,
                type: "Finished",
                linescoreHome: ['31', '28', '40', '23'],
                linescoreVisitors: ['33', '49', '25', '24'], 
                teamLogoHome: "https://upload.wikimedia.org/wikipedia/fr/thumb/c/cf/Pacers_de_l%27Indiana_logo.svg/1180px-Pacers_de_l%27Indiana_logo.svg.png",
                teamLogoVisitors: "https://upload.wikimedia.org/wikipedia/fr/4/48/76ers_2016.png",
                time: "04:00"
            }
        ];

        initialProps.callToAPI = true;
        initialProps.games = testGames;
        const wrapper = mount(<GamesTable{...initialProps}/>);

        const finishedGamesTable = wrapper.find("table#finishedGamesTable");
        expect(finishedGamesTable).toHaveLength(1);
        let rows = wrapper.find("#finishedGamesTable").find('tbody').find('tr');
        expect(rows.length).toEqual(2);
        let i = 1;

        expect(rows.find('td').length).toEqual(8);

        const linescoreHome = testGames[i].linescoreHome;
        const linescoreVisitors = testGames[i].linescoreVisitors;
        var texts = rows.find('td').map((node) => node.text());
        expect(texts).toEqual([
            testGames[i].type.toString(),
            "", //<- logo non ha text
            testGames[i].homeTeam.toString()+testGames[i].visitorTeam.toString(),
            testGames[i].homeScore.toString()+testGames[i].visitorScore.toString(),
            testGames[i].time.toString(),
            testGames[i].currentPeriods.toString() + " of " + testGames[i].totalPeriods.toString(),
            '[ ' + linescoreHome[0] + '  ' + linescoreHome[1] + '  '+ linescoreHome[2] + '  ' + linescoreHome[3] + ' ]'+
            '[ ' + linescoreVisitors[0] + '  ' + linescoreVisitors[1] + '  '+ linescoreVisitors[2] + '  ' + linescoreVisitors[3] + ' ]',
            "More Info" //<- button text
        ]);

        const notStartedGamesTable = wrapper.find("table#notStartedGamesTable");
        expect(notStartedGamesTable).toHaveLength(1);
        rows = wrapper.find("#notStartedGamesTable").find('tbody').find('tr');
        expect(rows.length).toEqual(2);
        i = 0;

        expect(rows.find('td').length).toEqual(8);
        texts = rows.find('td').map((node) => node.text());
        expect(texts).toEqual([
            testGames[i].type.toString(),
            "", //<- logo non ha text
            testGames[i].homeTeam.toString()+testGames[i].visitorTeam.toString(),
            "--",//<- non c'è punteggio>
            testGames[i].time.toString(),
            testGames[i].currentPeriods.toString() + " of " + testGames[i].totalPeriods.toString(),
            "[\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0][\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0-\xa0\xa0\xa0]",
            "More Info" //<- button text
        ]);
    });
});