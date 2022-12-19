export const parseTime = time => {
  if (!time) {
    return '00:00';
  }
  const timeString = (time / 60).toString();
  let timeMinutes = timeString.slice(0, timeString.indexOf('.'));
  let timeSeconds = (timeString.slice(timeString.indexOf('.')) * 60).toFixed(0);

  if (timeMinutes.length === 1) {
    timeMinutes = '0' + timeMinutes;
  }
  if (timeSeconds.length === 1) {
    timeSeconds = '0' + timeSeconds;
  }
  const parsedTime = `${timeMinutes}:${timeSeconds}`;
  return parsedTime;
};
