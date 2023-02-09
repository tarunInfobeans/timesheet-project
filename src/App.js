import Badge from "react-bootstrap/Badge";
import Calendar from "./calendar/calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div>
      <h1 className="top-heading">
        <Badge
          className="align-center justify-content-md-center"
          md="auto"
          bg="dark"
        >
          Let's Do IT The E@zie WAY !!
        </Badge>
      </h1>
      <div className="mt-3 mx-2 my-2">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
