import "./add-project.styles.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { BsFillTrashFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { ProjectContext } from "../../contexts/projects.context";
import { projectColorCode } from "../../contexts/projectColorCode.context";

const AddProject = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const { projects, setProject } = useContext(ProjectContext);
  const [newProject, setNewProject] = useState("");
  const [newProjectHours, setNewProjectHours] = useState("");
  const [repeatDaysArray, setRepeatDaysArray] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const projectCodes = [];
  for (let project in projects) {
    projectCodes.push(projects[project].code);
  }
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  function getAllDaysInMonth(year, month) {
    const date = new Date(2022, 11, 1);
    const dates = [];
    while (date.getMonth() === 11) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  const now = new Date();

  const handleSave = () => {
    console.log(newProject, newProjectHours, repeatDaysArray);
    const allDates = getAllDaysInMonth(now.getFullYear(), now.getMonth());
    console.log(allDates.length);
    const newProjectObj = {
      code: newProject,
      date: [],
      hours: [],
    };
    const newProjectObjName = `project${Math.floor(Math.random() * 10000)}`;
    for (let i = 0; i < allDates.length; i++) {
      const newDate = new Date(allDates[i]);
      console.log("checking the dates here", newDate.getDay());
      if (repeatDaysArray[newDate.getDay()] == true) {
        console.log("inside the if statement");
        newProjectObj.date.push(
          `${newDate.getFullYear()}-${newDate.getMonth() < 9
            ? `0${newDate.getMonth() + 1}`
            : `${newDate.getMonth() + 1}`
          }-${newDate.getDate() < 10
            ? `0${newDate.getDate()}`
            : `${newDate.getDate()}`
          }`
        );
        newProjectObj.hours.push(newProjectHours);
      }
    }
    const updatedProject = { ...projects, [newProjectObjName]: newProjectObj };
    console.log("this is the new project object", updatedProject);
    setProject(updatedProject);
    setShow(false);
  };

  const handleCheckBoxes = (e) => {
    let repeatArray = [...repeatDaysArray];
    switch (e.target.parentElement.childNodes[1].innerText) {
      case "SUN":
        repeatArray[0] = e.target.checked;
        break;
      case "MON":
        repeatArray[1] = e.target.checked;
        break;
      case "TUE":
        repeatArray[2] = e.target.checked;
        break;
      case "WED":
        repeatArray[3] = e.target.checked;
        break;
      case "THU":
        repeatArray[4] = e.target.checked;
        break;
      case "FRI":
        repeatArray[5] = e.target.checked;
        break;
      case "SAT":
        repeatArray[6] = e.target.checked;
        break;
    }
    setRepeatDaysArray(repeatArray);
    console.log(repeatArray);
  };

  const handleIconClick = (e) => {
    console.log(
      "in handleIconClick",
      e.target.parentElement.parentElement.childNodes[0].innerText
    );
    const newProjectObj = {};
    for (let project in projects) {
      if (
        projects[project].code !=
        e.target.parentElement.parentElement.childNodes[0].innerText
      ) {
        newProjectObj[project] = projects[project];
      }
    }
    setProject(newProjectObj);
    console.log("the new object is", newProjectObj);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add / Remove Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <h5 className="mb-3">Add New Project :-</h5>
          <Form className="row">
            <Form.Group
              className="mb-3 col-6 "
              controlId="projectCode.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="Enter Project Code"
                value={newProject}
                onChange={(e) => {
                  setNewProject(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-4"
              controlId="projectCode.ControlTextarea1"
            >
              <Form.Control
                type="text"
                placeholder="Enter The Hours"
                value={newProjectHours}
                onChange={(e) => {
                  setNewProjectHours(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <h6 className="mb-2">Repeat On :-</h6>
          <div className="container row top-most">
            {weekDays.map((val) => {
              return (
                <label key={val}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      handleCheckBoxes(e);
                    }}
                  />
                  <span>{val}</span>
                </label>
              );
            })}
          </div>
          <h5 className="mt-3 mb-2">Remove Project :-</h5>

          <div className="remove-project-modal-wrapper">
            {projectCodes.map((val, i) => {
              return (
                <h4>
                  <Badge bg={`${projectColorCode[i]}`}>{val}</Badge>
                  <BsFillTrashFill onClick={(e) => handleIconClick(e)} />
                </h4>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProject;
