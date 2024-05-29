export function secondsToHms(seconds) {
  var hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 360000) / 6000);
  const secondsRemain = Math.floor((seconds % 6000) / 100);

  var hoursString = (hours < 10) ? "0" + hours : hours;
  var minutesString = (minutes < 10) ? "0" + minutes : minutes;
  var secondsString = (secondsRemain < 10) ? "0" + secondsRemain : secondsRemain;

  return minutesString + ":" + secondsString;
}