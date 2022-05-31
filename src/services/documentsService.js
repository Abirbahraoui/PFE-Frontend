import http from "../httpCommon";

class UploadFilesService {
    
  upload(file, description, categorie) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("categorie", categorie);
    return http.post("/documentUtils/addDocumentUtil", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*'
      },
      params: {
        "file": file,
        "description": description,
        "categorie": categorie
      }
    });
  }
  
  getFiles() {
    return http.get("/documentUtils/getAll");
  }

  getFilesByUser(id){
    return http.get("/depot/getUserDepot/"+id)
  }
}

export default new UploadFilesService();