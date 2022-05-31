import '../styles/App.css';
import React from "react";

import { Router, Route, Redirect } from "react-router-dom";
import history from '../history';

import Login from './Login'
import Dashboard from './Dashboard';
import DepotDoc from './DepotDoc';
import Users from './Users';
import AddUser from './AddUser';
import Banner from './NavBar';
import DocumentUtils from './DocumentUtils';
import AddDocumentUtil from './AddDocumentUtil';
import DashboardUser from './DashboardUser';
import UpdatePassword from './UpdatePassword';
import UpdateSelf from './UpdateSelf';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
  }

  setUser(newUser){
    console.log("user : " + newUser.nomUser);
    this.setState({user: newUser})
    if(this.state.user.nomUser!==undefined){
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(this.state.user));
      window.location="/Dashboard"
    } else {
      alert("Utilisateur invalide");
    }
  }

  render() {
    return (
      <div>
            <Router history={history}>
              <Route path="/" exact>
                <Redirect to="/Login"/>
              </Route>

              <Route path="/Login" exact component={() => <Login setUser={this.setUser}/>}/>
              <Route path="/Dashboard" exact component={() => <Dashboard />}/>
              <Route path="/Depot" exact component={() => <DepotDoc />}/>
              <Route path="/Users" exact component={() => <Users />}/>
              <Route path="/AddUser" exact component={() => <AddUser />}/>
              <Route path="/Downloads" exact component={() => <DocumentUtils />}/>
              <Route path="/AddDocumentUtil" exact component={() => <AddDocumentUtil />}/>
              <Route path="/DocumentsUsers" exact component={() => <DashboardUser />}/>
              <Route path="/updateSelf" exact component={() => <UpdateSelf />}/>
              <Route path="/updatePassword" exact component={() => <UpdatePassword />}/>
            </Router>
          </div>
        
    )
  }
}
export default App;