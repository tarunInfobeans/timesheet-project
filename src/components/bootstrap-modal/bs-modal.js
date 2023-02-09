import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect } from "react";
import { ProjectContext } from "../../contexts/projects.context";
import { projectColorCode } from "../../contexts/projectColorCode.context";
import InputField from "../input-field/input-field";
import "./bs-modal.styles.css";

const BsModal = ({
  show,
  setShow,
  dateClicked,
  // calendarComponent,
  strDate,
  endDate,
}) => {
  const { projects, setProject } = useContext(ProjectContext);
  const handleClose = () => setShow(false);
  // console.log("this is my calendar here", calendarComponent.current);
  const inputArray = [];
  // made changs in projectColorCode
  let count = 0;
  for (let project in projects) {
    projects[project].date.forEach((val, i) => {
      if (val == dateClicked) {
        inputArray.push([
          projectColorCode[count],
          projects[project].code,
          projects[project].hours[i],
        ]);
        count = count + 1;
      }
    });
  }

  const handleDeleteMethod = (newObj) => {
    setProject(newObj);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {dateClicked ? dateClicked : `${strDate} To ${endDate}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {inputArray.length ? <h5>Current Projects :-</h5> : <></>}
          {inputArray.map((val) => {
            console.log("these is my val", val);
            return (
              <div className="modal-project-wrapper">
                <InputField
                  projectColorCode={val[0]}
                  projectCode={val[1]}
                  projectHours={val[2]}
                  modalClass="modal-class-component"
                  dateFromModal={dateClicked}
                  handleDeleteMethod={handleDeleteMethod}
                />
              </div>
            );
          })}
          <h5 className="mt-2 mb-1">Add New Project Below :-</h5>
          <Form className="row">
            <Form.Group
              className="mb-3 col-6 "
              controlId="projectCode.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="Enter Project Code"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-4 "
              controlId="projectCode.ControlTextarea1"
            >
              <Form.Control type="text" placeholder="Enter The Hours" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BsModal;
