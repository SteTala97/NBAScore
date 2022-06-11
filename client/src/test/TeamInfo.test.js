import TeamInfo from "../components/visualizzazioneInformazioniSquadra/TeamInfo";
import TeamInfoTable from "../components/visualizzazioneInformazioniSquadra/TeamInfoTable";
import PlayersList from "../components/visualizzazioneInformazioniSquadra/PlayersList";

import { mount} from 'enzyme';
import axios from 'axios';
import { render, act } from '@testing-library/react';
import React from "react";

describe('Test of the behavior of the main functions of the Team Info Page in the absence of errors',() => {

  let Fake_Team_Info_Body;
  
  beforeEach( () => {          
    Fake_Team_Info_Body = {
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
    };
  });
  
  // test esecuzione chiavate al server
  it('Should call the server to obtain seasons and than team info in the last season', async () => {
    const Fake_Seasons = [2019, 2020, 2021],             
          Fake_TeamName = {teamName: 'Miami Heat'};

    const ApiGetSpy = jest.spyOn(axios, 'get')
                        .mockResolvedValueOnce({ status: 200, data: Fake_Seasons })
                        .mockResolvedValueOnce({ status: 200, data: Fake_Team_Info_Body });
        
    let component;
    await act(async () => {
        component = render(<TeamInfo {...Fake_TeamName}/>);
    });

    expect(ApiGetSpy.mock.calls.length).toBe(2);

    ApiGetSpy.mockRestore();
    ApiGetSpy.mockClear();
  });


  // test rendering della TeamInfoTable
  it('TeamInfoTable should render team info in a Table', async () => {
    const Fake_Team_Info = {teamInfo: {...Fake_Team_Info_Body}};

    let wrapper;
    await act(async () => {
      wrapper = mount(<TeamInfoTable {...Fake_Team_Info} />);
    });
    
    //la tabella ha 2 righe (intestazione + informazioni team) e 5 colonne (team name, nickname, city, conference, division)
    expect(wrapper.find('tr')).toHaveLength(2);
    let teamRow = (wrapper.find('tr').at(1)).find('td');
    expect(teamRow.length).toEqual(Object.keys(Fake_Team_Info_Body).length-3); // -3 perchè teamId, TeamLogo e player non li uso qui
      
    //verifico contenuto tabella
    const texts = teamRow.map((node) => node.text());
    expect(texts).toEqual([
      Fake_Team_Info_Body.teamName,
      Fake_Team_Info_Body.nickname,
      Fake_Team_Info_Body.city,
      Fake_Team_Info_Body.conference,
      Fake_Team_Info_Body.division
    ]);
  });


  // test rendering della PlayersList 
  it('PlayersList should render team players in a Table', async () => {
    const chunkSize = Math.ceil(Fake_Team_Info_Body.players.length/2);
    const Fake_Players_SubList = Fake_Team_Info_Body.players.map((e, i) => { 
      return i % chunkSize === 0 ? Fake_Team_Info_Body.players.slice(i, i + chunkSize) : null 
    }).filter(e => { return e; })

    const Fake_PlayersProps = {teamId: Fake_Team_Info_Body.teamId, playersSubList: Fake_Players_SubList};

    let wrapper;
    await act(async () => {
      wrapper = mount(<PlayersList {...Fake_PlayersProps} />);
    });

    //la tabella ha 2 righe (intestazione + lista giocatori team) 
    expect(wrapper.find('tr')).toHaveLength(2);

    // controlli sulla lista dei giocatori
    let playersList = wrapper.find('tr').at(1).find('span').find('.MuiListItemText-primary');
    expect(playersList).toHaveLength(Fake_Team_Info_Body.players.length);
    const texts = playersList.map((node) => node.text());

    let i = 0;
    texts.forEach((playerName) => {
      expect(playerName).toEqual(Fake_Team_Info_Body.players[i].playerName);
      i++;
    });

  });


  // test visualizzazione 'vuota' durante il caricamento di TeamInfo
  it('Should render nothing', async () => {
    const Fake_Seasons = [2019, 2020, 2021],             
          Fake_TeamName = {teamName: 'Miami Heat'};

    const ApiGetSpy = jest.spyOn(axios, 'get')
                        .mockResolvedValueOnce({ status: 200, data: Fake_Seasons })
                        .mockResolvedValueOnce({ status: 200, data: Fake_Team_Info_Body });
        
    let wrapper;
    await act(async () => {
      wrapper = mount(<TeamInfo {...Fake_TeamName}/>);    
    });
    
    expect(wrapper.isEmptyRender()).toBe(true);

    ApiGetSpy.mockRestore();
    ApiGetSpy.mockClear();
  });


  // test che TeamInfo renderizzi TeamTable e PlayersList
  it('Should render teamTable and PalayerList', async () => {
    const Fake_Seasons = [2019, 2020, 2021],             
          Fake_TeamName = {teamName: 'Miami Heat'};

    const ApiGetSpy = jest.spyOn(axios, 'get')
                        .mockResolvedValueOnce({ status: 200, data: Fake_Seasons })
                        .mockResolvedValueOnce({ status: 200, data: Fake_Team_Info_Body });
        
    let wrapper;

    await act(async () => {
      wrapper = mount(<TeamInfo {...Fake_TeamName}/>);
    });

    await act(async () => {
      //update per passare alla visualizzazione delle info
      wrapper.update();
    });

    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find("img").prop("src")).toEqual(Fake_Team_Info_Body.teamLogo);
    expect(wrapper.find('TeamInfoTable')).toHaveLength(1);
    expect(wrapper.find('PlayersList')).toHaveLength(1);

    ApiGetSpy.mockRestore();
    ApiGetSpy.mockClear();
  });


   // test che TeamInfo renderizzi PlayersInfo
   it('Should render PlayerInfo', async () => {
    const Fake_Seasons = [2019, 2020, 2021],             
          Fake_TeamName = {teamName: 'Miami Heat'},
          Fake_PlayerInfo = [
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
          ],
          Fake_PlayerStat = [
            {
                "id": 20,
                "name": "Miami Heat",
                "logo": "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1c/Miami_Heat_-_Logo.svg/1200px-Miami_Heat_-_Logo.svg.png"
            }
          ];

    const ApiGetSpy = jest.spyOn(axios, 'get')
                        .mockResolvedValueOnce({ status: 200, data: Fake_Seasons })
                        .mockResolvedValueOnce({ status: 200, data: Fake_Team_Info_Body })
                        .mockResolvedValueOnce({ status: 200, data: Fake_PlayerInfo })
                        .mockResolvedValueOnce({ status: 200, data: Fake_Seasons })
                        .mockResolvedValueOnce({ status: 200, data: Fake_PlayerStat });
        
    let wrapper;

    await act(async () => {
      wrapper = mount(<TeamInfo {...Fake_TeamName}/>);
    });
    
    await act(async () => {
      wrapper.update();
    });
    
    // simulazione del click di un giocatore dell'elenco
    wrapper.find('#player' + Fake_Team_Info_Body.players[0].playerId).find('span').at(0).simulate('click');
   
    await act(async() => {
      wrapper.update();
    });

    expect(wrapper.find('PlayerInfo')).toHaveLength(1);

    ApiGetSpy.mockRestore();
    ApiGetSpy.mockClear();
  });

});


describe('Test of the behavior of the main functions of the Team Info Page when there are some errors or unaviable information',() => {
  let Fake_Team_Info_NullBody;
  
  beforeEach( () => {          
    Fake_Team_Info_NullBody = {
      "teamId": 20,
      "teamLogo": null,
      "teamName": null,
      "nickname": null,
      "city": null,
      "conference": null,
      "division": null,
      "players": []
    };
  });


  // test gestione errore del server durante la richiesta delle stagioni
  it('Should rendering \'Service temporarily unavailable. Unable to connect to the remote API.\' if seasons request fails', async () => {
    const Fake_Error = 'Request failed with status code 403',
          Fake_TeamName = {teamName: 'Miami Heat'};
    const ApiGetSpy = jest.spyOn(axios, 'get').mockRejectedValueOnce({ message: Fake_Error });

    let wrapper;
    await act(async () => {
      wrapper = mount(<TeamInfo {...Fake_TeamName}/>);
    });
      
    expect(ApiGetSpy.mock.calls.length).toBe(1);
   
    await act(async() => {
      wrapper.update();
    });

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').text()).toEqual('Service temporarily unavailable. Unable to connect to the remote API.' + Fake_Error);

    ApiGetSpy.mockRestore();
    ApiGetSpy.mockClear();
  });

  // test gestione errore del server durante la richiesta delle info della squadra
  it('Should rendering \'Service temporarily unavailable. Unable to connect to the remote API.\' if team info request fails', async () => {
    const Fake_Error = 'Request failed with status code 403',
          Fake_TeamName = {teamName: 'Miami Heat'},
          Fake_Seasons = [2019, 2020, 2021];            

    const ApiGetSpy = jest.spyOn(axios, 'get')
                        .mockResolvedValueOnce({ status: 200, data: Fake_Seasons })
                        .mockRejectedValueOnce({ message: Fake_Error });

    let wrapper;
    await act(async () => {
      wrapper = mount(<TeamInfo {...Fake_TeamName}/>);
    });
    
    expect(ApiGetSpy.mock.calls.length).toBe(2);
   
    await act(async() => {
      wrapper.update();
    });

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').text()).toEqual('Service temporarily unavailable. Unable to connect to the remote API.' + Fake_Error);

    ApiGetSpy.mockRestore();
    ApiGetSpy.mockClear();
  });


  // test che TeamInfoTable renderizzi i messaggi "NA" 
  it('TeamInfoTable should render \'NA\' where information are unaviable', async () => {
    const Fake_Team_Info = {teamInfo: {...Fake_Team_Info_NullBody}};

    let wrapper;
    await act(async () => {
      wrapper = mount(<TeamInfoTable {...Fake_Team_Info} />);
    });
    //la tabella ha 2 righe (intestazione + informazioni team) e 5 colonne (team name, nickname, city, conference, division)
    expect(wrapper.find('tr')).toHaveLength(2);
    let teamRow = (wrapper.find('tr').at(1)).find('td');
    expect(teamRow.length).toEqual(Object.keys(Fake_Team_Info_NullBody).length-3); // -3 perchè teamId, TeamLogo e player non li uso qui
      
    //verifico contenuto tabella sia di soli "NA"
    const texts = teamRow.map((node) => node.text());
    expect(texts).toEqual(new Array(teamRow.length).fill("NA"));
  });


  // test che PlayersList renderizzi il messaggio "NA"
  it('PlayersList should render \'NA\' when team players list is empty', async () => {
    const Fake_PlayersProps = {teamId: Fake_Team_Info_NullBody.teamId, playersSubList: []};

    let wrapper;
    await act(async () => {
      wrapper = mount(<PlayersList {...Fake_PlayersProps} />);
    });
    //la tabella ha 2 righe (intestazione + riga con "NA")
    expect(wrapper.find('tr')).toHaveLength(2);

    // controllo non ci siano giocatori, ma ci sia "NA"
    let playersRow = wrapper.find('tr').at(1);
    expect(playersRow.find('span').find('.MuiListItemText-primary')).toHaveLength(0);
    expect(playersRow.find('td')).toHaveLength(1);
    expect(playersRow.find('td').text()).toEqual("NA");
  });

});