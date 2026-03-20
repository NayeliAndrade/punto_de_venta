import MockAdapter from "axios-mock-adapter";
import api from "../api/api";

const mock = new MockAdapter(api, { delayResponse: 500 });
//mejorar los formularios y las tablas 
//modal para borrar 

/* ================= CATEGORIES ================= */
const generateUuid = ()=>{
    return crypto.randomUUID();
}

const categories = [
  { id: generateUuid(), category: "electrodomesticos" },
  { id: generateUuid(), category: "lacteos" },
  { id: generateUuid(), category: "carnes" },
];

mock.onGet("/categories").reply(200, { categories });

mock.onPost("/categories").reply((config) => {
  categories.push(JSON.parse(config.data));
  return [201, { categories }];
});
///funcion que retorna un index de un string
//0,1,2 
//uuid
mock.onPut(/\/categories\/.+/).reply((config) => {
  const id = config.url!.split("/").pop();
  const updatedCategory = JSON.parse(config.data);
  const index = categories.findIndex((cat) => String(cat.id) === String(id));
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updatedCategory };
    return [200, { category: categories[index] }];
  } else {
    return [404, { message: "Category not found" }];
  }
});

mock.onDelete(/\/categories\/.+/).reply((config) => {
  const id = config.url?.split("/").pop();

  const index = categories.findIndex(c => String(c.id) === String(id));

  if (index !== -1) {
    categories.splice(index, 1);
    return [200, { message: "Category deleted" }];
  }

  return [404, { message: "Category not found" }];
});

/* ================= PRODUCTS ================= */

const products = [
  {
        id: generateUuid(),
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
        id: generateUuid(),
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
        id: generateUuid(),
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

mock.onPut(/\/products\/.+/).reply((config) => {
 const id = config.url!.split("/").pop();
  const updatedProduct = JSON.parse(config.data);
  const index = products.findIndex((p) => String(p.id) === String(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    return [200, { product: products[index] }];
  } else {
    return [404, { message: "Product not found" }];
  }
});

mock.onDelete(/\/products\/.+/).reply((config) => {
  const id = config.url?.split("/").pop();

  const index = products.findIndex(p => String(p.id) === String(id));

  if (index !== -1) {
    products.splice(index, 1);
    return [200, { message: "Product deleted" }];
  }

  return [404, { message: "Product not found" }];
});

/* ================= USERS ================= */

const users = [
  { id: generateUuid(), name: "Juan Reyes", email: "Juan@example.com" },
  { id: generateUuid(), name: "Camila Perez", email: "Camila@example.com" },
];

mock.onGet("/users").reply(200, { users });

mock.onPost("/users").reply((config) => {
  users.push(JSON.parse(config.data));
  return [201, { users }];
});

mock.onPut(/\/users\/.+/).reply((config) => {
  const id = config.url!.split("/").pop();
  const updatedUser = JSON.parse(config.data);
  const index = users.findIndex((u) => String(u.id) === String(id));
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return [200, { user: users[index] }];
  } else {
    return [404, { message: "User not found" }];
  }
});

mock.onDelete(/\/users\/.+/).reply((config) => {
  const id = config.url?.split("/").pop();

  const index = users.findIndex(u => String(u.id) === String(id));

  if (index !== -1) {
    users.splice(index, 1);
    return [200, { message: "User deleted" }];
  }

  return [404, { message: "User not found" }];
});

export default mock;