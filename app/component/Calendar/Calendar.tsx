"use client"
const Calendar = () => {
    const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ["", "sun", "mon", "tue", "wed", "thr", "fri", "sat"];

function createElement(tag:any, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}

function MonYearTitle(month:any, year:any) {
    const container = createElement('div', 'monthYearTitleContainer');
    container.appendChild(createElement('div', 'monthWrap', month));
    container.appendChild(createElement('div', 'yearWrap', year));
    return container;
}

function WeekdayTitle() {
    const container = createElement('div', 'weekdayTitleContainer');
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'].forEach(day => {
        container.appendChild(createElement('div', 'weekWrap', day));
    });
    return container;
}

function DayCells(month:any, year:any, dayIsClicked:any, onDayClicked:any) {
    const numOfDays = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay(); // Get the first day of the month
    const container = createElement('div', 'dayCellsContainer');

    // Add blank cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const blankCell = createElement('div', 'cell cell-blank');
        container.appendChild(blankCell);
    }

    // Add actual day cells
    for (let day = 1; day <= numOfDays; day++) {
        const id = `${day}${month}${year}`;
        const dayCell = createElement('div', 'cell');
        const dayNum = createElement('span', id === dayIsClicked ? 'dayNum selected' : 'dayNum', day.toString());
        dayCell.appendChild(dayNum);

        // Handle day click
        dayCell.onclick = () => onDayClicked(id);

        container.appendChild(dayCell);
    }

    return container;
}

function MonthControls(dir:any, onArrowClick:any) {
    const arrow = createElement('div', `arrow ${dir}`);
    arrow.onclick = () => onArrowClick(dir);
    return arrow;
}
 
    return (
    <div>
      
    </div>
  )
}

export default Calendar
