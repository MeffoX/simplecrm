export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthdate: number;
    address: string;
    zipCode: number;
    city: string;
    customID: any;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthdate = obj ? obj.birthdate : '';
        this.address = obj ? obj.address : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.customID = obj ? obj.customID : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthdate: this.birthdate,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city,
            customID: this.customID
        };
    }
}