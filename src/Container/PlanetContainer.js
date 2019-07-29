import React,{Component} from 'react';
import PlanetSearch from "../Components/PlanetSearch.js";
import {Link} from 'react-router-dom';

 class PlanetContainer extends Component {
   constructor () {
     super();
     this.state = {
       data : {},
       sortedResult : [],
     }
   }
  componentDidMount () {
    fetch ("https://swapi.co/api/planets")
    .then(res => res.json())
    .then(data => this.setState({data : data.results}))
  }
  render() {
    return (
      <div className = "container-fluid planet-container">
        <div className = "row">
        <div>
          <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <p className="pull-left">Hi Desh!</p>
                <p className="pull-right"><Link to ="/login">Logout</Link></p>
            </div>
          </div>
          </nav>
        </div>
        <p className= "info">This is a Planet serach portal. Here you can select planets from a list of planets. Once you select a planet it would be automatically displayed below.</p>
        {this.state.data.length > 0 ?
          <PlanetSearch data={this.state.data} />
        : null}
        </div>
      </div>
    )
  }
}
export default PlanetContainer;
