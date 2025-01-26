import React from "react";
import { formatDay, getWeatherIcon } from "./starter";



export default function Day({min, max, date, code, isToday}) {

    return <>
    <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>{Math.round(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong> </p>
    </li>
    </>
}