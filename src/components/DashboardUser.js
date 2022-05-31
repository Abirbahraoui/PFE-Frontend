import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { Loader } from "rimble-ui";
import history from '../history';
import documentsService from '../services/documentsService';
import DocumentRowUser from './DocumenntRowUser';

let Document = (props) => (
    <DocumentRowUser document={props.document} />
);

class DashboardUser extends Component {
    constructor(props) {
        super(props);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        this.state = {
            data: [],
            loading: false,
            isAdmin: userLocal.isAdmin,
            userId: userLocal.userId
        }
    }

    loader = false;

    componentDidMount(){
        this.init();
    }

    async init(){
        await this.loadData();
    }

    loadData = async () => {
        this.setState({ loading: true });

        let allDocuments = []
        let documentComponents = [], documentDetails = []

        documentsService.getFilesByUser(this.state.userId).then((response)=>{
            allDocuments = response.data;
            for (let i = 0; i < allDocuments.length; i++) {
                documentDetails[i]=[]
                let document = allDocuments[i]
                documentDetails[i].name = allDocuments[i].documentDepot.nomDocument;
                documentDetails[i].description = allDocuments[i].documentDepot.descriptionDocument
                documentDetails[i].type = allDocuments[i].documentDepot.categorieDocument
                documentDetails[i].statut = allDocuments[i].statut
                documentDetails[i].download = allDocuments[i].documentDepot.urlDocument
                documentDetails[i].date = allDocuments[i].depotDate
                console.log("date : "+ allDocuments[i].depotDate)
    
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
            <div className="container">

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
                            <th colSpan={6}>Liste des documents de l'utilisateur</th>
                        </tr>
                        <tr>
                            <th style={{ width: "15%", textAlign: "left" }}>Titre</th>
                            <th style={{ width: "40%", textAlign: "left" }}>Description</th>
                            <th style={{ width: "15%", textAlign: "center" }}>Catégorie</th>
                            <th style={{ width: "15%", textAlign: "center" }}>Date</th>
                            <th style={{ width: "10%", textAlign: "center" }}>Statut</th>
                            <th style={{ width: "5%", textAlign: "center" }}>Téléchargement</th>
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

export default DashboardUser