import React, { useState } from 'react'
import userService from '../services/userService'
import Banner from './NavBar';

export default function UpdatePassword() {

    const user = JSON.parse(localStorage.getItem("user"));

    const id = user.userId
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            userService.verifyPassword(id, oldPassword).then((response) => {
                if (response.data) {
                    userService.passwordReset(id, password);
                    alert("Votre mot de passe est modifié avec succès");
                    localStorage.setItem("user", null);
                    window.location = "/Login";
                } else {
                    alert("Le mot de passe actuel est invalide");
                }
            })
        } else {
            alert("Vérifiez le nouveau mot de passe, ainsi que sa confirmation")
        }

    }



    return (
        <div>
            <Banner />
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
                <div className="card" style={{ width: "40%", paddingLeft: "5%", paddingRight: "5%", paddingTop: "5%", paddingBottom: "0%" }}>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label style={{ fontSize: "1.5rem" }}>Saisissez votre mot de passe actuel</label>
                            <input
                                type="password"
                                required
                                className="form-control"
                                placeholder="Confirm password"
                                onChange={(e) => { setOldPassword(e.target.value) }}
                            />
                        </div>
                        <div className="mb-3">
                            <label style={{ fontSize: "1.5rem" }}>Saisissez le nouveau mot de passe</label>
                            <input
                                type="password"
                                required
                                className="form-control"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label style={{ fontSize: "1.5rem" }}>Confirmer le nouveau mot de passe</label>
                            <input
                                type="password"
                                required
                                className="form-control"
                                placeholder="Confirm password"
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                        </div>
                        <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
                            <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
                                <button type="submit" className="btn btn-lg btn-success" >Modifier le mot de passe</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
