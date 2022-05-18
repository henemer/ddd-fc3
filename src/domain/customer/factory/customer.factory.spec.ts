import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("should create a new customer", () =>{
        let customer = CustomerFactory.create("Emerson");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Emerson");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Rua X", 10, "81110-125", "Curitiba");

        let customer = CustomerFactory.createWithAddress("Emerson", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Emerson");
        expect(customer.Address).toBe(address);

    });
});