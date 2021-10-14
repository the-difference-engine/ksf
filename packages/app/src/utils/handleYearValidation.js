const handleYearValidation = (date) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  return year >= 1000 && year <= 9999;
};

export default handleYearValidation;
