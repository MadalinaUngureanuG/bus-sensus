export default function getFormatDate (date: Date | undefined) {
  if (!date) {
    return '';
  }
  const formatDate = new Date(date);
  return `${formatDate.getFullYear()}-${String(formatDate.getMonth() + 1).padStart(2, '0')}-${String(
    formatDate.getDate()
  ).padStart(2, '0')}`;
}
