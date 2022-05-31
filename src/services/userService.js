import http from "../httpCommon";

class userService {

    signup(nomUser, prenomUser, emailUser, username, passwordUser, imageUser){
        let formData = new FormData();
        formData.append("nomUser", nomUser);
        formData.append("prenomUser", prenomUser)
        formData.append("emailUser", emailUser)
        formData.append("username", username)
        formData.append("passwordUser", passwordUser)
        formData.append("imageUser", imageUser)
        return http.post("/user/addUser", null, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                "nomUser": nomUser,
                "prenomUser": prenomUser,
                "emailUser": emailUser,
                "username": username,
                "passwordUser": passwordUser,
                "imageUser": imageUser
            }
        })
    }

    login(username, password) {
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        return http.post("/user/login", null, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                "username": username,
                "password": password
            }
        });
    }

    depotDocument(id, description, categorie, file){
        let formData = new FormData();
        formData.append("idUser", id);
        formData.append("description", description);
        formData.append("categorie", categorie);
        formData.append("file", file);
        return http.post("/depot/addDocumentDepot", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                "idUser": id,
                "description": description,
                "cateorie": categorie,
                "file": file
            }
        })
    }

    getAllUsers(){
        return http.get("/user/getAllUsers");
    }

    getUSerById(id){
        return http.get("/user/getUserById/"+id)
    }

    modifyUser(id, nomUser, prenomUser, emailUser, username, imageUser){
        let formData = new FormData();
        formData.append("nomUser", nomUser);
        formData.append("prenomUser", prenomUser)
        formData.append("emailUser", emailUser)
        formData.append("username", username)
        formData.append("imageUser", imageUser)
        return http.put("/user/modifyUser/"+id, null, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                "nomUser": nomUser,
                "prenomUser": prenomUser,
                "emailUser": emailUser,
                "username": username,
                "imageUser": imageUser
            }
        })
    }

    deleteUser(id){
        return http.delete("/user/deleteUser/"+id);
    }

    verifyPassword(id, password){
        let formData = new FormData();
        formData.append("password", password)
        return http.post("/user/verifyPassword/"+id, null, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                "password": password
            }
        })
    }

    passwordReset(id, password){
        let formData = new FormData();
        formData.append("password", password)
        return http.put("/user/passwordReset/"+id+'?'+password, null, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                "password": password
            }
        })
    }

}

export default new userService();