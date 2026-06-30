import MockAdapter from "axios-mock-adapter";
import api from "../api";
import type { Category } from "../types/Category";
import type { Product } from "../types/Product";
import type { Sale } from "../types/Sale";
import type { UserProps } from "../types/UserProps";

const mock = new MockAdapter(api, { delayResponse: 500 });
/* ================= CATEGORIES ================= */
const generateUuid = ()=>{
    return crypto.randomUUID();
}

const categories : Category[] = [
  { id: generateUuid(), category: "electrodomesticos" },
  { id: generateUuid(), category: "lacteos" },
  { id: generateUuid(), category: "carnes" },
];

mock.onGet("/categories").reply(200, { categories });

mock.onPost("/categories").reply((config) => {
  categories.push(JSON.parse(config.data));
  return [201, { categories }];
});

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

const products : Product[] = [
  {
        id: generateUuid(),
        sku: "15sud",
        product: "leche",
        category: "lacteos",
        image_product: "/img/leche",
        description: "leche deslactosada nutrileche",
        unit_measure: "litro",
        quantity: 15,
        VAT: 16,
        price: 20,
        cost: 22,
        data_expiration: "15/01/2027"
    },
    {
        id: generateUuid(),
        sku: "df522",
        product: "huevos",
        category: "carnes",
        image_product: "/img/huevos",
        description: "huevo san juan",
        unit_measure: "kilogramo",
        quantity: 24,
        VAT: 16,
        price: 40,
        cost: 48,
        data_expiration: "12/01/2027"
    },
    {
        id: generateUuid(),
        sku: "54fyr",
        product: "television",
        category: "electrodomesticos",
        image_product: "/img/tv",
        description: "smart tv de 50 in",
        unit_measure: "pieza",
        quantity: 10,
        VAT: 16,
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
/* ================= SALES ================= */

const sales: Sale[] = [
  {
    id: generateUuid(),
    customer: "Juan",
    date: "2026-05-10",
    items: [
      {
        productId: products[1].id,
        product: products[1].product,
        quantity: 3,
        unit_price: products[1].price,
        total: products[1].price * 3
      },
      {
        productId: products[0].id,
        product: products[0].product,
        quantity: 2,
        unit_price: products[0].price,
        total: products[0].price * 2
      }
    ],
    total: products[1].price * 3 + products[0].price * 2
  }
];

mock.onGet("/sales").reply(200, { sales });

mock.onPost("/sales").reply((config) => {
  const newSale: Sale = JSON.parse(config.data);

  const insufficient = newSale.items.find((item) => {
    const product = products.find((p) => p.id === item.productId);
    return !product || product.quantity < item.quantity;
  });

  if (insufficient) {
    const product = products.find((p) => p.id === insufficient.productId);
    const productName = product?.product ?? "El producto";
    return [400, { message: `${productName} ya no hay en existencia` }];
  }

  newSale.items.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.quantity -= item.quantity;
    }
  });

  sales.push(newSale);
  return [201, { sales }];
});

mock.onPut(/\/sales\/.+/).reply((config) => {
  const id = config.url!.split("/").pop();
  const updatedSale: Sale = JSON.parse(config.data);
  let index = sales.findIndex((sale) => String(sale.id) === String(id));

  // fallback: try matching by id from body
  if (index === -1 && updatedSale?.id) {
    index = sales.findIndex((sale) => String(sale.id) === String(updatedSale.id));
  }

  if (index === -1) {
    return [404, { message: "Sale not found" }];
  }

  const currentSale = sales[index];

  // restore stock from existing sale
  currentSale.items.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.quantity += item.quantity;
    }
  });

  const insufficient = updatedSale.items.find((item) => {
    const product = products.find((p) => p.id === item.productId);
    return !product || product.quantity < item.quantity;
  });

  if (insufficient) {
    // rollback restoration if stock is insufficient
    currentSale.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        product.quantity -= item.quantity;
      }
    });
    const product = products.find((p) => p.id === insufficient.productId);
    const productName = product?.product ?? "El producto";
    return [400, { message: `${productName} ya no hay en existencia` }];
  }

  updatedSale.items.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.quantity -= item.quantity;
    }
  });

  sales[index] = { ...currentSale, ...updatedSale };
  return [200, { sale: sales[index] }];
});

mock.onDelete(/\/sales\/.+/).reply((config) => {
  const id = config.url?.split("/").pop();
  const index = sales.findIndex((sale) => String(sale.id) === String(id));

  if (index !== -1) {
    sales[index].items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        product.quantity += item.quantity;
      }
    });
    sales.splice(index, 1);
    return [200, { message: "Sale deleted" }];
  }

  return [404, { message: "Sale not found" }];
});

/* ================= USERS ================= */

const users: UserProps[] = [
  { id: generateUuid(), name: "Juan Reyes", email: "juan@example.com" },
  { id: generateUuid(), name: "Camila Perez", email: "camila@example.com" },
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