import Order from "../entity/order";
import OrderItem from "../entity/orderm_item";

describe("Order unit tests",() => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("Customer id is required");
    });
 
    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Items are required");
    });
 
    it("should calculate total", () => {
        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 300, "p2", 3);

        const order = new Order("o1", "c1", [item1, item2]);

        expect(order.total()).toBe(1100);
    });

    it("should throw error if the item quantity is less or equal zero", () => {

        expect(() => {
            const item1 = new OrderItem("i1", "Item 1", 100, "p1", 0);
            const order = new Order("o1", "c1", [item1]);
    
        }).toThrowError("Quantity must be greater than 0")
    });



});