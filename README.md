# Sequelize Model Querying MySQL

Prática com Node.js (Express, Express Generator e EJS) e Sequelize (MySQL, Model e Model Querying)

## 1. Base Express (server)

### 1.1. Clonar repositório base

```sh
git clone https://github.com/Marcelo-Diament/express-e-sequelize-base
```

### 1.2. Instalar dependências

```sh
cd server && npm install && npm run start
```

### 1.3. Acessar `localhost:3000` e navegar para garantir que está tudo funcionando corretamente.

## 2. Base Banco (MySQL)

Vamos considerar um cenário onde já temos um banco de dados modelado via SGBD.

### 2.1. Ative o MySQL no xampp.

### 2.2. Abra o workbench e execute as `queries` mais abaixo para:

* Criar o banco de dados

* Usar o banco de dados

* Criar as tabelas para papéis/funções (`roles`), planos (`plans`), marcas (`brands`), usuários (`users`), categorias (`categories`) e produtos (`products`)

* Inserir conteúdo inicial nas tabelas

Queries:

```sql
/* ARQUIVO SQL PARA O MÓDULO DE SEQUELIZE */

/* DATABASE */
-- Criando BD
CREATE DATABASE projeto_sequelize02;
-- Usando BD
USE projeto_sequelize02;
-- Apagando BD
-- DROP DATABASE projeto_sequelize02;
/* /DATABASE */

/* ROLES (papéis/funções de usuários) */
-- Criando tabela roles
CREATE TABLE roles (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    role ENUM('Administrador','Usuário Final') NOT NULL
);
-- Inserindo possíveis roles
INSERT INTO roles (role) VALUES ('Administrador'),('Usuário Final');
-- Verificando tabela
DESCRIBE roles;
-- Verificando registros
SELECT * FROM roles;
-- Apagando tabela
-- DROP TABLE roles;
/* /ROLES */

/* PLANS */
CREATE TABLE plans (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    plan ENUM('Free','Pro','VIP') NOT NULL
);
-- Inserindo possíveis plans
INSERT INTO plans (plan) VALUES ('Free'),('Pro'),('VIP');
-- Verificando tabela
DESCRIBE plans;
-- Verificando registros
SELECT * FROM plans;
-- Apagando tabela
-- DROP TABLE plans;
/* /PLANS */

/* CATEGORIES */
CREATE TABLE categories (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(20) NOT NULL
);
-- Inserindo possíveis categories
INSERT INTO categories (category) VALUES ('Áudio e Vídeo'),('Games'),('Informática');
-- Verificando tabela
DESCRIBE categories;
-- Verificando registros
SELECT * FROM categories;
-- Apagando tabela
-- DROP TABLE categories;
/* /CATEGORIES */

/* BRANDS (marcas) */
-- Criando tabela brands
CREATE TABLE brands (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    brand VARCHAR(20) NOT NULL
);
-- Inserindo possíveis brands
INSERT INTO brands (brand) VALUES ('Acer'),('B&O'),('JBL'),('Nintendo'),('PlayStation'),('Samsung'),('Sony');
-- Verificando tabela
DESCRIBE brands;
-- Verificando registros
SELECT * FROM brands;
-- Apagando tabela
-- DROP TABLE brands;
/* /BRANDS */

/* PRODUCTS */
-- Criando tabela products
CREATE TABLE products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(20) NOT NULL,
    nome VARCHAR(20) NOT NULL,
    resumo VARCHAR(250) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(150) DEFAULT '/images/product-placeholder.png',
    videoId VARCHAR(30),
    especificacoes TEXT,
    preco DECIMAL(8,2) NOT NULL,
    precoPromo DECIMAL(8,2) DEFAULT null,
    categoria_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_product_category FOREIGN KEY (categoria_id) REFERENCES categories(id),
    marca_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_product_brand FOREIGN KEY (marca_id) REFERENCES brands(id)
);
-- Inserindo possíveis products
INSERT INTO products (sku,nome,resumo,descricao,imagem,videoId,especificacoes,preco,precoPromo,categoria_id,marca_id)
	VALUES ("jbl-cxsom-00",  "Caixa de Som",  "Caixa de Som 20 WATTS, excelente qualidade de áudio.",  "Caixa de Som 20 WATTS, excelente qualidade de áudio. Conexão Bluetooth e WiFi, opção Mono ou Stereo. Entrada USB e saída para alto falantes.",  "/images/caixa-de-som.png",  "KiL7ycBgh2o",  "altura:120 cm|largura:60 cm|profundidade:50 cm|peso:12 kg|voltagem:Bivolt|inputs:USB, P2, P10|outputs:P2, P10|conectividade:WiFi, Bluetooth, cabos auxiliares",  500,  499,  1,  3),
	("son-camdig-01",  "Câmera Digital",  "Câmera Digital 12 MP com Zoom até 4x. Visão noturna e gravação de vídeos de até 1 minuto (Full HD).",  "Câmera Digital 12 MP com Zoom até 4x. Visão noturna e gravação de vídeos de até 1 minuto (Full HD). Compartilhe suas fotos online instantaneamente.",  "/images/camera.png",  "KiL7ycBgh2o",  "altura:6 cm|largura:10 cm|profundidade:4 cm|peso:150 g|voltagem:Bivolt|inputs:USB, P2, P10|outputs:P2, P10,conectividade:WiFi, Bluetooth, cabos auxiliares",  350,  349,  1,  7),
	("ps-ctrgm-02",  "Controle Game",  "Controle top! Conexão com fio, via USB ou wireless (Bluetooth).",  "Controle top! Conexão com fio, via USB ou wireless (Bluetooth). Garantia de 12 meses contra defeitos de fabricação. Na compra de 12 unidades, ganhe um porta copos de brinde.",  "/images/controle-game.png",  "KiL7ycBgh2o",  "altura:20 cm|largura:40 cm|profundidade:10 cm|peso:100 g|voltagem:Bivolt|inputs:P2|outputs:P2|conectividade:Bluetooth",  600,  null,  2,  5),
	("bng-fnov-03",  "Fone de Ouvido",  "Pra ouvir aquela sonzeira... Controle por voz, possibilidade de atender telefone, transmitir partidas de jogos.",  "Pra ouvir aquela sonzeira... Controle por voz, possibilidade de atender telefone, transmitir partidas de jogos. Bateria com duração de 12 horas (ligado direto). Possibilidade de uso de bateria ou pilha palito (AAA).",  "/images/fone-de-ouvido.png",  "KiL7ycBgh2o",  "altura:50 cm|largura:60 cm|profundidade:15 cm|peso:180 g|voltagem:Bivolt|inputs:USB",  800,  600,  1,  2),
	("ps-game-04",  "Video Game",  "Video game PlayStation original. Garantia de 6 meses com opção de estender a garantia por mais 18 meses.",  "Video game PlayStation original. Garantia de 6 meses com opção de estender a garantia por mais 18 meses (consultar nossos vendedores ou central de atendimento para maiores informações).",  "/images/game.png",  "KiL7ycBgh2o",  "altura:4 cm|largura:40 cm|profundidade:20 cm|peso:1.2kg|voltagem:Bivolt|inputs:USB, P2, P10|outputs:P2, P10",  700,  null,  2,  5),
	("nin-gabo-05",  "Game Boy",  "Game portátil da Nintendo. Acompanha joguinho com mais de 1000 jogos.",  "Game portátil da Nintendo. Acompanha joguinho com mais de 1000 jogos - do Jogo da Cobrinha ao jogo da Paciência. Opção de conectar com redes Wi Fi e de jogos multiplayer.",  "/images/gameboy.png",  "KiL7ycBgh2o",  "altura:20 cm|largura:10 cm|profundidade:5 cm|peso:92 g|voltagem:Bivolt",  700,  null,  2,  4),
	("bng-micf-06",  "Microfone",  "Em alto e bom som! Esse microfone amplifica sua voz em até 100 vezes.",  "Em alto e bom som! Esse microfone amplifica sua voz em até 100 vezes - isola ruídos, afina a voz automaticamente, deixa o locutor bonito na fita. Indicado para vozes aveludadas.",  "/images/microfone.png",  "KiL7ycBgh2o",  "altura:18 cm|largura:8 cm|profundidade:8 cm|peso:135 g|voltagem:Bivolt|outputs:P2",  750,  null,  1,  2),
	("ace-note-07",  "Notebook",  "Notebook Acert modelo TopTopzera++.",  "Notebook Acert modelo TopTopzera++. Processador Intel i7 5a geração, 12 polegadas de tela com resolução 4K. Memória de 32 GB expansível até 64 GB, placa de vídeo NVidea. Acompanha mouse, teclado e possui webcam embutida.",  "/images/notebook.png",  "KiL7ycBgh2o",  "altura:30 cm|largura:45 cm|profundidade:5 cm|peso:422 g|voltagem:110V|inputs:SB,Bluetooth",  1700,  1500,  3,  1),
	("ssg-oclweb-08",  "Óculos Webcam",  "Óculos com Webcam 20 MP.",  "Óculos com Webcam 20 MP. Transmite diretamente para o YouTube ou outro programa de streaming. Possui funcionalidade de compartilhamento de vídeos ao vivo no TikTok e no Instagram.",  "/images/oculos-com-webcam.png",  "KiL7ycBgh2o",  "altura:20 cm|largura:10 cm|profundidade:15 cm|peso:121 g|voltagem:Bivolt",  1000,  990,  1,  6),
	("ssg-oclvrr-09",  "Óculos VR",  "Óculos com Realidade Virtual. Confira!",  "Óculos com Realidade Virtual - contra indicado para pessoas com labirintite, epilepsia ou problemas relacionados ao equilíbrio. Use com segurança, assegure-se de que o local é seguro e, de preferência, utilize o produto estando sentado ou deitado.",  "/images/oculos-vr.png",  "KiL7ycBgh2o",  "altura:20 cm|largura:10 cm|profundidade:15 cm|peso:121 g|voltagem:Bivolt",  1000,  990,  1,  6),
	("ace-pnd-10",  "Pendrive",  "Pendrive 16 GB. Permite armazenar vídeos, fotos, GIFs, músicas em MP3 e até mesmo arquivos do tipo \"Bloco de Nota\" (.txt).",  "Pendrive 16 GB. Permite armazenar vídeos, fotos, GIFs, músicas em MP3 e até mesmo arquivos do tipo \"Bloco de Nota\" (.txt). Guarde seus arquivos em mídia física, não dependa das nuvens.",  "/images/pendrive.png",  "KiL7ycBgh2o",  "altura:6 cm|largura:1 cm|profundidade:0.8cm|peso:10 g|outputs:USB|conectividade:USB",  17,  15,  3,  1),
	("ssm-smtwtc-11",  "Smartwatch",  "Smartwatch Topzera D+! À prova d'água (até 5 m de profundidade).",  "Smartwatch Topzera D+! Além das funções \"Atender Ligação\", \"Medir Passos\", \"Despertar\", \"Toque Falso\" e \"Lanterna\", também permite ver as horas com margem de apenas 3 minutos de erro (para mais ou para menos). À prova d'água (até 5 m de profundidade).",  "/images/smartwatch.png",  "KiL7ycBgh2o",  "altura:6 cm|largura:10 cm|profundidade:1 cm|peso:8 g",  2000,  null,  3,  6);

-- Verificando tabela
DESCRIBE products;
-- Verificando registros
SELECT * FROM products;
-- Apagando tabela
-- DROP TABLE products;
/* /PRODUCTS */

/* USERS */
-- Criando tabela users
CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    apelido VARCHAR(50),
    nascimento DATE,
    senha VARCHAR(512) NOT NULL,
    corPreferida CHAR(7),
    avatar VARCHAR(150) DEFAULT '/images/user-placeholder.png',
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(13),
    bio TEXT,
    plano_id INT UNSIGNED NOT NULL DEFAULT 1,
    CONSTRAINT fk_user_plan FOREIGN KEY (plano_id) REFERENCES plans(id),
    papel_id INT UNSIGNED NOT NULL DEFAULT 2,
    CONSTRAINT fk_user_role FOREIGN KEY (papel_id) REFERENCES roles(id),
    criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Inserindo possíveis products
INSERT INTO users (nome, sobrenome, apelido, nascimento, senha, corPreferida, avatar, email, telefone, bio, plano_id, papel_id, criadoEm, modificadoEm)
	VALUES ("Adriana","Santos","Adris","1951-10-31","321","#a34700","/images/adriana.png","adriana.santos@jeff.co","5511123456789","Eu sou Adriana, nasci em 1951 e gosto de tirar caquinha do nariz.",3,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Bruna","Silva","Bruninha","1967-11-11","123","#f089a5","/images/bruna.png","bruna.silva@jeff.co","5511123456789","Eu sou Bruna, nasci em 1967, em Woodstock. Sou filha da Janis Joplin com o Sergei - mas eles nunca admitiram. Por isso fui criada pelo Jim Morrison.",1,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Carlos","Roberto","Beto","1982-07-03","123","#00f9a5","/images/carlos.png","carlos.roberto@jeff.co","5511123456789","Eu sou Carlos, nasci em 1982 e Roberto é meu sobrenome mesmo.",2,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Douglas","Funny","","1999-06-21","123","#008faf","/images/douglas.png","douglas.funny@jeff.co","5511123456789","Eu sou Douglas, nasci em 1999 e tenho esse nome em homenagem ao Doug Funny (queriam me chamar de Costelinha, mas o delegado não deixou - ufa!).",3,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Erik","Gouveia","","2002-08-05","123","#ffa20f","/images/erik.png","erik.gouveia@jeff.co","5511123456789","Eu sou Erik, nasci em 2002 e, apesar de ser veggie, não gosto de comer salada. Nem frutas. Muito menos legumes. Então só tomo água mesmo.",3,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Flávia","Oliveira","Flavis","1977-07-01","123","#0089ff","/images/flavia.png","flavia.oliveira@jeff.co","5511123456789","Eu sou Flávia, nasci em 1977 e gostava de passar trotes por telefone. Mas desde que incluíram uma bina no celular, não pude mais praticar esse meu hobbie.",1,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Gilson","Soares","Gilsin","1921-09-15","123","#c089c5","/images/gilson.png","gilson.soares@jeff.co","5511123456789","Eu sou Gilson, nasci em 1921 e tenho saudades da minha juventude.",2,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Helena","Rios","Lena","1987-07-29","123","#c8c9c5","/images/helena.png","helena.rios@jeff.co","5511123456789","Eu sou Helena, nasci em 1987 e no meu tempo livre, gosto de me fantasiar de Zé Gotinha e passear no shopping.",2,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Igor","Godoi","Igodoi","1988-04-01","123","#0649a5","/images/igor.png","igor.godoi@jeff.co","5511123456789","Eu sou Igor, nasci em 1988 e gosto de tirar caquinha do nariz.",1,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Joana","Sousa","Joni","1994-03-12","123456","#7dff1a","/images/joana.png","joana.sousa@jeff.co","5511123456789","Testando 1, 2, 3",3,1,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Kenny","Diniz","Kenny D","1966-02-28","123","#0089a5","/images/kenny.png","kenny.diniz@jeff.co","5511123456789","Eu sou Kenny, nasci em 1966. Meu apelido é Kenny D por que sou fã do Kenny G.",2,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13"),
	("Luiz","da Cunha","Lulu","2004-05-30","123","#c84048","/images/luiz.png","luiz.da.cunha@jeff.co","5511123456789","Eu sou Luiz, nasci em 2004 e gosto de assistir vídeos do Nelipe Feto.",1,2,"2021-09-01 01:02:03", "2021-09-02 11:12:13");
-- Verificando tabela
DESCRIBE users;
-- Verificando registros
SELECT * FROM users;
-- Apagando tabela
-- DROP TABLE users;
/* /USERS */
```

Para ver o diagrama de relacionamento de entidades (DER), basta executar o comando Reverse Engineering ( `Control + R` ou `Database > Reverse Engineer...` ).

## 3. Instalação Sequelize

Dentro da pasta `server` , vamos instalar as dependências:

### 3.1. Dependências:

```sh
npm install sequelize mysql2
```

### 3.2. Dependências de Desenvolvimento:

```sh
npm install --save -D sequelize-cli
```

## 4. Configuração Sequelize

### 4.1. Dados de conexão

Dentro da pasta server, vamos criar o arquivo `config/database.js` :

```sh
mkdir config && cd config && touch database.js && code database.js
```

No arquivo criado, vamos incluir as configurações de conexão (num projeto real devemos deixar esse arquivo oculto por ter dados sensíveis, de conexão com o BD):

```js
const config = {
    username: 'root',
    password: '',
    database: 'projeto_sequelize02',
    host: 'localhost',
    dialect: 'mysql'
}

module.exports = config
```

Essa não é a conexão em si, mas os dados para que realizemos a conexão.

### 4.2. Configuração

Em `server` , vamos criar o arquivo `.sequelizerc` (arquivos `rc` são arquivos de configuração, onde `rc` pode ser lido como `run commands` , `resource control` , `runtime configuration` ou `run control` . Perceba que começa com `.` , logo é um arquivo oculto).

```sh
touch .sequelizerc && code .sequelizerc
```

Dentro desse arquivo incluiremos o seguinte trecho de código:

```js
const path = require('path')

module.exports = {
    'config': path.resolve('config', 'database.js')
}
```

## 5. Models

### 5.1. Init Models

Basta rodar o comando `npx sequelize init:models` no terminal (dentro da pasta `server` ).

Perceba que uma pasta `models` foi criada e, dentro dela, o arquivo `index.js` - precisamos atualizar o caminho das configurações para `const config = require('../config/database.js')` .

Agora precisamos incluir o caminho até essa pasta `models` no nosso arquivo `.sequelizerc` . Ele ficará assim:

```js
const path = require('path')

module.exports = {
    'config': path.resolve('config', 'database.js'),
    'models': path.resolve('models')
}
```
