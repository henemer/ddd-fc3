import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerRepository from "./customer.repository";
import OrderModel from "../../../order/repository/sequelize/order.model";
import OrderItemModel from "../../../order/repository/sequelize/order-item.model";
import Customer from "../../../../domain/customer/entity/customer";

describe("Customer repository tests", () => {
    let sequelize:Sequelize; 

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });


    it("Should create a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua 1", 44, "81110-125", "Curitiba");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: { id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });
    });

    it("Should update a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua 1", 44, "81110-125", "Curitiba");
        customer.Address = address;
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({where: { id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });
    });


    it("Should find a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua 1", 44, "81110-125", "Curitiba");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerResult);
    });


    it("Should throw an error when customer is not found", async() => {
        const customerRepository = new CustomerRepository();
        expect(async() => {
            await customerRepository.find("XXXX");
        }).rejects.toThrow("Customer not found");
    });


    it("Should find all customers", async() => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Rua 1", 44, "81110-125", "Curitiba");
        customer1.Address = address1;
        
        const customer2 = new Customer("2", "Customer 2");
        const address2= new Address("Rua 2", 44, "81110-125", "Curitiba");
        customer2.Address = address2;
        
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    });

});