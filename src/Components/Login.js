import React,{Component} from 'react';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      error : false,
      user : "",
      password : ""
    }
  }

  // Login page input handler in order to update state
  onChangeHandler = (e) => {
    if(e.target.value !== "") {
      this.setState({error : false})
    } else {
        this.setState({error : true})
    }
    this.setState({[e.target.name] : e.target.value})
  }

  // Method that handles Login validation
  loginHandler = (e) => {
    e.preventDefault();
      if (this.state.user === "" || this.state.password === "") {
        this.setState({error : true})
      }
    if (this.state.user !== "" && this.state.password !== "") {
      this.props.history.push({pathname:'/planet', state : {name : this.state.user, password : this.state.password}})
      localStorage.setItem('name', this.state.user);
      localStorage.setItem('pw', this.state.password);
    }
  }
  render () {
    return (
      <div className="login-form">
        <form onSubmit = {this.loginHandler}>
          <h2 className = "text-center">Welcome to Planet World !</h2>
          <h3 className = "text-center">Log in</h3>
          <div className = "form-group">
              <input type = "text" value = {this.state.user} className="form-control" placeholder="Username" name = "user" required="required" onChange ={(e) => this.onChangeHandler(e)} />
          </div>
          <div className="form-group">
              <input type="password" value = {this.state.password} className="form-control" placeholder="Password" name="password" required="required" onChange ={this.onChangeHandler} />
          </div>
          <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" onClick={this.loginHandler}>Log in</button>
          </div>
          {this.state.error ? <div className="form-group error">Please enter valid credential</div> : null}
      </form>
    </div>
    )
  }
}
export default Login
