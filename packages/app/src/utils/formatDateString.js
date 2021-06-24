export const formatDateString = date => {
    date = date.split('T');
    date = date[0].split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    const result = `${month}-${day}-${year}`;
    
    return result;
}

export default formatDateString;
