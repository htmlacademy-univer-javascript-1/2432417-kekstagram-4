// переводим всё время в минуты
function getMinutes(time){
  let hours = '';
  for (let i = 0; i < time.indexOf(':'); i++) {
    hours += time[i];
  }
  let m = '';
  for (let j = time.indexOf(':') + 1; j < time.length; j++) {
    m += time[j];
  }
  return Number(hours) * 60 + Number(m);
}

function checkMeetingTime (start, end, meet, duration) {
  if ((getMinutes(meet) < getMinutes(start)) || (getMinutes(meet) + duration > getMinutes(end)))
  {
    return false;
  }
  return true;
}
