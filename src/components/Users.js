import React, { Component } from 'react'
import { Loader } from "rimble-ui";
import UserRow from './UserRow';
import userService from '../services/userService'
import Banner from './NavBar';

let User = (props) => (
    <UserRow user={props.user} />
);

class Users extends Component {
    constructor() {
        super();
        const userLocal = JSON.parse(localStorage.getItem("user"));
        this.state = {
            data: [],
            loading: false,
            isAdmin: userLocal.isAdmin,
        }
    }

    loader = false;

    componentDidMount() {
        this.init();
    }

    async init() {
        await this.loadData();
    }

    loadData = async () => {
        this.setState({ loading: true });

        let allUsers = []
        let userComponents = [], userDetails = []

        userService.getAllUsers().then((response)=>{
            allUsers = response.data;
            for (let i = 0; i < allUsers.length; i++) {
                userDetails[i] = []
                // allUsers[i]
                userDetails[i].id= allUsers[i].userId
                userDetails[i].nom = allUsers[i].nomUser
                userDetails[i].prenom = allUsers[i].prenomUser
                userDetails[i].email = allUsers[i].emailUser
                userDetails[i].username = allUsers[i].username
                userDetails[i].userImage = allUsers[i].imageUser
                userDetails[i].isAdmin = allUsers[i].isAdmin
                
                userComponents[i] = (
                    <User
                        key={i}
                        user={userDetails[i]}
                    />
                );
            }
            this.setState({ data: userComponents, loading: false, })
        })

        
    }

    render() {
        return (
            <div>
                <Banner/>
                <div>
                    {this.state.isAdmin ? (
                    <div className="container">
                    <div style={{ float: "right", marginBottom: "10px" }}>
                        <img
                            style={{ width: "25px", marginRight: "20px", cursor: "pointer" }}
                            onClick={this.loadData}
                            src="https://img.icons8.com/color/50/000000/synchronize.png"
                            alt="refresh projects"
                        />
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{ width: "10%", textAlign: "left" }}>User image</th>
                                <th style={{ width: "20%", textAlign: "left" }}>Nom</th>
                                <th style={{ width: "20%", textAlign: "left" }}>Prenom</th>
                                <th style={{ width: "30%", textAlign: "left" }}>E-mail</th>
                                <th style={{ width: "20%", textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data}
                        </tbody>

                    </table>
                    <center>{this.state.loading ? <Loader size="40px" /> : <></>}</center>
                </div>
                ):(
                    <div>
                        Cette page est dédiée aux administrateurs seulement
                    </div>
                )}
                </div>
            </div>
        )
    }
}

export default Users