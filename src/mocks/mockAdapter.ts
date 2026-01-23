import MockAdapter from "axios-mock-adapter";
import api from "../api/api";
//esta es una instancia de mock adapter
const mock = new MockAdapter(api, { delayResponse: 500 });
//datos de ejemplo
const categories =  [
    { id: 1, category: "electrodomesticos" },
    { id: 2, category: "lacteos" },
    { id: 3, category: "carnes" },
  ];
// simulacion de endpoint, para el metodo get, en donde se retorna un status 200 
// y un arreglo con objetos de categoria
mock.onGet("/api/categories").reply(200, {
  categories 
});
// simulacion de endpoint, para el metodo post, 
// en donde se recibe la informacion de una nueva categoria desde el formulario 
mock.onPost("/api/categories").reply( (config)=> {
  //config aqui es la nueva categoria que se envia desde el formulario
  console.log(config.data);
  //se agrega al arreglo de categorias una nueva categoria 
  categories.push(JSON.parse(config.data))
  return [201, {
    categories
  }]
  
})
export default mock;
