create table tabUsuario(
id int identity(1,1) primary key,
nome varchar(200) not null,
usuario varchar(100) not null,
senha varchar(50) null
)

drop table tabUsuario

select * from tabUsuario
select * from tabPessoa

insert tabUsuario values ('Dryelle Ebelin', 'dryelleebelin', 'teste')
insert tabPessoa values ('Dryelle Ebelin', '2004-09-07', 1.66, 53, 16000, 352000, 18, 19, 'Peso normal', 850, 27.5, 11600, 66415.09)

create table tabPessoa (
id int identity(1,1) primary key,
nome varchar(300) not null,
dataNascimento datetime not null,
altura decimal(3,2) not null,
peso decimal(6,3) not null,
salario decimal(18,2) not null,
saldo decimal(18,2) not null,
idade int null,
imc decimal(5,2) null,
classificacao varchar(300) null,
inss decimal(18,2) null,
aliquota decimal(5,2) null,
salarioLiquido decimal(18,2) null,
saldoDolar decimal(18,2) null
)

alter table tabPessoa add idUsuario int

update tabPessoa set idUsuario = 1 where id = 1

alter 