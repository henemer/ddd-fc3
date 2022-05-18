import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests",() => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Emerson");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("123", "Emerson");
        customer.changeName("Patricia");
        expect(customer.name).toBe("Patricia");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "Emerson");
        const address = new Address("Rua X", 10, "81110125", "Curitiba");
        customer.Address = address;
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(()=> {
            const customer = new Customer("123", "Emerson");
            customer.activate();
        }).toThrowError("Address is mandadory to activate a customer");
    });


    it("should deactivate customer", () => {
        const customer = new Customer("123", "Emerson");
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("123", "Emerson");
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(30);
        expect(customer.rewardPoints).toBe(40);

    });


});