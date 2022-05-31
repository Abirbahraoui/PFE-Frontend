import http from "../httpCommon";

class adminService {

    getAllDepots() {
        return http.get("/depot/getAll");
    }

    refuseDepot(id) {
        return http.put("/depot/updateStatutRefused/" + id)
    }

    signDepot(id, file) {
        let formData = new FormData();
        formData.append("file", file);
        return http.put("/depot/updateStatutSigned/" + id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                "file": file
            }
        });
    }

    setAdmin(id){
        return http.put("/user/setAdmin/"+id);
    }

    removeAdmin(id){
        return http.put("/user/removeAdmin/"+id);
    }
}

export default new adminService();