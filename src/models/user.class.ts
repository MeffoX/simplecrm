export class User {
    firstName: string;
    lastName: string;
    birthdate: number;
    address: string;
    zipCode: number;
    city: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthdate = obj ? obj.birthdate : '';
        this.address = obj ? obj.address : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthdate: this.birthdate,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city
        };
    }
}