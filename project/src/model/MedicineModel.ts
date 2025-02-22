export default class MedicineModel {
    medi_id: number;
    name: string;
    batch_number: string;
    brand: string;
    qty: number;
    date: Date;

    constructor(medi_id: number, name: string, batch_number: string, brand: string, qty: number, date: Date) {
        this.medi_id = medi_id;
        this.name = name;
        this.batch_number = batch_number;
        this.brand = brand;
        this.qty = qty;
        this.date=date;
    }

}