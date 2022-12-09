import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { DatePickerComponent } from "./DatePickerComponent";

const Styles = styled.div`
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 250px;
  }
  .react-datepicker__close-icon::before,
  .react-datepicker__close-icon::after {
    background-color: #ff00ff;
  }
`;

export default function DatePickerStyles(props) {
  return (
    <Styles>
      <DatePickerComponent />
    </Styles>
  );
}
