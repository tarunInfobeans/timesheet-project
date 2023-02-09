import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { ProjectContext } from "../../contexts/projects.context";
import { BsFillTrashFill } from "react-icons/bs";
import "./input-field.styles.css";

const InputField = ({
  projectColorCode,
  projectCode,
  projectHours,
  displayClass,
  modalClass,
  dateFromModal,
  handleDeleteMethod,
}) => {
  const { projects } = useContext(ProjectContext);
  const [codeValue, setCodeValue] = useState(projectCode);
  const [hoursValue, setHoursValue] = useState(projectHours);
  const handleInputClick = (e) => {
    e.target.focus();
  };

  const handleDeleteClick = (e) => {
    console.log("dateFromModal", dateFromModal, e);
    let newProjectContext = projects;
    for (let project in newProjectContext) {
      if (newProjectContext[project].code == projectCode) {
        newProjectContext[project].hours = newProjectContext[
          project
        ].hours.filter((val, i) => {
          return i != newProjectContext[project].date.indexOf(dateFromModal);
        });
        newProjectContext[project].date = newProjectContext[
          project
        ].date.filter((val) => {
          return dateFromModal != val;
        });
      }
    }
    console.log("here i am", newProjectContext);
    handleDeleteMethod(newProjectContext);
  };

  const handleInputChange = (e) => {
    if (e.target.getAttribute("aria-label") == "project code") {
      setCodeValue(e.target.value);
    } else if (e.target.getAttribute("aria-label") == "hours") {
      setHoursValue(e.target.value);
      const x =
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
          "data-date"
        );

      for (let project in projects) {
        if (projects[project].code == projectCode) {
          projects[project].hours[projects[project].date.indexOf(x)] =
            e.target.value;
        }
      }
    }
  };

  return (
    <>
      <InputGroup className={`mb-1 row m-0 p-0 ${modalClass}`}>
        <Form.Control
          className={`bg-${projectColorCode} fs-9  text-white text-center pl-0 pr-0 py-1`}
          aria-label="project code"
          value={codeValue}
          onClick={(e) => {
            handleInputClick(e);
          }}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <Form.Control
          className={`bg-${projectColorCode}  fs-9 text-white text-center p-1 py-1`}
          aria-label="hours"
          value={hoursValue}
          onClick={(e) => {
            handleInputClick(e);
          }}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <InputGroup.Text className={`${displayClass}`}>
          <BsFillTrashFill
            onClick={(e) => {
              handleDeleteClick(e);
            }}
          />
        </InputGroup.Text>
      </InputGroup>
    </>
  );
};

export default InputField;
