export default class Doctor{
    doctor_id: number;
    doctor_name: string;
    doctor_register_number: string;
    doctor_position: string;
    contact: string;
    email: string;

    constructor(
        doctor_id: number,
        doctor_name: string,
        doctor_register_number: string,
        doctor_position: string,
        contact: string,
        email: string,
    ) {
        this.doctor_id = doctor_id;
        this.doctor_name = doctor_name;
        this.doctor_register_number = doctor_register_number;
        this.doctor_position = doctor_position;
        this.contact = contact;
        this.email = email;
    }
}