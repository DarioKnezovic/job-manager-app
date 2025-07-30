import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../firebaseConfig";

export const getUsersByCompanyId = async (companyId: string): Promise<User[]> => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where('company_id', '==', companyId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        throw error;
    }
};