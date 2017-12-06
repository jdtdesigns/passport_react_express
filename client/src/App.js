import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './style.css';
import axios from 'axios';

import Fail from './components/Fail';
import Header from './components/Header';

window.axios = axios;

class App extends Component {
  constructor() {
    super();

    this.state = {
      logged_in: false,
      email: '',
      password: '',
      user: {}
    }
  }

  registerUser(is_register, e) {
    e.preventDefault();

    let url = is_register ? '/auth/register' : '/auth/login';

    axios.post(url, {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
        if ( res.data.success ) {
          this.setState({user: {...res.data.info}, logged_in: true});
        }
    })
  }

  handleChange(e) {
    let prop = e.target.id;
    
    this.setState({[prop]: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <Header email={this.state.user.email} logged_in={this.state.logged_in} />
        {Object.keys(this.state.user).length ? (
          <div>
            <h1>Logged in</h1>
            <p>{this.state.user.email}</p>
          </div>
        ) : (
           <div>
              <form className="column" onSubmit={(e) => this.registerUser(0, e)}>
                <input type="text" value={this.state.email} id="email" onChange={this.handleChange.bind(this)} />
                <input type="password" value={this.state.password} id="password" onChange={this.handleChange.bind(this)} />
                <button type="submit">Submit</button>
              </form>

              <h3>Login</h3>
              <form className="column" onSubmit={(e) => this.registerUser(1, e)}>
                <input type="text" value={this.state.email} id="email" onChange={this.handleChange.bind(this)} />
                <input type="password" value={this.state.password} id="password" onChange={this.handleChange.bind(this)} />
                <button type="submit">Submit</button>
              </form>
           </div>
        )}

        <Route path="/fail" component={Fail}></Route>
      </div>
    );
  }
}

export default App;

