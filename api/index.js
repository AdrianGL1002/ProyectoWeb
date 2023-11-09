const { Client } = require("pg");//La clase Client permite conectarse una vesz a la BD
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
app.use(cors());
app.use(express.json());

//Consulta con la appi GET
app.get('/CProducts', async (req, res) => {
    const productos = await consultarTodosProductos();
  res.send(productos);
  
})
//Insercion con la api en tabla productos POST
app.post('/PProducts', (req, res) => {
    const productData = req.body
    guardarProductos(productData.id, productData.nombre,productData.marca, productData.cantidad, productData.precio);
    console.log(req.body)
    res.send('Insertado')
  })

//Eliminacion con la api en la tabla productos DELETE
app.delete('/DelProducts', (req, res) => {
    eliminarProducto(req.body.id);
    res.send('Eliminar');
})

//Actualizar con la api en la tabla Productos PUT
app.put('/PuProducts', (req,res)=>{
    const product = req.body;
    actualizarProductos(product.id, product.nombre, product.marca, product.cantidad, product.precio);
    res.send('se Actualizo');

})


//Consulta con la appi GET para promociones
app.get('/CPromos', async (req, res) => {
    const promos = await consultarTodasPromos();
    res.send(promos);
})
//Insercion con la api en tabla promociones POST
app.post('/PPromos', (req, res) => {
    const promoData = req.body;
    guardarPromos(promoData.id_product, promoData.descripcion, promoData.fecha_inicio, promoData.fecha_final);
    res.send('Insertado');
})

//Eliminacion con la api en la tabla promociones DELETE
app.delete('/DelPromos', (req, res) => {
    eliminarPromos(req.body.id_product);
    res.send('Eliminado');

})

//Actualizar con la api en la tabla Promociones PUT
app.put('/PuPromos', (req,res)=>{
    const promoData = req.body;
    actualizarPromos(promoData.id_product, promoData.descripcion, promoData.fecha_inicio, promoData.fecha_final);
    res.send('Se actualizo');
})

//Se da de alta el puerto con el que se va a trabajar
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




//Falta agrega el stock se guarda en la base de datos
async function guardarProductos(id, nombre, marca, cantidad, precio){
    //debugger;
    const client = new Client({
        user: 'admin',//usuario
        host: 'localhost',//host por defecto
        database: 'dulceria',//nombre de la base de datos
        password: 'root',//password del usuario
        port: 5432,
    });
    await client.connect();
    //Para realizar una consulta SQL
    const comand = 
    "INSERT INTO productos (product_id, nombre, marca, contenido, precio) VALUES ('"+id+"','"+nombre+"','"+marca+"','"+cantidad+"',"+precio+")";
    const res = await client.query(comand);
    const result = res.rows;
    console.log(res.rows);
    await client.end();

};

//Funcion que consulta todo los producto de la base de datos
async function consultarTodosProductos(){
    const client = new Client({
        user: 'admin',//usuario
        host: 'localhost',//host por defecto
        database: 'dulceria',//nombre de la base de datos
        password: 'root',//password del usuario
        port: 5432,
    });
    await client.connect();
    //Para realizar una consulta SQL
    const res = await client.query('SELECT * FROM productos');
    const result = res.rows;
    console.log(res.rows);
    await client.end();
    return result;
};

//Funcion que elimina un producto de la base de datos
async function eliminarProducto(id){
    const client = new Client({
        user: 'admin',
        host: 'localhost',
        database: 'dulceria',
        password: 'root',
        port: 5432
    });
    await client.connect();
    const res = await client.query("DELETE FROM productos WHERE product_id = '"+id+"'");
    const result = res.rows;
    console.log(res.rows);
    await client.end();
};

//Funcion que actualiza un registro de la base de datos
async function actualizarProductos(id, nombre, marca, cantidad, precio){
    debugger;
    const client = new Client({
        user: 'admin',
        host: 'localhost',
        database: 'dulceria',
        password: 'root',
        port: 5432
    });
    await client.connect();
    const executeQuery = 
    "UPDATE productos SET nombre ='"+nombre+"', marca = '"+marca+"', contenido = '"+cantidad+"', precio = "+precio+" WHERE product_id = '"+id+"'";
    await client.query(executeQuery);
    await client.end();
}


//funcion que consulta todas las promociones en la base de datos
async function consultarTodasPromos(){
    const client = new Client({
        user: 'admin',//usuario
        host: 'localhost',//host por defecto
        database: 'dulceria',//nombre de la base de datos
        password: 'root',//password del usuario
        port: 5432,
    });
    await client.connect();
    //Para realizar una consulta SQL
    const res = await client.query('SELECT * FROM promociones');
    const result = res.rows;
    console.log(res.rows);
    await client.end();
    return result;
};

//Funcion que inserta nuevas promociones
async function guardarPromos(id_product,descripcion, fecha_inicio, fecha_final){
    //debugger;
    const client = new Client({
        user: 'admin',//usuario
        host: 'localhost',//host por defecto
        database: 'dulceria',//nombre de la base de datos
        password: 'root',//password del usuario
        port: 5432,
    });
    await client.connect();
    //Para realizar una consulta SQL
    const comand = 
    "INSERT INTO promociones (id_product, descripcion, fecha_inicio, fecha_final) VALUES ('"+id_product+"','"+descripcion+"','"+fecha_inicio+"','"+fecha_final+"')";
    const res = await client.query(comand);
    const result = res.rows;
    console.log(res.rows);
    await client.end();
};

//Funcion que eliminar promociones
async function eliminarPromos(id_product){
    const client = new Client({
        user: 'admin',
        host: 'localhost',
        database: 'dulceria',
        password: 'root',
        port: 5432
    });
    await client.connect();
    const res = await client.query("DELETE FROM promociones WHERE id_product = '"+id_product+"'");
    const result = res.rows;
    console.log(res.rows);
    await client.end();
};

//Funcion que actualizar las promociones
async function actualizarPromos(id_product, descripcion, fecha_inicio, fecha_final){
    debugger;
    const client = new Client({
        user: 'admin',
        host: 'localhost',
        database: 'dulceria',
        password: 'root',
        port: 5432
    });
    await client.connect();
    const executeQuery = 
    "UPDATE promociones SET descripcion = '"+descripcion+"', fecha_inicio = '"+fecha_inicio+"', fecha_final = '"+fecha_final+"' WHERE id_product = '"+id_product+"'";
    await client.query(executeQuery);
    await client.end();
}