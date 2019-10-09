import {CalendarCreator} from "./CalendarCreator.js";

(function (){
    let calendar = new CalendarCreator();
    calendar.createCalendars(20, -12);
    console.log(calendar);
})();