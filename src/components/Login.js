import React, { Component } from 'react'
import Logo from '../assets/tenstep-logo.png'
import userService from '../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user: undefined,
        }
        // localStorage.setItem("user", null);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        
    }

    componentDidMount() {
        this.setState({ username: '', password: ''})
        localStorage.setItem("user", null);
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value, });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value, });
    }

    async onSubmit(e) {
        e.preventDefault();

        await userService.login(this.state.username, this.state.password).then((response) => {
            this.props.setUser(response.data);
            console.log("res : "+response.data)
        })
    }

    render() {
        return (
            <div className='container' style={{ display: "flex", justifyContent: "center", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="card" style={{ width: "40%", padding: "5%" }}>
                    <img src={Logo} alt="logo" />
                    <form onSubmit={(e) => { this.onSubmit(e) }} style={{ marginTop: "10%" }}>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: "1.5rem" }}>Pseudo</label>
                            <input type="text" className="form-control" placeholder='Votre pseudo' required onChange={(e) => this.onChangeUsername(e)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontSize: "1.5rem" }}>Mot de passe</label>
                            <input type="password" className="form-control" placeholder='Votre mot de passe' onChange={(e) => this.onChangePassword(e)} />
                        </div>

                        <div className="mb-3" style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}>
                            <button type="submit" className="btn btn-lg btn-primary" >Connexion</button>
                        </div>
                        <div className="mb-3">
                            <span style={{ fontSize: "1rem" }}>Vous n'avez pas de compte? <a href='/AddUser'>S'inscrire ici</a></span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login