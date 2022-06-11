import axios from 'axios';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import StandingView from '../components/visualizzazioneClassifiche/standing-view';


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

  // Test visualizzazione StandingView (verifica che vengano renderizzati StandingsNavBar e StandingTable)
  it('Test StandingView is properly rendered', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<StandingView 
                            teamClicked={initialProps.teamClicked} 
                            setTeamClicked={initialProps.setTeamClicked} 
                            teamName = {initialProps.teamName} 
                            setTeamName={initialProps.setTeamName}/>);
      wrapper.update();
    });
    
    expect(wrapper.find('StandingsNavBar')).toHaveLength(1);
    expect(wrapper.find('StandingTable')).toHaveLength(1);
  });

  it('Test StandingView is properly rendered when request TeamInfo', async () => {

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
      wrapper = mount(<StandingView 
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