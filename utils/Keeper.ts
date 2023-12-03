 
export function createId() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    return randomString
}

export function customizeAppointmentDetail(data: any) {
    const topInMinutes = getMimutes(data.start) 
    const botInMinutes = getMimutes(data.end)  
    return {
        ...data,
        start: formatTime(data.start),
        end: formatTime(data.end),
        top: topInMinutes * (5/3),
        bottom: 2400 - (botInMinutes * (5/3))
    } 
}

function getMimutes(data: string): number {
    const [hours, minutes] = data.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);  
    return (hour * 60) + minute;
}

function formatTime(data: string) {
    const [hours, minutes] = data.split(':');
    let period = 'AM'; 
    let hour = parseInt(hours, 10); 
    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        hour -= 12;
      }
    } 
    return `${hour.toString().padStart(2, '0')}:${minutes} ${period}`;
}

export function reFormatTime(data: string) {
  const [time, period] = data.split(' '); 
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours, 10); 
  if (period === 'PM' && hour < 12) {
      hour += 12;
  } else if (period === 'AM' && hour === 12) {
      hour = 0;
  } 
  const formattedHour = hour.toString().padStart(2, '0');
  return `${formattedHour}:${minutes}`;
}