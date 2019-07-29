import React,{ Component} from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';
import _ from 'loadsh';
import get from 'loadsh/get';

class PlanetSearch extends Component {
  constructor (props) {
    super(props);
    this.state = {
      multiple: false,
      selectedData : [],
      population:[],
      selectedPopulation : [],
      sortedData : [],
      count : 0,
      disable : true,
      btnDisabled :  false,
    };
    this.onChange = this.onChange.bind(this);
    this._sortingFn = this._sortingFn.bind(this);
    this.trackSessionHandler = this.trackSessionHandler.bind(this);
    this.sessionCheckHandler = this.sessionCheckHandler.bind(this)
  }

// Timer functionality
  trackSessionHandler () {
    this.setState({disable : false})
    this.setState({btnDisabled : true})
    let dis = document.getElementById("display");
    let finishTime;
    let timerLength = 20;
    let timeoutID;
      dis.innerHTML = "Time Left: " + timerLength;
      if(localStorage.getItem('myTime')){
        Update();
      }
    localStorage.setItem('myTime', ((new Date()).getTime() + timerLength * 1000));
    if (timeoutID !== undefined) window.clearTimeout(timeoutID);
    Update();
    function Update() {
      finishTime = localStorage.getItem('myTime');
      let timeLeft = (finishTime - new Date());
      dis.innerHTML = "Time Left: " + Math.max(timeLeft/1000,0);
      timeoutID = window.setTimeout(Update, 100);
    }
  }

  // Sorting function for planet search result
  _sortingFn(collection, iteratee, order) {
       return _.orderBy(collection, function(o) {
           return o[iteratee];
       }, order);
   };

//Method fires on value change in search box
  onChange(e) {
    if(e[0] !== undefined) {
      let test = (get(this.props.data.filter(item => {
        return item.name === e[0]
      })[0],"population",""));

    if(test!== undefined || test !== "" || test !== null) {
      this.setState((prevState, props) => ({
        count: prevState.count + 1
      }))
       let obj = {
        name:e[0],
        population : Number(test),
        count : this.state.count
      }
        this.state.selectedPopulation.push(obj);
    }
  }
    this.state.sortedData = (this._sortingFn(this.state.selectedPopulation, "population","desc"));
  }

//Method to track the logged in user & number of records being selected in 60 secs
  sessionCheckHandler () {
    let storedName = localStorage.getItem('name');
    let storedPw = localStorage.getItem('pw');
    console.log(storedName,storedPw );
    let timerValue = Number(document.getElementById('display').textContent.split(":")[1].trim())
    if(( storedName !== "Luke" && storedPw !== "19BBY") && (timerValue === 0 ||(timerValue > 0 && this.state.count === 4))) {
          this.setState({disable : true});
         }
  }

  // To get service data from its parent container
  componentWillMount () {
        this.props.data.forEach(item =>{
           this.state.population.push(get(item,"name",""));
        })
  }
  render () {
    const {multiple} = this.state;
    return (
          <div className = "row serach-component">
                <div className = "col-md-12">
                <div id="display" className = "col-md-12"></div>
                </div>
            <div className = "col-md-6">
              <div className = "serach-label">Please search below for the Planet Information</div>
              <div className = "col-md-12 btn-holder">
                <Typeahead
                labelKey="name"
                multiple={multiple}
                options={this.state.population}
                placeholder="Search for Planets.."
                onChange = {(e) => this.onChange(e)}
                onKeyDown = {(e) => this.sessionCheckHandler(e)}
                disabled = {this.state.disable? true : false}
                />
                <button id="start" className = "btn btn-primary" disabled = {this.state.btnDisabled} onClick={this.trackSessionHandler}>Start</button></div>
            </div>
            <div className = "col-md-6">
              <div className = "serach-label">Here goes your selected Planet(s)</div>
              <ul>
              {this.state.sortedData.map(item=> (<li key = {item.count} className = "searchDetails">{`Planet : ${item.name} || Population : ${item.population}`}</li>)) }
              </ul>
            </div>
          </div>
    )
  }
}
PlanetSearch.propTypes = {
  data :  PropTypes.array
}
export default PlanetSearch;
