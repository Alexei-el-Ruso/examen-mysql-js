create database ecommerce_db;
use ecommerce_db;

create table usuarios (
	id int primary key auto_increment,
	nombre varchar(100) not null,
	email varchar(100) unique not null
);

create table pedidos (
	id int primary key auto_increment,
    usuario_id int not null,
    foreign key (usuario_id) references usuarios(id),
    total decimal(10,2) not null check (total >= 0),
    descuento_aplicado decimal (10,2) not null default 0,
    fecha datetime not null
);

create table pagos (
	id int primary key,
    pedido_id int not null,
    foreign key (pedido_id) references pedidos(id),
    monto decimal(10,2) check (monto > 0),
    fecha_pago datetime not null
);