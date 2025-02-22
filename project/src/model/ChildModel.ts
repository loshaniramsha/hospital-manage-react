export default class Child{
    child_id: number;
    child_name: string;
    mother_name: string;
    contact: string;
    address: string;
    age: number;
    vaccine_status: string;
    doctor_id: number;
    staff_id: number;

    constructor(
        child_id: number,
        child_name: string,
        mother_name: string,
        contact: string,
        address: string,
        age: number,
        vaccine_status: string,
        doctor_id: number,
        staff_id: number,
    ) {
        this.child_id = child_id;
        this.child_name = child_name;
        this.mother_name = mother_name;
        this.contact = contact;
        this.address = address;
        this.age = age;
        this.vaccine_status = vaccine_status;
        this.doctor_id = doctor_id;
        this.staff_id = staff_id;
    }

}