import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { Loader } from "rimble-ui";
import DocumentRow from './DocumentRow';
import history from '../history'
import adminService from '../services/adminService'

let Document = (props) => (
    <DocumentRow document={props.document} />
);

export default class DashboardAdmin extends Component {
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

    loader = false;

    componentDidMount() {
        this.init();
    }

    async init() {
        await this.loadData();
    }

    loadData = async () => {
        this.setState({ loading: true });

        let allDocuments = []
        let documentComponents = [], documentDetails = []

        adminService.getAllDepots().then((response)=>{
            allDocuments = response.data;
            // console.log("response : " + allDocuments[3].userDepots.nomUser) 
            for (let i = 0; i < allDocuments.length; i++) {
                documentDetails[i] = []
                documentDetails[i].id = allDocuments[i].depotId;
                documentDetails[i].name = allDocuments[i].documentDepot.nomDocument;
                documentDetails[i].description =  allDocuments[i].documentDepot.descriptionDocument
                documentDetails[i].sender = allDocuments[i].userDepots.emailUser
                documentDetails[i].type = allDocuments[i].documentDepot.categorieDocument
                documentDetails[i].statut = allDocuments[i].statut
                documentDetails[i].download = allDocuments[i].documentDepot.urlDocument
                documentDetails[i].date = allDocuments[i].depotDate
    
                documentComponents[i] = (
                    <Document
                        key={i}
                        document={documentDetails[i]}
                    />
                );
            }
            this.setState({ data: documentComponents, loading: false })
        })
        
    }

    render() {
        return (
            <div>
                <div style={{ float: "right", marginBottom: "10px" }}>
                    <img
                        style={{ width: "25px", marginRight: "20px", cursor: "pointer" }}
                        onClick={this.loadData}
                        src="https://img.icons8.com/color/50/000000/synchronize.png"
                        alt="refresh projects"
                    />
                    <Router history={history}>
                        <Link to="/Depot">
                            <img
                                style={{ width: "25px", cursor: "pointer" }}
                                src="https://img.icons8.com/color/48/000000/plus-math.png"
                                alt="Add Project"
                            />
                        </Link>
                    </Router>
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr style={{ width: "100%", height: "auto", textAlign: "center" }}>
                            <th colSpan={8}>Liste des documents</th>
                        </tr>
                        <tr>
                            <th style={{ width: "10%", textAlign: "left" }}>Titre</th>
                            <th style={{ width: "30%", textAlign: "left" }}>Description</th>
                            <th style={{ width: "15%", textAlign: "left" }}>Propriétaire</th>
                            <th style={{ width: "5%", textAlign: "center" }}>Catégorie</th>
                            <th style={{ width: "15%", textAlign: "center" }}>Date</th>
                            <th style={{ width: "10%", textAlign: "center" }}>Statut</th>
                            <th style={{ width: "5%", textAlign: "center" }}>Editer</th>
                            <th style={{ width: "5%", textAlign: "center" }}>Télécharger</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data}
                    </tbody>

                </table>
                <center>{this.state.loading ? <Loader size="40px" /> : <></>}</center>
            </div>
        )
    }
}
