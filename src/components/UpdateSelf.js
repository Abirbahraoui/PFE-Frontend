import React, { useState } from 'react'
import { Button, Modal } from 'rimble-ui'
import adminService from '../services/adminService'
import userService from '../services/userService'
import Banner from './NavBar';

function UpdateSelf(props) {

    let user = JSON.parse(localStorage.getItem("user"));

    const id = user.userId
    let [nom, setNom] = useState(user.nomUser)
    let [prenom, setPrenom] = useState(user.prenomUser)
    let [email, setEmail] = useState(user.emailUser)
    let [username, setUsername] = useState(user.username)
    let [image, setImage] = useState(user.imageUser)

    const onChangeNom = (e) => {
        setNom(e.target.value)
    }

    const onChangePrenom = (e) => {
        setPrenom(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangeImage = (e) => {
        setImage(e.target.value)
    }

    const onSubmit = async (e) => {
        userService.modifyUser(id, nom, prenom, email, username, image);
        user.nomUser=nom;
        user.prenomUser=prenom;
        user.emailUser=email;
        user.username=username;
        user.imageUser=image;
        localStorage.setItem("user", JSON.stringify(user))
        alert("Modifié " + nom)
        window.location = "/Users";
    }

    return (
        <div>
            <Banner />
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
                <div className="card" style={{ width: "40%", paddingLeft: "5%", paddingRight: "5%", paddingTop: "5%", paddingBottom: "0%" }}>
                    <div style={{display: "flex", justifyContent:"center"}}>
                        <img src={user.imageUser} alt="" style={{ marginRight: "2%" }} width="80" height="auto" className="d-inline-block align-text-center"/>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Nom</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                placeholder="Nom de l'utilisateur"
                                defaultValue={nom}
                                onChange={onChangeNom}
                            />
                        </div>

                        <div className="form-group">
                            <label>Prenom</label>
                            <textarea
                                type="text"
                                required
                                className="form-control"
                                placeholder="Prenom de l'utilisateur"
                                defaultValue={prenom}
                                onChange={onChangePrenom}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type="email"
                                required
                                className="form-control"
                                placeholder="Email de l'utilisateur"
                                defaultValue={email}
                                onChange={onChangeEmail}
                            />
                        </div>

                        <div className="form-group">
                            <label>Pseudo</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                placeholder="Pseudo"
                                defaultValue={username}
                                onChange={onChangeUsername}
                            />
                        </div>

                        <div className="form-group">
                            <label>Image de l'utilisateur</label>
                            <input
                                type="url"
                                required
                                className="form-control"
                                placeholder="URL de l'image de l'utilisateur"
                                defaultValue={image}
                                onChange={onChangeImage}
                            />
                        </div>

                        <br />

                        <div className='btn-group' style={{ display: "flex", justifyContent: "center" }}>
                            <button
                                className="btn btn-success"
                                style={{ width: "30%" }}
                                type="submit"
                            >
                                Modifier
                            </button>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateSelf