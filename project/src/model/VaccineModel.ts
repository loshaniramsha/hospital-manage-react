export default class Vaccine{
    vaccine_id: number;
    name: string;
    batch_number: string;
    brand: string;
    qty: number;
    date: Date;


    constructor(
        vaccine_id: number,
        name: string,
        batch_number: string,
        brand: string,
        qty: number,
        date: Date,

    ){
        this.vaccine_id = vaccine_id;
        this.name = name;
        this.batch_number = batch_number;
        this.brand = brand;
        this.qty = qty;
        this.date = date;
    }
}