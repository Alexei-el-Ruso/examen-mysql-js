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
			"START TRANSACTION;" +
			"INSERT INTO pedidos(usuario_id, total, descuento_aplicado, fecha) VALUES (?,?,?,?);" +
			"SELECT id FROM pedidos where usuario_id = ? and total = ? and descuento_aplicado = ? and fecha = ?;" +
			"INSERT INTO pagos(pedido_id, monto, fecha_pago) VALUES (?,?,?);" +
			"IF (@@ERROR <> 0) BEGIN ROLLBACK;" +
			"COMMIT;" +
			"END TRANSACTION:",
			usuario_id, total_pedido, descuento_aplicado, fecha,
			usuario_id, total_pedido, descuento_aplicado, fecha,
			usuario_id, total_pedido, descuento_aplicado, fecha,
			callback
		);
	}
}

module.exports = Pedido;