import React, { useState } from "react";
import style from "./dayselector.module.scss";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { useDispatch } from "react-redux";
import {allAppointments} from '../../../Redux/Appointments/appointments';
import { ArrowBack } from "@material-ui/icons";


export function DaySelector() {
  const order = '01792ab0-ee79-41a7-ad79-a7bb6a279edc'
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [date, setDate] = useState();

  const handleChange = (day) => {
    setValue(day);
    setDate(day.toLocaleDateString("en-GB"));
  };

  const sendData = () => {
    dispatch(allAppointments(date, order));
  };

  return (
    <div className={style.div}>
      <Link to={`/controlpanel`}>
        <ArrowBack class={style.button3}>Back</ArrowBack>
      </Link>
      <h3>Select a day to pick your order</h3>
      <DayPicker
        className={style.daypicker}
        onDayClick={handleChange}
        selectedDays={value}
      />
      {date ? <p>You've selected {date}</p> : null}
      {date ? 
      <Link to='/appointments'>
      <button onClick={sendData}>Continue</button>
      </Link> 
      : null}
    </div>
  );
}
