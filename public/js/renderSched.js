async function getSched() {
const Employee = require('../../models/Employee')
const dayjs = require('dayjs')
const today = dayjs()
const week = []

// schedule shows 7 days, current day is first and highlighted
const weekDays = []
for (i = 0; i < 7; i++) {
    week.push(today.add(i, 'day').day())
    if(week[i] === 0) {
        weekDays.push('Sun')
    } else if (week[i] === 1) {
        weekDays.push('Mon')
    } else if (week[i] === 2) {
        weekDays.push('Tue')
    } else if (week[i] === 3) {
        weekDays.push('Wed')
    } else if (week[i] === 4) {
        weekDays.push('Thu')
    } else if (week[i] === 5) {
        weekDays.push('Fri')
    } else if (week[i] === 6) {
        weekDays.push('Sat')
    }
}  

const weekDates = []
var dayDatePairs = []

for (i = 0; i < 7; i ++) {
    weekDates.push(today.add(i, 'day').format('DD'))
}
for(i = 0; i < 7; i++) {
    dayDatePairs.push({day: weekDays[i], weekDate: weekDates[i]})
};

    const schedData = await Employee.findAll({
                attributes: ['id', 'first_name', 'last_name', 
                'works_sunday', 'works_monday','works_tuesday','works_wednesday',
                'works_thursday','works_friday','works_saturday',] 
    })
    const employeeData = {sched: schedData.map((id) => 
    id.get({plain: true})), days: dayDatePairs}
    return employeeData
}

module.exports = getSched()