const setOpenedOnDate = (openedOnStr) => {
  const openedOn = new Date(openedOnStr);
  openedOn.setHours(0, 0, 0, 0);
  const dateFormatted = openedOn.toLocaleDateString().replace('/', '-');
  var options = { hour12: false };
  const timeFormatted = openedOn
    .toLocaleString('en-US', options)
    .split(', ')[1];
  const stringFormatted = `${dateFormatted} ${timeFormatted}.000 +00:00`;
  return stringFormatted;
};

const setClosedOnDate = (closedOnStr) => {
  const closedOn = new Date(
    new Date(closedOnStr).getTime() + 60 * 60 * 24 * 1000
  )
  closedOn.setHours(0, 0, 0, 0);
  const dateFormatted = closedOn.toLocaleDateString().replace('/', '-');
  var options = { hour12: false };
  const timeFormatted = closedOn
    .toLocaleString('en-US', options)
    .split(', ')[1];
  const stringFormatted = `${dateFormatted} ${timeFormatted}.000 +00:00`;
  return stringFormatted;
}

module.exports = { setOpenedOnDate, setClosedOnDate };
