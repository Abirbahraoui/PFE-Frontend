import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { Loader } from "rimble-ui";
import history from '../history'
import DocuemntUtilsRow from './DocuemntUtilsRow';
import UploadService from '../services/documentsService'
import Banner from './NavBar';

let Document = (props) => (
    <DocuemntUtilsRow document={props.document} />
);

class DocumentUtils extends Component {
    constructor() {
        super();
        const user = JSON.parse(localStorage.getItem("user"))
        this.state = {
            data: [],
            loading: false,
            isAdmin: user.isAdmin
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

        UploadService.getFiles().then((response) => {
            allDocuments = response.data;

            for (let i = 0; i < allDocuments.length; i++) {
                documentDetails[i] = []
                documentDetails[i].name = allDocuments[i].nomDocument;
                documentDetails[i].description = allDocuments[i].descriptionDocument
                documentDetails[i].type = allDocuments[i].categorieDocument
                documentDetails[i].downloadLink = allDocuments[i].urlDocument

                documentComponents[i] = (
                    <DocuemntUtilsRow
                        key={i}
                        document={documentDetails[i]}
                    />
                );
            }
            this.setState({ data: documentComponents, loading: false })
        });
    }

    render() {
        return (
            <div>
                <Banner />
                <div className="container">


                    <div>
                        <div style={{ float: "right", marginBottom: "10px" }}>
                            <img
                                style={{ width: "25px", marginRight: "20px", cursor: "pointer" }}
                                onClick={this.loadData}
                                src="https://img.icons8.com/color/50/000000/synchronize.png"
                                alt="refresh projects"
                            />
                            {this.state.isAdmin ? (
                                <Router history={history}>
                                    <Link to="/AddDocumentUtil">
                                        <img
                                            style={{ width: "25px", cursor: "pointer" }}
                                            src="https://img.icons8.com/color/48/000000/plus-math.png"
                                            alt="Add Project"
                                        />
                                    </Link>
                                </Router>
                            ) : (
                                <div></div>
                            )}

                        </div>
                    </div>

                    <table className="table table-hover">
                        <thead>
                            <tr style={{ width: "100%", height: "auto", textAlign: "center" }}>
                                <th colSpan={6}>Liste des documents utils</th>
                            </tr>
                            <tr>
                                <th style={{ width: "20%", textAlign: "left" }}>Titre</th>
                                <th style={{ width: "50%", textAlign: "left" }}>Description</th>
                                <th style={{ width: "10%", textAlign: "left" }}>Catégorie</th>
                                <th style={{ width: "20%", textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data}
                        </tbody>

                    </table>
                    <center>{this.state.loading ? <Loader size="40px" /> : <></>}</center>
                </div>
            </div>
        )
    }
}

export default DocumentUtils