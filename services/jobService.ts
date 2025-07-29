// services/firebase/jobService.ts
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust import based on your Firebase config location
import { Job, JobStatus } from '../../types/job';

export const createJob = async (jobData: Omit<Job, 'id'>): Promise<string> => {
    // Generate ID first
    const newJobRef = doc(collection(db, "jobs"));
    const newJobId = newJobRef.id;

    // Create the complete job object with ID
    const completeJob: Job = {
        id: newJobId,
        ...jobData
    };

    try {
        await setDoc(newJobRef, completeJob);
        return newJobId;
    } catch (error) {
        console.error("Error creating job:", error);
        throw error;
    }
};