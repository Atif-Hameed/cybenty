export function convertDate(dateString) {
    const date = new Date(dateString);

    // Get month, day, and year from the date
    let month = date.getUTCMonth() + 1; // Months are zero-based, so we add 1
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();

    // Pad the month and day with leading zeros if necessary
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    // Return the formatted date as MM/DD/YYYY
    return `${month}/${day}/${year}`;
}