import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./firebase";

// upalod file on firebase and get url
export const uploadFile = async (file) => {
    if (!file) return null;
    try {
        const storage = getStorage(app); // Initialize Firebase storage
        const storageRef = ref(storage, `uploads/${file.name}`); // Create a reference to the file's path
        await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
        const downloadURL = await getDownloadURL(storageRef); // Get the download URL after upload
        return downloadURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
}

//file name get
export function getFileNameFromUrl(url) {
    if (!url) return ''; // Return empty string if the URL is undefined or empty
    try {
        // Extract and decode the path from the URL
        const decodedPath = decodeURIComponent(url.split('/').pop().split('?')[0]);
        const fileName = decodedPath.split('/').pop();
        // Ensure the result is always a string
        return typeof fileName === 'string' ? fileName : '';
    } catch (error) {
        console.error('Error extracting file name:', error);
        return '';
    }
}
