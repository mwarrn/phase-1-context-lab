/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    const employee = {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    }
    return employee;
}

const createEmployeeRecords = (records) => {
    return records.map(createEmployeeRecord);
}

function createTimeInEvent(timestamp) {
    const dateArr = timestamp.split(' ');
    const timeInObj = {
      type: 'TimeIn',
      hour: parseInt(dateArr[1].slice(0, 2) + '00'),
      date: dateArr[0],
    }
    this.timeInEvents.push(timeInObj);
    return this;
}

function createTimeOutEvent(timestamp) {
    const dateArr = timestamp.split(' ');
    const timeOutObj = {
      type: 'TimeOut',
      hour: parseInt(dateArr[1].slice(0, 2) + '00'),
      date: dateArr[0],
    }
    this.timeOutEvents.push(timeOutObj);
    return this;
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(day => date === day.date);
    const timeOut = this.timeOutEvents.find(day => date === day.date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
    const employee = srcArray.find(record => record.firstName === firstName)
    return employee;
}
  
function calculatePayroll(records) {
    const payroll = records.reduce((acc, cur) => {
      return acc + allWagesFor.call(cur)
    }, 0);
    return payroll;
}
