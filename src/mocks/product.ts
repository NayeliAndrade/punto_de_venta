import MockAdapter from "axios-mock-adapter";
import api from "../api/api";

const mock = new MockAdapter(api, {delayResponse:500});

const products = [
    {
        id: 1,
        sku: "15sud",
        product: "leche",
        image_product: "/img/leche",
        description: "leche deslactosada nutrileche",
        unit_measure: "litro",
        iva: 16,
        price: 20,
        cost: 22,
        data_expiration: "15/01/2027"
    },
    {
        id: 2,
        sku: "df522",
        product: "huevos",
        image_product: "/img/huevos",
        description: "huevo san juan",
        unit_measure: "kilogramo",
        iva: 16,
        price: 40,
        cost: 48,
        data_expiration: "12/01/2027"
    },
    {
        id: 3,
        sku: "54fyr",
        product: "television",
        image_product: "/img/tv",
        description: "smart tv de 50 in",
        unit_measure: "pieza",
        iva: 16,
        price: 20000,
        cost: 22000,
        data_expiration: ""
    },
];

mock.onGet("/products").reply(200, {products});

mock.onPost("/products").reply((config)=>{
    console.log(config.data);
    products.push(JSON.parse(config.data))
    return [201, {
        products
    }]
})

export default mock;