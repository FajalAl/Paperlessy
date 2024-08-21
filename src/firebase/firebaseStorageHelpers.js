import { listAll, ref } from 'firebase/storage';
import { storage } from './firebaseConfig'; // Adjust the path as necessary

export const listFiles = async () => {
    const storageRef = ref(storage, 'files/'); // Adjust the path as necessary
    try {
        const result = await listAll(storageRef);
        return result.items; // Contains file references
    } catch (error) {
        console.error("Error listing files:", error);
        return [];
    }
};
