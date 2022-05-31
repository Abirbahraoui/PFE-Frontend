import React from 'react'
import userService from '../services/userService'
import '../styles/UserRow.css'
import UpdateUser from './UpdateUser'

function UserRow(props) {

    const id = props.user.id
    const nom = props.user.nom
    const prenom = props.user.prenom
    const email = props.user.email
    const username = props.user.username
    const image = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
    const isAdmin = props.user.isAdmin

    const user = [id,nom,prenom,email,username,image,isAdmin]

    const userLocal = JSON.parse(localStorage.getItem("user")).userId===id;

    const Supprimer = async () => {
        userService.deleteUser(id);
        alert("l'utilisateur " + username + " est supprimé avec succès")
        window.location = "/Users";
    };

    return (
        <tr>
            <td style={{ textAlign: "center" }}>
                <img id='logo' src={image} alt='user' />
            </td>
            <td style={{ textAlign: "left" }}>
                <h6 id='candidateTitle'>{nom}</h6>
            </td>
            <td style={{ textAlign: "left" }}>
                <font className="text-muted" size="3">
                    <b>{prenom}</b><br />
                </font>
            </td>
            <td>
                <h6 id='candidateTitle'>{email}</h6>
            </td>
            <td style={{ textAlign: "center" }}>
                <div className='btn-group-vertical' id='voteButtons'>
                    <UpdateUser user={user}/>
                    <button className='btn btn-danger' id='downVoteBtn' onClick={() => Supprimer()} disabled={userLocal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default UserRow