import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ProgressBarContainer from "../progress-bar/progress-bar";

const ToolTipContainer = ({ projectCodes, projectHours }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ hide: 450, show: 300 }}
      overlay={(props) => (
        <Tooltip {...props} id="tooltip-here">
          Tooltip here xyz
        </Tooltip>
      )}
    >
      <ProgressBarContainer
        projectCodes={projectCodes}
        projectHours={projectHours}
      />
    </OverlayTrigger>
  );
};

export default ToolTipContainer;
