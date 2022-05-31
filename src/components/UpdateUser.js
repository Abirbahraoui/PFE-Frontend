import React, { useState } from 'react'
import { Button, Modal } from 'rimble-ui'
import adminService from '../services/adminService'
import userService from '../services/userService'

function UpdateUser(props) {

    let [isOpen, setIsOpen] = useState(false)
    const userId = props.user[0]
    let [nom, setNom] = useState(props.user[1])
    let [prenom, setPrenom] = useState(props.user[2])
    let [email, setEmail] = useState(props.user[3])
    let [username, setUsername] = useState(props.user[4])
    let [image, setImage] = useState(props.user[5])
    const isAdmin = props.user[6]


    const setAdmin = (e) => {
        adminService.setAdmin(userId)
        alert("Modifié " + nom)
        window.location = "/Users";
    }

    const removeAdmin = (e) => {
        const userLocal = JSON.parse(localStorage.getItem("user"));
        adminService.removeAdmin(userId)
        alert("Modifié " + nom)
        if(userId=== userLocal.userId){
            localStorage.setItem("isConnected", false)
            window.location = "/Login";
        }
        else 
            window.location = "/Users";
    }

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

    const openModal = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };


    const closeModal = (e) => {
        e.preventDefault();
        setIsOpen(false);
    };

    const onSubmit = async (e) => {
        userService.modifyUser(userId, nom, prenom, email, username, image);
        alert("Modifié " + nom)
        window.location = "/Users";
    }

    return (
        <div className='btn-group-vertical' id='voteButtons'>
            <button className='btn btn-warning' id='upVoteBtn' onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
            </button>
            <Modal isOpen={isOpen}>


                <div className="container card">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h5 style={{ marginTop: "6%" }}>Modifier l'utilisateur</h5>
                        <Button.Text
                            icononly
                            icon={"Close"}
                            color={"moon-gray"}
                            position={"absolute"}
                            top={0}
                            right={0}
                            mt={3}
                            mr={3}
                            onClick={closeModal}
                        />
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
                            <div className='btn-group' style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <button
                            disabled={isAdmin}
                                className="btn btn-primary"
                                style={{ width: 100 }}
                                onClick={setAdmin}
                            >
                                Définir comme admin
                            </button>
                            <button
                            disabled={!isAdmin}
                            className="btn btn-warning"
                            style={{ width: 100 }}
                            onClick={removeAdmin}
                        >
                            Supprimer admin
                        </button>
                        </div>
                        
                        <br />
                </div>
            </Modal>
        </div>
    )
}

export default UpdateUser