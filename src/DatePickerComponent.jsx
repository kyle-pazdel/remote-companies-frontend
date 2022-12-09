import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePickerComponent(props) {
  // const [startDate, setStartDate] = useState(null);
  // console.log(startDate);
  // const [endDate, setEndDate] = useState(null);

  const handleStartChange = (event) => {
    props.start(event.target.value);
  };
  return (
    <div>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          Start Date
        </span>
        <DatePicker
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          isClearable
          filterDate={(d) => {
            return new Date() <= d;
          }}
          placeholderText="Select Start Date"
          // selected={props.start}
          selectsStart
          // startDate={props.start}
          // endDate={props.end}
          // onChange={(date) => props.setStart(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mmaa"
          // dateFormat="Pp"
          allowSameDay={true}
          // value={props.start}
          // onChange={handleStartChange}
        />
      </div>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          End Date
        </span>
        <DatePicker
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          isClearable
          filterDate={(d) => {
            return new Date() <= d;
          }}
          placeholderText="Select End Date"
          // selected={props.end}
          selectsEnd
          // startDate={props.end}
          // endDate={props.end}
          // minDate={props.start}
          // onChange={(date) => props.setEnd(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mmaa"
          // dateFormat="Pp"
          allowSameDay={true}
        />
      </div>
      {/* <div>
        <p>Selected start date: {props.start ? props.start.toString() : null}</p>
        <p>Selected end date: {props.end ? props.end.toString() : null}</p>
      </div> */}
    </div>
  );
}
