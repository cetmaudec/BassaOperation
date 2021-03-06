
const mysql = require('mysql');
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cetma2019",
  database: "bassa"
});

//PORT=NUMERO DE CODIGO DE CLIENTE

const app = express()

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors())

//USUARIO
app.get('/auth/:user/:pass' , (req, res, next) => {
    con.query(`SELECT count(idUsuario) as login, idUsuario FROM usuario WHERE usuario.usuario = '${req.params.user}' AND usuario.password = SHA('${req.params.pass}') GROUP BY(idUsuario);`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/auth',  bodyParser.json(), (req, res, next) => {
    const body = req.body;
    const select_query=`SELECT COUNT(*) as total FROM usuario where usuario.usuario='${req.body.username}' AND usuario.password = SHA('${req.body.password}');`
    con.query(select_query, (err, result) => {
     if (err){
           return res.sendStatus(401);
        }else{
            if(result[0].total>0){
                var token = jwt.sign({userID: req.body.username}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
                res.send({token});
            }else{
                return res.sendStatus(401);
            }
     }
    });
});


app.get('/users', (req, res) => {
    con.query('SELECT nombreUsuario, email, usuario, question1, DATE_FORMAT(question2, "%Y-%m-%d") as question2, question3 FROM usuario;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/user/add', bodyParser.json(), (req, res, next) => {
    const INSERT_USER_QUERY = `INSERT INTO usuario(nombreUsuario, email, usuario, password, question1, question2, question3) 
    VALUES('${req.body.name}','${req.body.email}','${req.body.user}',SHA('${req.body.password}'), '${req.body.question1}', '${req.body.question2}', '${req.body.question3}');`
    con.query(INSERT_USER_QUERY, (err, resultados) => {
        if(err) {
            return res.sendStatus(401);
        } else {
            return res.send('usuario adicionado con exito')
        }
    })
})

app.get('/user/:username' , (req, res, next) => {
  con.query(`SELECT * FROM usuario WHERE usuario.usuario = ${req.params.username};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.put('/user/update/pass', bodyParser.json(), (req, res, next) => {
    con.query(`DELETE forgetpass FROM forgetpass WHERE forgetpass.usuario = '${req.body.user}';`, (err, resultados) => {
        con.query(`UPDATE usuario SET usuario.password = SHA('${req.body.password}') WHERE usuario.usuario='${req.body.user}'`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('History adicionado con exito');
            }
        })
    })
})

app.put('/user/delete',bodyParser.json() , (req, res, next) => {
  con.query(`DELETE forgetpass FROM forgetpass WHERE forgetpass.usuario = '${req.body.user}';`, (err, resultados) => {
        con.query(`DELETE usuario FROM usuario WHERE usuario.usuario = '${req.body.user}';`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.json({
                    data: resultados
                })
            }
        })

    })
})

//HISTORIAL DE ACCESO
app.post('/history/insert', bodyParser.json(), (req, res, next) => {
    con.query(`INSERT INTO history (usuario, fecha_login)
        VALUES ('${req.body.usuario}', CURRENT_TIMESTAMP());`, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('History adicionado con exito');
            }
        })
})

app.put('/history/update/:id', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE history SET history.fecha_logout = CURRENT_TIMESTAMP() WHERE history.idUsuario=${req.params.id}`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('History adicionado con exito');
        }
    })
})



/*
FORGETPASS
*/
app.get('/forgetpass', bodyParser.json(), (req, res, next) => {
    con.query(`SELECT * FROM forgetpass;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/forgetpass/:user', bodyParser.json(), (req, res, next) => {
    con.query(`SELECT forgetpass.usuario, forgetpass.intentos, DATE_FORMAT(forgetpass.fecha_cambio, "%Y-%m-%d") as fecha_cambio FROM forgetpass WHERE forgetpass.usuario='${req.params.user}'`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/forgetpass/insert', bodyParser.json(), (req, res, next) => {
    con.query(`INSERT INTO forgetpass (usuario, intentos, fecha_cambio)
        VALUES ('${req.body.user}', 0, CURRENT_TIMESTAMP());`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Forget Pass adicionado con exito');
        }
    })
})

app.put('/forgetpass/update', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE forgetpass SET forgetpass.intentos = forgetpass.intentos +1 WHERE forgetpass.usuario='${req.body.user}'`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

/*
CLIENTE
*/

app.get('/cliente', (req, res) => {
    con.query('SELECT * FROM cliente ORDER BY(idCliente) DESC;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/cliente/count', (req, res) => {
    con.query('SELECT COUNT(*) as cliente FROM cliente;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            console.log(resultados)
            return res.json({
                data: resultados
            })
        }
    })
})


app.get('/cliente/:id' , (req, res, next) => {
  con.query(`SELECT * FROM cliente WHERE cliente.idCliente = ${req.params.id};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/cliente/insert', bodyParser.json(), (req, res, next) => {
    const INSERT_MODELO = `INSERT INTO cliente (nombre_empresa,rut_empresa,nombre_rep,apellidoP_rep,apellidoM_rep,rut_rep,email_contacto,dir_calle,dir_num,dir_comuna,telefono,celular) VALUES 
    ('${req.body.nombre_empresa}','${req.body.rut_empresa}','${req.body.nombre}','${req.body.apellidoPat}','${req.body.apellidoMat}','${req.body.rut}','${req.body.correo}','${req.body.Dir_calle}',${req.body.Dir_numero},'${req.body.Dir_comuna}','${req.body.Telefono}','${req.body.Celular}');`
    con.query(INSERT_MODELO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('cliente adicionado con exito')
        }
    })
})

app.get('/cliente/comuna/groupby' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT count(*) as cantidad, cliente.dir_comuna as comuna FROM orden_trabajo, cliente WHERE orden_trabajo.cliente = cliente.idCliente GROUP BY(cliente.dir_comuna) ORDER BY(cantidad) DESC;`
  con.query(JOIN_CLIENTE_OT, (err, resultados) => {

        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })

        }
    })
})

app.put('/cliente/email/update/:id', bodyParser.json(), (req, res, next) =>{
    const UPDATE_EMAIL = `UPDATE cliente SET  cliente.email = '${req.body.email}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_EMAIL, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('email actualizado con exito')
        }
    })
});


app.put('/cliente/telefono/update/:id', bodyParser.json(), (req, res, next) =>{
    const UPDATE_TELEFONO = `UPDATE cliente SET  cliente.telefono = '${req.body.telefono}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_TELEFONO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('telefono actualizado con exito')
        }
    })
});

app.put('/cliente/celular/update/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_CELULAR = `UPDATE cliente SET  cliente.celular = '${req.body.celular}'   WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_CELULAR, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('celular actualizado con exito')
        }
    })
});

app.put('/cliente/direccion/update/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_DIRECCION = `UPDATE cliente SET  cliente.dir_calle = '${req.body.calle}', cliente.dir_numero = '${req.body.numero}', cliente.dir_comuna = '${req.body.comuna}', WHERE cliente.idCliente=${req.params.id} `
    con.query(UPDATE_DIRECCION, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('direccion actualizado con exito')
        }
    })
});

/*
ORDEN DE TRABAJO
*/
app.get('/orden-trabajo', (req, res) => {
  con.query('SELECT * FROM orden_trabajo;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})


app.get('/orden-trabajo/cliente/join', (req, res) => {
  con.query('SELECT * FROM orden_trabajo, cliente WHERE cliente.idCliente = orden_trabajo.cliente;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
}) 

app.post('/orden-trabajo/insert', bodyParser.json(), (req, res, next) => {
    con.query(`INSERT INTO orden_trabajo (cliente,tipo, descripcion, fecha_llegada,forma_pago,monto_cobrado,pagado,estado)
        VALUES (${req.body.nombreCliente},'${req.body.tipo}','${req.body.descripcion}','${req.body.fecha_ingreso}', '${req.body.forma_pago}', ${req.body.monto_cobrado},'${req.body.pagado}','${req.body.estado}');`, (err, resultados) => {
            if(err) {
                return res.send(err)

            } else {
                return res.send('OT adicionado con exito');
            }
        })
})

app.get('/orden-trabajo/select/:id' , (req, res, next) => {
  con.query(`SELECT * FROM orden_trabajo WHERE orden_trabajo.cliente = ${req.params.id};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/orden-trabajo/join/cliente/select/:id' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT idOT, cliente, tipo, descripcion, DATE_FORMAT(orden_trabajo.fecha_llegada, "%e/%m/%Y") as fecha_llegada, forma_pago, monto_cobrado, pagado, estado, idCliente, nombre_empresa, rut_empresa, email_contacto, dir_calle, dir_num, dir_comuna, telefono, celular FROM orden_trabajo, cliente WHERE orden_trabajo.idOT = ${req.params.id} AND orden_trabajo.cliente=cliente.idCliente;`
    con.query(JOIN_CLIENTE_OT, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/orden-trabajo/join/cliente/orderby/desc' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT idOT, cliente, tipo, descripcion, DATE_FORMAT(orden_trabajo.fecha_llegada, "%e/%m/%Y") as fecha_llegada, forma_pago, monto_cobrado, pagado, estado, idCliente, nombre_empresa, rut_empresa, email_contacto, dir_calle, dir_num, dir_comuna, telefono, celular FROM orden_trabajo, cliente WHERE orden_trabajo.cliente=cliente.idCliente ORDER BY(idOT) DESC;`
  con.query(JOIN_CLIENTE_OT, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/orden-trabajo/estado/groupby', (req, res, next) => {
  con.query('SELECT COUNT(*) as cantidad, estado FROM orden_trabajo GROUP BY(estado) ORDER BY(cantidad) DESC;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})


app.put('/orden-trabajo/estado/update/:id', bodyParser.json(), (req, res, next) => {
    const UPDATE_COSTO = `UPDATE orden_trabajo SET  orden_trabajo.estado = '${req.body.estado}'  WHERE orden_trabajo.idOT=${req.params.id} `
    con.query(UPDATE_COSTO, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Estado OT actualizado con exito')
        }
    })
});


/*
TIPO TRABAJO
*/

app.get('/tipo', (req, res) => {
  con.query('SELECT * FROM tipoTrabajo;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/tipo/groupby' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT count(*) as cantidad, tipo FROM orden_trabajo GROUP BY(tipo) ORDER BY(cantidad) DESC;`
  con.query(JOIN_CLIENTE_OT, (err, resultados) => {

        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })

        }
    })
})

app.post('/tipo/insert', bodyParser.json(), (req, res, next) => {
    const INSERT_TIPO_QUERY = `INSERT INTO tipoTrabajo(nombre_tipo) VALUES('${req.body.nombre_tipo}');`
    con.query(INSERT_TIPO_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('tipo adicionado con exito')
        }
    })
})

/*
TIPO MAQUINA
*/
app.get('/tipo/maquina/select', (req, res) => {
  con.query('SELECT * FROM tipoMaquina;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})




/*
MAQUINA
*/
app.get('/maquina/select' , (req, res, next) => {
    con.query(`SELECT * FROM maquina`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/maquina/select/:id' , (req, res, next) => {
    con.query(`SELECT * FROM maquina WHERE idMaq=${req.params.id}`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})


app.post('/maquina/insert', bodyParser.json(), (req, res, next) => {
    const INSERT_MAQ = `INSERT INTO maquina(identificacion, marca, modelo, tipo) VALUES('${req.body.identificacion}','${req.body.marca}','${req.body.modelo}','${req.body.tipo}');`
    con.query(INSERT_MAQ, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('maquina adicionado con exito')
        }
    })
})

/*
RELACI??N MAQUINA- OT
*/

app.get('/maquina/ot/select/:id' , (req, res, next) => {
    const JOIN_CLIENTE_OT = `SELECT * FROM OT_Maq, orden_trabajo, maquina WHERE OT_Maq.ordenTrabajo = ${req.params.id} AND OT_Maq.ordenTrabajo = orden_trabajo.idOT AND OT_Maq.maquina = maquina.idMaq;`
    con.query(JOIN_CLIENTE_OT, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/ot/maquina/select/:id' , (req, res, next) => {
    con.query(`SELECT * FROM OT_Maq, orden_trabajo WHERE OT_Maq.maquina = ${req.params.id} AND OT_Maq.ordenTrabajo = orden_trabajo.idOT`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/ot/maquina/sum/time/:id' , (req, res, next) => {
    con.query(`SELECT SUM(tiempo_uso)/60 as suma FROM OT_Maq, orden_trabajo WHERE OT_Maq.ordenTrabajo = orden_trabajo.idOT AND maquina = ${req.params.id};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/maquina/ot/insert', bodyParser.json(), (req, res, next) => {
    const INSERT_MAQ_OT_QUERY = `INSERT INTO OT_Maq(ordenTrabajo, maquina, tiempo_uso) VALUES(${req.body.OT},${req.body.maquina},${req.body.tiempo});`
    con.query(INSERT_MAQ_OT_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('tipo adicionado con exito')
        }
    })
})


/*
DEMANDA
*/

app.get('/pivot-tipo-mes' , (req, res, next) => {
  con.query(`SELECT tipo, 
            COUNT(IF(MONTH(fecha_llegada) = 1, 1, NULL)) AS Enero,
            COUNT(IF(MONTH(fecha_llegada) = 2, 1, NULL)) AS Febrero,
            COUNT(IF(MONTH(fecha_llegada) = 3, 1, NULL)) AS Marzo,
            COUNT(IF(MONTH(fecha_llegada) = 4, 1, NULL)) AS Abril,
            COUNT(IF(MONTH(fecha_llegada) = 5, 1, NULL)) AS Mayo,
            COUNT(IF(MONTH(fecha_llegada) = 6, 1, NULL)) AS Junio,
            COUNT(IF(MONTH(fecha_llegada) = 7, 1, NULL)) AS Julio,
            COUNT(IF(MONTH(fecha_llegada) = 8, 1, NULL)) AS Agosto,
            COUNT(IF(MONTH(fecha_llegada) = 9, 1, NULL)) AS Septiembre,
            COUNT(IF(MONTH(fecha_llegada) = 10, 1, NULL)) AS Octubre,
            COUNT(IF(MONTH(fecha_llegada) = 11, 1, NULL)) AS Noviembre,
            COUNT(IF(MONTH(fecha_llegada) = 12, 1, NULL)) AS Diciembre
            FROM orden_trabajo 
            WHERE YEAR(fecha_llegada) = YEAR(CURDATE()) 
            GROUP BY tipo;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/pivot/costo/mes' , (req, res, next) => {
  con.query(`SELECT tipo, 
            SUM(IF(MONTH(fecha_llegada) = 1, monto_cobrado, NULL)) AS Enero,
            SUM(IF(MONTH(fecha_llegada) = 2, monto_cobrado, NULL)) AS Febrero,
            SUM(IF(MONTH(fecha_llegada) = 3, monto_cobrado, NULL)) AS Marzo,
            SUM(IF(MONTH(fecha_llegada) = 4, monto_cobrado, NULL)) AS Abril,
            SUM(IF(MONTH(fecha_llegada) = 5, monto_cobrado, NULL)) AS Mayo,
            SUM(IF(MONTH(fecha_llegada) = 6, monto_cobrado, NULL)) AS Junio,
            SUM(IF(MONTH(fecha_llegada) = 7, monto_cobrado, NULL)) AS Julio,
            SUM(IF(MONTH(fecha_llegada) = 8, monto_cobrado, NULL)) AS Agosto,
            SUM(IF(MONTH(fecha_llegada) = 9, monto_cobrado, NULL)) AS Septiembre,
            SUM(IF(MONTH(fecha_llegada) = 10, monto_cobrado, NULL)) AS Octubre,
            SUM(IF(MONTH(fecha_llegada) = 11, monto_cobrado, NULL)) AS Noviembre,
            SUM(IF(MONTH(fecha_llegada) = 12, monto_cobrado, NULL)) AS Diciembre
            FROM orden_trabajo 
            WHERE YEAR(fecha_llegada) = YEAR(CURDATE()) 
            GROUP BY tipo;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/demanda/count', (req, res, next) => {
  con.query('SELECT COUNT(*) as cantidad, MONTH(fecha_llegada) as mes FROM orden_trabajo WHERE YEAR(fecha_llegada) = YEAR(CURDATE())-1 OR YEAR(fecha_llegada) = YEAR(CURDATE()) GROUP BY(MONTH(fecha_llegada)) ORDER BY(cantidad) DESC;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/tipo/trabajo/count', (req, res, next) => {
  con.query('SELECT COUNT(*) as cantidad, tipo FROM orden_trabajo GROUP BY(tipo) ORDER BY(cantidad) DESC;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/tipo/maquina/count', (req, res, next) => {
  con.query('SELECT COUNT(*) as cantidad, tipo FROM OT_Maq, maquina WHERE idMaq=maquina GROUP BY(tipo) ORDER BY(cantidad) DESC;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/identificacion/maquina/count', (req, res, next) => {
  con.query('SELECT COUNT(*) as cantidad, AVG(tiempo_uso) as prom, identificacion FROM OT_Maq, maquina WHERE idMaq=maquina GROUP BY(identificacion) ORDER BY(cantidad) DESC;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})


app.listen(426, () => {
    console.log('el servidor est?? usando el puerto 426')
})
