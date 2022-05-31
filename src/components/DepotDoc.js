import React, { useState } from 'react'
import userService from '../services/userService'
import Banner from './NavBar';

function DepotDoc() {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [descriprtion, setDescription] = useState("");
    const [categorie, setCategorie] = useState("");
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user")).userId);

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const onChangeCategorie = (event) => {
        setCategorie(event.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let currentFile = selectedFiles[0];

        userService.depotDocument(userId, descriprtion, categorie, currentFile).then((response) => {
            alert(response.data)
            window.location = "/Dashboard"
        })

    }

    return (

        <div>
            <Banner />
            <div className='container' style={{ width: "40%" }}>
                <form onSubmit={onSubmit}>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Catégorie</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Catégorie du document" required onChange={onChangeCategorie} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea
                                type="text"
                                required
                                maxLength={250}
                                className="form-control"
                                placeholder="Description du document (max 250 caractères)"
                                onChange={onChangeDescription}
                            />
                        </div>
                    </div>
                    <fieldset className="row mb-3">
                        <div className="row mb-3">
                            <label className="col col-form-label">Séléctionner un fichier</label>
                            <div>
                                <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={selectFile} />
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
            </div>
        </div>
    )
}

export default DepotDoc
