export function calculateTimeLeft(expiryTimestamp) {
    // Parse the expiry timestamp to a Date object
    const expiryDate = new Date(expiryTimestamp);

    // Get the current time
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = expiryDate - currentDate;

    // If the difference is negative, the expiry time has passed
    if (differenceInMilliseconds < 0) {
        return "The time has already expired.";
    }

    // Convert the difference to hours, minutes, and seconds
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

    return {
        hours,
        minutes,
        seconds,
    };
}