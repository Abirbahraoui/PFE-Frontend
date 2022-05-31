import React, { Component } from 'react'
import DashboardUser from './DashboardUser'
import DashboardAdmin from './DashboardAdmin';
import Banner from './NavBar';

class Dashboard extends Component {
    constructor() {
        super();
        const userLocal = JSON.parse(localStorage.getItem("user"));
        this.state = {
            data: [],
            loading: false,
            isAdmin: userLocal.isAdmin,
            userId: userLocal.userId
        }
    }

    render() {
        return (
            <div >
                <Banner />
                <div  style={{width:"70%", marginLeft:"15%", marginRight:"15%"}}>
                    {this.state.isAdmin ? (
                        <DashboardAdmin />
                    ) : (<div>
                        <DashboardUser userId={this.state.userId}/>
                    </div>)}
                </div>
            </div>
        )
    }
}

export default Dashboard