// services/firebase/jobService.ts
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
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

export const getAllJobs = async (): Promise<Job[]> => {
    try {
        const jobsCollection = collection(db, "jobs");
        const jobsSnapshot = await getDocs(jobsCollection);
        const jobsList: Job[] = [];

        jobsSnapshot.forEach(doc => {
            const jobData = doc.data() as Job;
            jobsList.push({ ...jobData, id: doc.id });
        });

        return jobsList;
    } catch (error) {
        throw error;
    }
}

export const assignWorkerToJob = async (jobId: string, workerId: string): Promise<void> => {
    try {
        const jobRef = doc(db, "jobs", jobId);
        await updateDoc(jobRef, {
            assignedTo: workerId,
        });
    } catch (error) {
        console.error("Error assigning worker to job:", error);
        throw error;
    }
};