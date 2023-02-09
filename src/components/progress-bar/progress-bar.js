import "./progress-bar.styles.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useRef } from "react";

function StackedExample() {
  //   return (
  //     <ProgressBar>
  //       <ProgressBar
  //         striped
  //         variant="success"
  //         label={`qwerty`}
  //         now={35}
  //         key={1}
  //       />
  //       <ProgressBar striped variant="warning" label={`abcd`} now={20} key={2} />
  //       <ProgressBar striped variant="danger" label={`hjkl`} now={10} key={3} />
  //     </ProgressBar>
  //   );
}

const colorCode = ["success", "primary", "warning"];

const ProgressBarContainer = ({ projectCodes, projectHours }) => {
  const target = useRef(null);
  let sum = 0;
  for (let i = 0; i < projectHours.length; i++) {
    sum += projectHours[i];
  }
  console.log(
    "these are my props in progressBar component",
    projectCodes,
    projectHours
  );
  return (
    <div>
      <ProgressBar ref={target}>
        {projectCodes.map((val, i) => {
          console.log("in progress bar component");
          return (
            <ProgressBar
              striped
              variant={colorCode[i]}
              label={projectHours[i]}
              now={(projectHours[i] * 100) / sum}
              key={i}
              className="progress-bar-representation"
            />
          );
        })}
      </ProgressBar>
    </div>
  );
};

export default ProgressBarContainer;
