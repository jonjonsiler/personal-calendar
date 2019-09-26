import calendar from 'calendar-js';
(function() {
    let currentYear =  new Date().getFullYear(),
        currentMonth = new Date().getMonth(),
        months = [],
        calendarList = document.getElementById("calendar");


    for(let i = currentMonth, year = currentYear; i < currentMonth + 6 ;i++){
        if(i >= 11){ year = currentYear+1};
        months.push(calendar().of(year, i%11));
    }
    console.log(months);

    months.map(calendar => {
        let cBlock = document.createElement("DIV");
    });
})();
