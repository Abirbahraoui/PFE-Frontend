import '../styles/Banner.css'
import React, { useState } from 'react';
import Logo from '../assets/tenstep-logo-blanc.png'
import { Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/DropdownItem';


function Banner(props) {
	const user = JSON.parse(localStorage.getItem("user"));

	const onDisconnect = () => {
		localStorage.setItem("user", null);
		window.location = "/Login"
	}

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#343c7c", marginBottom: "1%" }}>
				<a className="navbar-brand" href="Dashboard">
					<img src={Logo} width="100%" height="30" className="d-inline-block align-top" alt="TenStep" />
				</a>
				<div className="collapse navbar-collapse" id="navbarNav">

					{user.isAdmin ? (
						<ul className="navbar-nav">
							<li className="nav-item ">
								<a className="nav-link" href="/Dashboard" style={{ color: "#ffffff" }}>Depots</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/Users" style={{ color: "#ffffff" }}>Utilisateurs</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/Downloads" style={{ color: "#ffffff" }}>Téléchargements</a>
							</li>
						</ul>
					) : (
						<ul className="navbar-nav">
							<li className="nav-item ">
								<a className="nav-link" href="/Dashboard" style={{ color: "#ffffff" }}>Dépots</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/Downloads" style={{ color: "#ffffff" }}>Téléchargements</a>
							</li>
						</ul>
					)}

				</div>

				<div style={{ float: "right" }}>
					<Dropdown>
						<Dropdown.Toggle id="dropdown-button-dark-example1" variant="info">
							Profil
						</Dropdown.Toggle>

						<Dropdown.Menu variant="dark">
							<Dropdown.Item disabled>
								<img src={user.imageUser} alt="" style={{ marginRight: "5%" }} width="auto" height="50" className="d-inline-block align-text-center" />
								<font className="text-muted" size="3">
									<b>{user.username}</b><br />
								</font>
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item href="/updateSelf">Modifier votre profil</Dropdown.Item>
							<Dropdown.Item href="/updatePassword">Modifier votre mot de passe</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item onClick={onDisconnect}>Déconnexion</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</nav>
		</div>
	)
}


export default Banner