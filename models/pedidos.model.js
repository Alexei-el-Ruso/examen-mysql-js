const db = require("../db/connection");

const Pedido = {

	insertOne: (usuario_id, total_pedido, callback) => {
		let descuento_aplicado = 0;
		if (total_pedido > 1000) {
			descuento_aplicado = 10;
			total_pedido = total_pedido * (1 - descuento_aplicado / 100);
		}
		let fecha = new Date.now();
		db.query(
			"INSERT INTO pedidos(usuario_id, total, descuento_aplicado, fecha) VALUES (?,?,?,?);",
			usuario_id, total_pedido, descuento_aplicado, fecha,
			callback);
		db.query(
			"SELECT id FROM pedidos where usuario_id = ? and total = ? and descuento_aplicado = ? and fecha = ?;",
			usuario_id, total_pedido, descuento_aplicado, fecha,
			callback);
		db.query(
			"INSERT INTO pagos(pedido_id, monto, fecha_pago) VALUES (?,?,?);"
		)
	},

	getAll: (callback) => {
		db.query("SELECT * FROM clientes;", callback);
	},

	getById: (cliente_id, callback) => {
		db.query("SELECT * FROM clientes WHERE cliente_id = ?;", [cliente_id], callback);
	},

	insertSecClient: (cliente_id, nombre, email, telefono, callback) => {
		const sql = "CALL sp_insertar_cliente_seguro (?,?,?,?);";
		db.query(sql, [cliente_id, nombre, email, telefono], callback);
	},

	updateOne: (cliente_id, cliente, callback) => {
		db.query("UPDATE clientes SET ? WHERE cliente_id = ?;", [cliente, cliente_id], callback);
	},

	deleteOne: (cliente_id, callback) => {
		db.query("DELETE FROM clientes WHERE cliente_id = ?;", [cliente_id], callback);
	}
}

module.exports = Pedido;