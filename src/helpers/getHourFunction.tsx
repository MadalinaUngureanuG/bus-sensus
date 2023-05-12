export default function getFormatHour (date: Date | undefined) {
  if (!date) {
    return '';
  }
  const formatHour = new Date(date);
  return `${formatHour.getHours()}:${formatHour.getMinutes()}`;
}
