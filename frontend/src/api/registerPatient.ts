import { patientProfile } from '@/lib/interfaces';
import axios from "axios";
export async function registerPatient(user : patientProfile): Promise<patientProfile> {
    try {
        const response = await axios.post("localhost:8000/auth/users/", {
            nom: user.nom,
            prenom: user.prenom ,
            email:user.email ,
            tel: user.tel,
            type: "patient",
            password:user.password,
        });
        console.log(response);
        return response.data as patientProfile; 
    } catch (error) {
        console.error(error);
        throw error; 
    }
}