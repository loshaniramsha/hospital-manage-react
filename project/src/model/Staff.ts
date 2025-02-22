export default class Staff {
    staffId: number;
    profile:string
    name: string;
    contact: string;
    address: string;
    role: string;

    constructor(
        staffId: number,
        profile: string,
        name: string,
        contact: string,
        address: string,
        role: string,
    ) {
        this.staffId = staffId;
        this.profile = profile;
        this.name = name;
        this.contact = contact;
        this.address = address;
        this.role = role;
    }

}