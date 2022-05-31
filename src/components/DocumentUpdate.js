import React, { useState } from "react";
import { Box, Flex, Modal, Button, Card, Radio } from "rimble-ui";
import adminService from "../services/adminService";

function DocumentUpdate(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [statut, setStatut] = useState('waiting');
  const [isChanged, setIsChanged] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(undefined);

  const selectFile = (event) => {
    setIsChanged(true)
    setSelectedFiles(event.target.files);
}

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const statutUpdate = async () => {
    if(statut==='refused'){
      adminService.refuseDepot(props.docId)
    } else {
      let currentFile = selectedFiles[0];
      adminService.signDepot(props.docId, currentFile)
    }

    alert("modifié : " + statut)
    window.location = "/Dashboard";
  }

  let document = []

  document.push(
    <div key={0}>
      <Radio
        name="statut"
        key={0}
        label={"Signé"}
        my={2}
        value={"signed"}
        onClick={()=>{setStatut('signed')}}
      />
    </div>
  );

  document.push(
    <div key={1}>
      <Radio
        name="statut"
        key={1}
        label={"Refusé"}
        my={2}
        value={"refused"}
        onClick={()=>{setStatut('refused');setIsChanged(true)}}
      />
    </div>
  );

  return (
    <Box className="App" p={0}>
      <Box>
        <button className="btn" style={{background:"#FA897B"}} onClick={openModal}>Editer</button>

        <Modal isOpen={isOpen}>
          <Card width={"420px"} p={0}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h5 style={{ marginTop: "6%" }}>Editer statut</h5>
              {/* Close icon to close the modal */}
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

            <Box p={4} mb={3}>
              Sélectionnez un statut {document}

              {statut === 'signed' ? (<div>
                <fieldset className="row mb-3">
                  <div className="row mb-3">
                    <label className="col col-form-label">Séléctionner un fichier</label>
                    <div>
                      <input type="file" className="form-control" required  onChange={selectFile} />
                    </div>
                  </div>
                </fieldset>
              </div>) : (
                <div></div>
              )}
            </Box>
            <Flex
              px={4}
              py={3}
              borderTop={1}
              borderColor={"#E8E8E8"}
              justifyContent={"center"}
            >
              {isChanged ? (<div>
                <Button.Outline
                  onClick={() => {
                    statutUpdate();
                  }}
                >
                  Editer
                </Button.Outline>
              </div>) : (
                <Button.Outline
                  onClick={() => {
                    alert("Statut ou fichier manquant");
                  }}
                >
                  Editer
                </Button.Outline>
              )}
            </Flex>

          </Card>
        </Modal>
      </Box>
    </Box>
  );
}

export default DocumentUpdate;