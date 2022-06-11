import React from "react";

import GameInfo from "../components/visualizzazioneInformazioniPartita/GameInfo-statistics";
import GameInfoGeneralInfo from "../components/visualizzazioneInformazioniPartita/GameInfo-generalInfo";
import GameInfoStatistics from "../components/visualizzazioneInformazioniPartita/GameInfo-statistics";
import GameInfoPlayers from "../components/visualizzazioneInformazioniPartita/GameInfo-players";
import GameInfoNavBar from "../components/visualizzazioneInformazioniPartita/GameInfo-navbar";

import { shallow } from "enzyme";
import { shallowToJson } from 'enzyme-to-json';


const test_info = {
    homeImg : 'https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png',
    homeName: 'Atlanta Hawks',
    homeScore: 108,
    visitorsImg : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/130px-Brooklyn_Nets_newlogo.svg.png',
    visitorsName: 'Brooklyn Nets',
    visitorsScore: 117,
    arena: {
        name : 'Barclays Center',
        city : 'Brooklyn',
        state: 'NY'
    }
};


const test_statistics = [
    {
    teamImg : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Detroit_Pistons_primary_logo_2017.png/150px-Detroit_Pistons_primary_logo_2017.png',
    teamFgm : 48,
    teamFga : 102,
    teamFgp : "47.1",
    teamFtm : 11,
    teamFta : 18,
    teamFtp : "61.1",
    teamTpm : 12,
    teamTpa : 35,
    teamTpp : "34.3",
    teamOffReb : 16,
    teamDefReb : 29,
    teamTotReb : 45,
    teamAssists : 32,
    teamFouls : 20,
    teamSteals : 10,
    teamTurnovers : 18,
    teamBlocks : 6,
    teamPtsInPaint : 52
    },
    {
    teamImg : 'https://upload.wikimedia.org/wikipedia/fr/thumb/f/f3/Hornets_de_Charlotte_logo.svg/1200px-Hornets_de_Charlotte_logo.svg.png',
    teamFgm : 54,
    teamFga : 97,
    teamFgp : "55.7",
    teamFtm : 15,
    teamFta : 23,
    teamFtp : "65.2",
    teamTpm : 18,
    teamTpa : 42,
    teamTpp : "42.9",
    teamOffReb : 15,
    teamDefReb : 36,
    teamTotReb : 51,
    teamAssists : 36,
    teamFouls : 22,
    teamSteals : 13,
    teamTurnovers : 18,
    teamBlocks : 2,
    teamPtsInPaint : 70
    }
];


const test_players = [
    {
    teamName :  'Atlanta Hawks',
    firstName : 'De\'Andre',
    lastName :  'Hunter',
    min :       '32:54',
    totReb :    2,
    assists :   0,
    points :    26,
    pos :       "SF"
    },
    {
    teamName :  'Atlanta Hawks',
    firstName : 'Danilo',
    lastName :  'Gallinari',
    min :       '15:33',
    totReb :    3,
    assists :   1,
    points :    7,
    pos :       null
    },
    {
    teamName :  'Brooklyn Nets',
    firstName : 'Blake',
    lastName :  'Griffin',
    min :       '30:49',
    totReb :    7,
    assists :   5,
    points :    7,
    pos :       "C"
    },
    {
    teamName :  'Brooklyn Nets',
    firstName : 'Joe',
    lastName :  'Harris',
    min :       '34:27',
    totReb :    6,
    assists :   0,
    points :    18,
    pos :       "SG"
    }
];


const teams = ['visitors', 'home'];

let otherProps = {
    game_Id: "",
    teamClicked: false, 
    teamName: ""
};

// Test that the components do not raise errors when rendered
describe("Rendering single components", () => {

    it("Renders GameInfo component without crashing", () => {
        shallow(<GameInfo id = {otherProps.game_Id} teamName = {otherProps.teamName} teamClicked = {otherProps.teamClicked} />);
    });

    it("Renders GameInfo component with TeamInfo without crashing", () => {
        otherProps.teamClicked = true;
        otherProps.teamName = "Miami Heat";
        shallow(<GameInfo id = {otherProps.game_Id} teamName = {otherProps.teamName} teamClicked = {otherProps.teamClicked} />);
    });

    it("Renders GameInfoGeneralInfo component without crashing", () => {
        shallow(<GameInfoGeneralInfo gameInfo={test_info}/>);
    });

    it("Renders GameInfoStatistics component without crashing", () => {
        shallow(<GameInfoStatistics gameStats={test_statistics}/>);
    });

    it("Renders GameInfoPlayers for 'visitors' team teamcomponent without crashing", () => {
        shallow(<GameInfoPlayers 
                    playersStats={test_players} data={test_info} team={teams[0]}
                />);
    });
    it("Renders GameInfoPlayers for 'home' team teamcomponent without crashing", () => {
        shallow(<GameInfoPlayers 
                    playersStats={test_players} data={test_info} team={teams[1]}
                />);
    });

    it("Renders GameInfoNavBar component without crashing", () => {
        shallow(<GameInfoNavBar />);
    });
})



// Test that the rendering does not change when the same input data is given
describe("Snapshots testing", () => {
    it("GameInfo renders correctly", () => {
        const tree = shallow(<GameInfo id = {otherProps.game_Id} teamName = {otherProps.teamName} teamClicked = {otherProps.teamClicked} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("GameInfo with TeamInfo renders correctly", () => {
        otherProps.teamClicked = true;
        otherProps.teamName = "Miami Heat";
        const tree = shallow(<GameInfo id = {otherProps.game_Id} teamName = {otherProps.teamName} teamClicked = {otherProps.teamClicked} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("GameInfoGeneralInfo renders correctly when there is no data", () => {
        const tree = shallow(<GameInfoGeneralInfo />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("GameInfoGeneralInfo renders correctly when there is data", () => {
        const tree = shallow(<GameInfoGeneralInfo gameInfo={test_info}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("GameInfoGeneralInfo renders correctly when there is no data", () => {
        const tree = shallow(<GameInfoStatistics />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("GameInfoGeneralInfo renders correctly when there is data", () => {
        const tree = shallow(<GameInfoStatistics gameStats={test_statistics}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("GameInfoPlayers renders correctly when there is no data", () => {
        const tree = shallow(<GameInfoPlayers />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("GameInfoPlayers renders correctly when there is data for 'visitors' team", () => {
        const tree = shallow(<GameInfoPlayers 
                                playersStats={test_players} data={test_info} team={teams[0]}
                            />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("GameInfoPlayers renders correctly when there is data for 'home' team", () => {
        const tree = shallow(<GameInfoPlayers 
                                playersStats={test_players} data={test_info} team={teams[1]}
                            />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("GameInfoNavBar renders correctly", () => {
        const tree = shallow(<GameInfoNavBar />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
})
