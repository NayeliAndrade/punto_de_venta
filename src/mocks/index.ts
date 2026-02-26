import MockAdapter from "axios-mock-adapter";
import api from "../api/api";

const mock = new MockAdapter(api, { delayResponse: 500 });

/* ================= CATEGORIES ================= */
const generateuId = ()=>{
    return crypto.randomUUID();
}
const categories = [
  { id: 1, category: "electrodomesticos" },
  { id: 2, category: "lacteos" },
  { id: 3, category: "carnes" },
];

mock.onGet("/categories").reply(200, { categories });

mock.onPost("/categories").reply((config) => {
  categories.push(JSON.parse(config.data));
  return [201, { categories }];
});

mock.onPut(/\/categories\/\d+/).reply((config) => {
  const id = parseInt(config.url!.split("/").pop()!);
  const updatedCategory = JSON.parse(config.data);
  const index = categories.findIndex((cat) => cat.id === id); 
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updatedCategory };
    return [200, { category: categories[index] }];
  } else {
    return [404, { message: "Category not found" }];
  }
});

mock.onDelete(/\/categories\/\d+/).reply((config) => {
  const id = Number(config.url?.split("/").pop());

  const index = categories.findIndex(c => c.id === id);

  if (index !== -1) {
    categories.splice(index, 1);
    return [200, { message: "Category deleted" }];
  }

  return [404, { message: "Category not found" }];
});

/* ================= PRODUCTS ================= */

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

mock.onGet("/products").reply(200, { products });

mock.onPost("/products").reply((config) => {
  products.push(JSON.parse(config.data));
  return [201, { products }];
});

mock.onPut(/\/products\/\d+/).reply((config) => {
  const id = parseInt(config.url!.split("/").pop()!);
  const updatedProduct = JSON.parse(config.data);
  const index = products.findIndex((p) => p.id === id); 
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    return [200, { product: products[index] }];
  } else {
    return [404, { message: "Product not found" }];
  }
});

mock.onDelete(/\/products\/\d+/).reply((config) => {
  const id = Number(config.url?.split("/").pop());

  const index = products.findIndex(p => p.id === id);

  if (index !== -1) {
    products.splice(index, 1);
    return [200, { message: "Product deleted" }];
  }

  return [404, { message: "Product not found" }];
});

export default mock;