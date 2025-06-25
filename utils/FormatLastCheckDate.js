export function FormatLastCheckDate(isoDateString) {
    // Create a Date object from the ISO string
    console.log(isoDateString)
    const date = new Date(isoDateString);

    // Extract date components
    const day = String(date.getUTCDate()).padStart(2, '0'); // Day (01-31)
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month (01-12)
    const year = date.getUTCFullYear(); // Year (e.g., 2025)

    // Extract time components
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Hours (00-23)
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Minutes (00-59)
    const seconds = String(date.getUTCSeconds()).padStart(2, '0'); // Seconds (00-59)

    // Format the date and time as "DD-MM-YYYY HH:MM:SS"
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}