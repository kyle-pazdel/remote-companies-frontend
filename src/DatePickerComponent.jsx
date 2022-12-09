import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePickerComponent(props) {
  const handleStartChange = (event) => {
    props.date(event.target.value);
  };

  return (
    <div>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          Start Date
        </span>
        <DatePicker selected={props.date} onChange={(date) => props.setDate(date)} />
        {/* <DatePicker
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          isClearable
          placeholderText="Select a date"
          selected={props.date}
          selectsStart
          startDate={props.date}
          onChange={(date) => props.setDate(date)}
          // dateFormat="%m/%d/%Y"
          dateFormat="MMMM d, yyyy h:mmaa"
          // dateFormat="Pp"
          allowSameDay={true}
          // value={props.date}
          // onChange={handleStartChange}
        /> */}
      </div>
    </div>
  );
}
