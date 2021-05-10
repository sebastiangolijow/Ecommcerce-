import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAppointment } from '../../../Redux/Appointments/appointments';
import style from './appointment.module.scss';
import { Link } from "react-router-dom";



const Hours = [
  {
    hour: 10,
    id: 0,
  },
  {
    hour: 11,
    id: 1,
  },
  {
    hour: 12,
    id: 2,
  },
  {
    hour: 13,
    id: 3,
  },
  {
    hour: 14,
    id: 4,
  },
  {
    hour: 15,
    id: 5,
  },
  {
    hour: 16,
    id: 6,
  },
  {
    hour: 17,
    id: 7,
  },
];

export function Appointments () {
    const userLoged = useSelector(state => state.usersReducer.userLoged);
    const dateAppointment = useSelector(state => state.appointmentReducer)
    console.log(dateAppointment, 'aca')
    const dispatch = useDispatch()

    const handleReserve = (idHour) => {
        dispatch(postAppointment(idHour, dateAppointment.date, "01792ab0-ee79-41a7-ad79-a7bb6a279edc"))
    }

    return (
        <div className={style.container}>
            <div className={style.contents}>
                <h1>Appointments</h1>
                <div >
                    <ul className={style.titles}>
                        <li>
                            <h3>Hour</h3>
                        </li>
                        <li>
                            <h3>Availability</h3>
                        </li>
                        <li>
                            <h3>Reserve</h3>
                        </li>
                    </ul>
                </div>
                <div>
                {Hours.map((hour)=>{
                    let count = 0
                    dateAppointment.hours.map((hR)=>{
                        hour.id === hR.id && count++
                    })   
                return(
                    <div className={style.contentsAppointment}>
                        <ul className={style.appointments}>
                            <li>
                                {hour.hour} hs
                            </li>
                            <li>
                                {(count < 10 || count === "undefined") ? "Available" : "Not Available"}
                            </li>
                            <li>
                                <Link to='/controlpanel'>
                                <button
                                    onClick={()=> handleReserve(hour.id)}
                                    className={style.button}
                                    disabled={(count < 10 || count === "undefined") ? "" : "disabled"}
                                >
                                    Reserve
                                </button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )
                })
                }
                </div>
            </div>
        </div>
    )}
