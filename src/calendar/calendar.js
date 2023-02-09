import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState, useContext, useRef } from "react";
import { ProjectContext } from "../contexts/projects.context";
import "./calendar.styles.css";
import InputField from "../components/input-field/input-field";
import BsModal from "../components/bootstrap-modal/bs-modal";
import {
  projectColorCode,
  projectColorHexCodes,
} from "../contexts/projectColorCode.context";
import ToolTipContainer from "../components/tooltip/tooltip";
import AddProject from "../components/add-project-modal/add-project";

const Calendar = () => {
  const { projects, novProject } = useContext(ProjectContext);
  const [show, setShow] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [dateClick, setDateClick] = useState("");
  const [strDate, setStrDate] = useState("");
  // const calendarComponentRef = useRef();
  const endDate = useRef("");
  console.log("lets check this xyz", projects);

  const getEvents = () => {
    let events = [];
    let count = 0;
    for (let project in projects) {
      projects[project].date.forEach((val, i) => {
        // changes made here
        events.push({
          projectCode: `${projects[project].code}`,
          hours: `${projects[project].hours[i]}`,
          date: `${val}`,
          colorCode: `${projectColorCode[count]}`,
        });
      });
      count = count + 1;
    }

    for (let i = 1; i < 31; i++) {
      let projectCodes = [],
        projectHours = [];
      for (let project in novProject) {
        let index = novProject[project].date.indexOf(
          i < 10 ? `2022-11-0${i}` : `2022-11-${i}`
        );
        if (index !== -1) {
          projectCodes.push(novProject[project].code);
          projectHours.push(novProject[project].hours[index]);
        }
      }
      if (projectCodes.length) {
        events.push({
          projectCodes,
          projectHours,
          date: `${i < 10 ? `2022-11-0${i}` : `2022-11-${i}`}`,
          month: "nov",
        });
      }
    }
    console.log("hey these are the events to push", events);
    return events;
  };

  const getPreviousDay = (date) => {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
  };

  useEffect(() => {
    let x = document.querySelector("div.top-header-additional-wrapper");
    if (x) {
      x.style.marginBottom = 0;
      x.innerHTML = ``;
    }

    function insertAfter(referenceNode, newNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    let elmnt = document.createElement("div");
    let count = 0;
    let liElmntsHere = "";
    for (let project in projects) {
      liElmntsHere += `<li style="color:${projectColorHexCodes[count]}"><div class="project-codes-bullet" style="background:${projectColorHexCodes[count]}"></div>${projects[project].code}</li>`;
      count = ++count;
    }
    elmnt.innerHTML = `<div class="top-header-additional-wrapper">
        <div class="project-code-wrapper">
          <span>Project Code :--</span>
          <ul class="bullet-color-code">${liElmntsHere}</ul>
        </div>
        <div class="project-addition-wrapper">
          <button class="btn btn-light" id="add-remove-project">
            Add/Remove
          </button>
        </div>
      </div>`;
    let div = document.querySelector("div.fc-header-toolbar");
    insertAfter(div, elmnt);
    document
      .getElementById("add-remove-project")
      .addEventListener("click", () => {
        setShowProjectModal(true);
      });
  }, [projects]);

  const handleDateClickHere = (arg) => {
    setStrDate("");
    endDate.current = "";
    setDateClick(arg.dateStr);
    setShow(true);
  };

  const handleMultiSelect = (arg) => {
    setDateClick("");
    setStrDate(arg.startStr);
    const x = getPreviousDay(new Date(arg.end)).toLocaleDateString().split("/");
    endDate.current = x[2] + "-" + x[0] + "-" + `${x[1] < 10 ? 0 : ""}` + x[1];
    setShow(true);
    console.log("this is after multiselect", arg);
    console.log(
      "in calendar component this is strdate & enddate",
      strDate,
      endDate
    );
  };

  const renderEventContent = (arg) => {
    if (arg.event._def.extendedProps.month == "nov") {
      return (
        <ToolTipContainer
          projectCodes={arg.event._def.extendedProps.projectCodes}
          projectHours={arg.event._def.extendedProps.projectHours}
        />
      );
    }
    console.log("this is the argument here xzzz", arg);
    return (
      <InputField
        projectColorCode={arg.event._def.extendedProps.colorCode}
        projectCode={arg.event._def.extendedProps.projectCode}
        projectHours={arg.event._def.extendedProps.hours}
        displayClass="d-none"
      />
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        initialDate={new Date(2022, 11, 1)}
        events={getEvents()}
        eventContent={(arg) => {
          return renderEventContent(arg);
        }}
        dateClick={(arg) => {
          handleDateClickHere(arg);
        }}
        selectable={true}
        select={(arg) => {
          handleMultiSelect(arg);
        }}
      />
      <BsModal
        show={show}
        setShow={setShow}
        dateClicked={dateClick}
        // calendarComponent={calendarComponentRef}
        strDate={strDate}
        endDate={endDate.current}
      />
      <AddProject show={showProjectModal} setShow={setShowProjectModal} />
    </div>
  );
};

export default Calendar;
