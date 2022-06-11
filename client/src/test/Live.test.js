import React from 'react';

//import { expect } from 'chai';
import { shallowToJson } from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';

import App from '../App';
import Live from '../components/visualizzazioneInLive/Live';
import Match from '../components/visualizzazioneInLive/Match';
import Team from '../components/visualizzazioneInLive/Team';

describe("Test rendering componenti live", () => {
  
    const testMatch = 
      { 
        id: 1, //identificare la partita e da passare tra componenti ed altri
        typeGame: 'Finished', //Not Started, live, Finished
        currentPeriods: 4,
        totalPeriods: 4,
        linescoreHome: ["36", "25", "36", "24"], //questo è un array composto [0:"36", 1:"25", 2:"36", 3: "24"]
        linescoreVisitors: ["36", "25", "36", "24"], //questo è un array composto [0:"36", 1:"25", 2:"36", 3: "24"]
        teamScoreHome: 23,
        teamScoreVisitors: 40,
        teamNameHome: 'Team 1',
        teamLogoHome: '',
        teamCodeHome: 'ESP',
        teamNameVisitors: 'Team 2',
        teamLogoVisitors: '',
        teamCodeVisitors: 'SDF'
      };

    const testTeam = "Team 1";

    let otherProps = {
      teamClicked: false, 
      teamName: ""
    };

    it("Rendering del componente App senza crashare", () => {
        shallow(<App/>);
    });

    it("Rendering del componente Live senza crashare", () => {
        const wrapper = mount(<Live teamClicked={otherProps.teamClicked} teamName={otherProps.teamName} />);
    });

    it("Rendering del componente Match senza crashare", () => {
        const wrapper = mount(<Match key={testMatch.id.toString()} data={testMatch} teamClicked={otherProps.teamClicked} teamName={otherProps.teamName} />);
    });

    it("Rendering del componente Match senza crashare", () => {
      const wrapper = mount(<Team name={testTeam}/>);
    });

});

// Test that the rendering does not change when the same input data is given
describe("Test degli Snapshot", () => {

  const testMatch = 
      { 
        id: 1, //identificare la partita e da passare tra componenti ed altri
        typeGame: 'Finished', //Not Started, live, Finished
        currentPeriods: 4,
        totalPeriods: 4,
        linescoreHome: ["36", "25", "36", "24"], //questo è un array composto [0:"36", 1:"25", 2:"36", 3: "24"]
        linescoreVisitors: ["36", "25", "36", "24"], //questo è un array composto [0:"36", 1:"25", 2:"36", 3: "24"]
        teamScoreHome: 23,
        teamScoreVisitors: 40,
        teamNameHome: 'Team 1',
        teamLogoHome: '',
        teamCodeHome: 'ESP',
        teamNameVisitors: 'Team 2',
        teamLogoVisitors: '',
        teamCodeVisitors: 'SDF'
      };

  const testTeam = "Team 1";

  let otherProps = {
    teamClicked: false, 
    teamName: ""
  };

  it("Rendering del componente Live correttamente", () => {
      const tree = shallow(<Live teamClicked={otherProps.teamClicked} teamName={otherProps.teamName}/>);
      expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("Rendering del componente Live con TeamInfo", () => {
    otherProps.teamClicked = true;
    otherProps.teamName = "Miami Heat";
    const tree = shallow(<Live teamClicked={otherProps.teamClicked} teamName={otherProps.teamName}/>);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("Rendering del comp. Match senza passare dati", () => {
      const tree = shallow(<Match data={null}/>);
      expect(shallowToJson(tree)).toMatchSnapshot();
  });
  it("Rendering del comp. Match correttamente", () => {
      const tree = shallow(<Match key={testMatch.id.toString()} data={testMatch} teamClicked={otherProps.teamClicked} teamName={otherProps.teamName}/>);
      expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("Rendering del comp. Match con TeamInfo", () => {
    otherProps.teamClicked = true;
    otherProps.teamName = "Miami Heat";
    const tree = shallow(<Match key={testMatch.id.toString()} data={testMatch} teamClicked={otherProps.teamClicked} teamName={otherProps.teamName}/>);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("Rendering del comp. Team senza passare valori", () => {
      const tree = shallow(<Team />);
      expect(shallowToJson(tree)).toMatchSnapshot();
  });
  it("Rendering del componente Team correttamente", () => {
      const tree = shallow(<Team name={testTeam}/>);
      expect(shallowToJson(tree)).toMatchSnapshot();
  });
})
