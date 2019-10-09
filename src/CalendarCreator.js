import calendar from 'calendar-js';

const DEFAULT_CONFIG = {
    monthHeader: true,
    monthTitle: true,
    eventList: false,
    carousel: true,
    offset: 0,
    distance: 6,
    prefix: "cc-"
};

const DEFAULT_CLASSES = {
    calendars: `container`,
    calendarList: `list`,
    calendarMonth: `month`,
    calendarWeek: `week`,
    calendarDay: `day`,
    overview: `overview`,
    overviewList: `overview-list`,
    overviewListItem: `overview-list-item`
}

const DEFAULT_ELEMENTS = {
    calendar: "DIV",
    calendarList: "DIV",
    calendarMonth: "DIV",
    calendarWeek: "DIV",
    calendarDay: "DIV",
    overview: "DIV",
    overviewList: "OL",
    overviewListItem: "LI"
}


export class CalendarCreator {

    constructor(config) {
        this.config = this._getConfig(config);
        this.classes = this._getClassDefinitions();
        this.elements = this._getElementDefinitions();
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.months = [];
        this.calendarComponent = document.getElementById("calendar");
    }

    createCalendars(distance, offset) {

        let startMonth,
            startYear,
            eventsList;

        this.config.distance = distance || this.config.distance;
        this.config.offset = offset || this.config.offset;

        startMonth = (this.currentMonth + this.config.offset)%12;
        startYear = this.currentYear + Math.floor((this.currentMonth + this.config.offset)/12);

        if(startMonth < 0 ) startMonth += 12;

        for(let i = startMonth, year = startYear; i < startMonth + this.config.distance ;i++){
            if (i >= 12) {
                year = startYear + Math.floor(i/12);
            }
            this.months.push(calendar().of(year, i%12));
        }

        this.calendarComponent.appendChild(this.renderMonths());

        if (this.config.carousel) {
            // add the previous and next month buttons
        }

        if (this.config.eventList) {
            // add the event list
            this.calendarComponent.appendChild(eventsList);
        }

    }

    renderWeek(weekdays) {
        let els = this.elements,
            cls = this.classes,
            weekRow = document.createElement(els.calendarWeek);

        weekRow.classList.add(cls.calendarWeek);

        // Create a cell for each day in a week in the order in which they are 
        // stored in the calendar-js array.
        weekdays.map(day => {
            let weekDay = document.createElement(els.calendarDay),
                dayNumber = document.createElement("SPAN");
            
            if(day) {
                dayNumber.textContent = day;
                weekDay.classList.add("active");
                weekDay.appendChild(dayNumber);
            } else {
                weekDay.classList.add("spacer");
            }
            weekDay.classList.add(cls.calendarDay);
            weekRow.appendChild(weekDay);
        });

        return weekRow;
    }

    renderMonth(month) {
        const els = this.elements,
              cls = this.classes,
              calendarMonth = document.createElement(els.calendarMonth);

        if (this.config.monthHeader) {
            const calendarHeader = document.createElement("HEADER");
            calendarHeader.classList.add("cc-header");
            calendarMonth.appendChild(calendarHeader);

            if (this.config.monthTitle){
                const calendarTitle = document.createElement("DIV");
                calendarTitle.textContent = `${month.month} ${month.year}`;
                calendarHeader.appendChild(calendarTitle);
            }

            // Add the days of the week legend
            calendarHeader.appendChild(this.renderWeek(month.weekdaysAbbr));
        }

        calendarMonth.classList.add(cls.calendarMonth);
        month.calendar.map(week => { 
            calendarMonth.appendChild(this.renderWeek(week))
        });

        return calendarMonth;
    }

    renderMonths() {
        let els = this.elements,
            cls = this.classes,
            calendarList = document.createElement(els.calendarMonth);
        
        calendarList.classList.add(cls.calendarList);
        this.months.map(month => {
            calendarList.appendChild(this.renderMonth(month));
        });

        return calendarList;
    }

    _getClassDefinitions(definitions) {
        definitions = {
            ...DEFAULT_CLASSES,
            ...definitions
        };
        return {
            calendars: `${this.config.prefix}${definitions.calendars}`,
            calendarList: `${this.config.prefix}${definitions.calendarList}`,
            calendarMonth: `${this.config.prefix}${definitions.calendarMonth}`,
            calendarWeek: `${this.config.prefix}${definitions.calendarWeek}`,
            calendarDay: `${this.config.prefix}${definitions.calendarDay}`,
            overview: `${this.config.prefix}${definitions.overview}`,
            overviewList: `${this.config.prefix}${definitions.overviewList}`,
            overviewListItem: `${this.config.prefix}${definitions.overviewListItem}`
        };
    }

    _getElementDefinitions(definitions) {
        definitions = {
            ...DEFAULT_ELEMENTS,
            ...definitions
        };
        
        return definitions;
    }

    _getConfig(config) {
        config = {
            ...DEFAULT_CONFIG,
            ...config
        }

        return config;
    }
}