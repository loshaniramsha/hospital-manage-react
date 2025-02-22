export default class Mother{
    mother_id: number;
    mother_name: string;
    mother_age: number;
    mother_address: string;
    contact: string;
    gravidity:number
    register_date:Date
    delivery_date:Date
    clinic_date:Date
    doctor_id:number
    staff_id:number

    constructor(
        mother_id: number,
        mother_name: string,
        mother_age: number,
        mother_address: string,
        contact: string,
        gravidity:number,
        register_date:Date,
        delivery_date:Date,
        clinic_date:Date,
        doctor_id:number,
        staff_id:number,
    ) {
        this.mother_id = mother_id;
        this.mother_name = mother_name;
        this.mother_age = mother_age;
        this.mother_address = mother_address;
        this.contact = contact;
        this.gravidity = gravidity;
        this.register_date = register_date;
        this.delivery_date = delivery_date;
        this.clinic_date = clinic_date;
        this.doctor_id = doctor_id;
        this.staff_id = staff_id;
    }
}