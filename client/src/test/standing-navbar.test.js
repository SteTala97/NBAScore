import StandingsNavBar from '../components/visualizzazioneClassifiche/standings-navbar';
import { shallow, mount} from 'enzyme';
import axios from 'axios';
import { render, act } from '@testing-library/react';


describe('Testing main functions of StandingsNavBar component',() => {

  let initialProps;

  beforeEach( () => {      
    initialProps = {
      navError: null,
      navLoading: true,
      season: 0,
      seasons: [],
      conference: "",
      loading: "toDo",
      standing: [],
      tableError: null,
      setSeason: jest.fn(x => initialProps.season = x),
      setSeasons: jest.fn(x => initialProps.seasons = x),
      setConference: jest.fn(x => initialProps.conference = x),
      setStanding: jest.fn(x => initialProps.standing = x),
      setNavError: jest.fn(x => initialProps.navError = x),
      setLoading: jest.fn(x => initialProps.loading = x), 
      setTableError: jest.fn(x => initialProps.tableError = x),
      setNavLoading: jest.fn(x => initialProps.navLoading = x)
    };
  });

  // test ottenimento lista delle season
  it('should obtain seasons by axios Get Seasons API call', async () => {

    const Fake_Seasons = [2020, 2021, 2022];
    const ApiGetSeasonsSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: Fake_Seasons });
    let component;
    await act(async () => {
      component = render(<StandingsNavBar {...initialProps}></StandingsNavBar>);
    });
      
    expect(initialProps.setSeasons).toHaveBeenCalledWith(Fake_Seasons);
    expect(initialProps.seasons).toEqual(Fake_Seasons);

    expect(initialProps.setNavError).toHaveBeenCalledWith(null);
    expect(initialProps.navError).toEqual(null);

    expect(initialProps.setNavLoading).toHaveBeenCalledWith(false);
    expect(initialProps.navLoading).toEqual(false);

    ApiGetSeasonsSpy.mockRestore();
    ApiGetSeasonsSpy.mockClear();
  });

  // test API Get Seasons ritorna un errore
  it('axios get Seasons should be rejected', async () => {

    const Fake_Error = 'Request failed with status code 403';
    // per caso di errore: mockFn.mockRejectedValueOnce(value)
    const ApiGetSeasonsSpy = jest.spyOn(axios, 'get').mockRejectedValueOnce({ message: Fake_Error });
    let component;
    await act(async () => {
      component = render(<StandingsNavBar {...initialProps}></StandingsNavBar>);
    });

    expect(initialProps.setNavError).toHaveBeenCalledWith({ message: Fake_Error });
    expect(initialProps.navError.message).toEqual(Fake_Error);

    expect(initialProps.setNavLoading).toHaveBeenCalledWith(false);
    expect(initialProps.navLoading).toEqual(false);

    ApiGetSeasonsSpy.mockRestore();
    ApiGetSeasonsSpy.mockClear();
  });

  // test drop down menu seasons onChange
  it('test seasons drop down menu onChange', () => {
    initialProps.navLoading= false;
    initialProps.seasons = [2019, 2020, 2021];

    let wrapper = mount(<StandingsNavBar {...initialProps} />);

    wrapper.find('#seasonToSearch').find('option').at(0).selected = false;
    wrapper.find('#seasonToSearch').find('option').at(2).instance().selected = true;
    wrapper.find('#seasonToSearch').simulate('change'); // <- simulate onChange

    expect(initialProps.setSeason).toHaveBeenCalledWith('2020');
    expect(initialProps.season).toEqual('2020');
  });

  // test drop down menu conference onChange
  it('test conference drop down menu onChange', () => {
    initialProps.navLoading= false;
    initialProps.seasons = [2019, 2020, 2021];

    let wrapper = mount(<StandingsNavBar {...initialProps} />);

    wrapper.find('#conferenceToSearch').find('option').at(0).selected = false;
    wrapper.find('#conferenceToSearch').find('option').at(1).instance().selected = true;
    wrapper.find('#conferenceToSearch').simulate('change'); // <- simulate onChange

    expect(initialProps.setConference).toHaveBeenCalledWith('East');
    expect(initialProps.conference).toEqual('East');
  });
});

describe('Testing main visualizations of StandingsNavBar component', () => {
  let initialProps;

  beforeEach( () => {      
    initialProps = {
      navError: null,
      navLoading: true,
      season: 0,
      seasons: [],
      conference: "",
      loading: "toDo",
      standing: [],
      tableError: null,
      setSeason: jest.fn(x => initialProps.season = x),
      setSeasons: jest.fn(x => initialProps.seasons = x),
      setConference: jest.fn(x => initialProps.conference = x),
      setStanding: jest.fn(x => initialProps.standing = x),
      setNavError: jest.fn(x => initialProps.navError = x),
      setLoading: jest.fn(x => initialProps.loading = x), 
      setTableError: jest.fn(x => initialProps.tableError = x),
      setNavLoading: jest.fn(x => initialProps.navLoading = x)
    };
  });

  // Test visualizzazione 'Service temporarily unavailable. Unable to connect to the remote API.'
  it('If the API call fails, then StandingsNavBar should show \'Service temporarily unavailable. Unable to connect to the remote API.\' and the relative error message', () => {
    const Fake_Error = 'Request failed with status code 403';
    initialProps.navError= {message: Fake_Error};

    let wrapper = shallow(<StandingsNavBar {...initialProps} />);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.text()).toEqual('Service temporarily unavailable. Unable to connect to the remote API.'.concat(Fake_Error));
    expect(wrapper.find('br')).toHaveLength(1);
  });

  // Test attesa visualizzazione 
  it('If the call to the API Get Seasons is in progress, then StandingsNavBar should show nothing', () => {
    let wrapper = shallow(<StandingsNavBar {...initialProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  // Test visualizzazione sezione di ricerca (drop-down menu e bottone di ricerca)
  it('If the API call success, then StandingsNavBar should show two drop down menu to choose the season and the conference for the research, and a button to execute the research.', () => {
    initialProps.navLoading= false;
    initialProps.seasons = [2019, 2020, 2021];

    let wrapper = mount(<StandingsNavBar {...initialProps} />);
    let seasonOptions = wrapper.find('#seasonToSearch').find('option');
    let conferenceOptions = wrapper.find('#conferenceToSearch').find('option');

    // test Seasons drop down menu
    expect(seasonOptions.length).toEqual(initialProps.seasons.length + 1); // +1 perchè oltre alle stagione c'è anche l'opzione 'Select Season' (non selezionabile)

    let i = 0;
    seasonOptions.forEach((node) => {
      const texts = node.text();
      if(i == 0) {
        expect(texts).toEqual('Select Season'); 
      }
      else {
        expect(texts).toEqual(initialProps.seasons[i-1].toString()); 
      }
      i++;
    });

    // test Conferences drop down menu
    expect(conferenceOptions.length).toEqual(3); // East, West, 'Select Conference' (l'ultimo è non selezionabile)

    i = 0;
    conferenceOptions.forEach((node) => {
      const texts = node.text();
      if(i == 0) {
        expect(texts).toEqual('Select Conference'); 
      }
      else if(i == 1) {
        expect(texts).toEqual('East'); 
      }
      else {
        expect(texts).toEqual('West')
      }
      i++;
    });

    // test Search button
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('Search');    
  });

});

