import React from "react";

import PlayerInfo from "../components/visualizzazioneInformazioniGiocatore/PlayerInfo";
import PlayerInfoTable from "../components/visualizzazioneInformazioniGiocatore/PlayerInfoTable";

import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";



const test_player = {
    firstName : "LeBron",
    lastName : "James",
    birthday : "1984-12-30",
    country : "USA",
    nba_start : 2003,
    height : "2.06",
    weight : "113.4",
    college : "St. Vincent-St. Mary HS (OH)",
    jersey : 6,
    pos : "F"
};

const test_team = {
    id : 17,
    name : "Los Angeles Lakers",
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/220px-Los_Angeles_Lakers_logo.svg.png"
}



// Test that the components do not raise errors when rendered
describe("Rendering single components", () => {

    it("Renders PlayerInfo component without crashing", () => {
        shallow(<PlayerInfo />);
    });

    it("Renders GameInfoGeneralInfo component without crashing", () => {
        shallow(<PlayerInfoTable playerInfo={test_player} teamInfo = {test_team}/>);
    });
})


// Test that the rendering does not change when the same input data is given
describe("Snapshots testing", () => {
    it("PlayerInfo renders correctly", () => {
        const tree = shallow(<PlayerInfo />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("PlayerInfoTable renders correctly when there is no data", () => {
        const tree = shallow(<PlayerInfoTable />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("PlayerInfoTable renders correctly when there is data", () => {
        const tree = shallow(<PlayerInfoTable playerInfo={test_player} teamInfo = {test_team}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("PlayerInfoTable renders correctly when team data is missing", () => {
        const tree = shallow(<PlayerInfoTable playerInfo={test_player}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("PlayerInfoTable renders correctly when player data is missing", () => {
        const tree = shallow(<PlayerInfoTable teamInfo = {test_team}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
})
