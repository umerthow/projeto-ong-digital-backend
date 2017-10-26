# Projeto ONG Digital

## Requisitos:

- NodeJS >= v7.10.0
- MySQL >= 5.7

## Instalação:

1 - Fork do [repositório](https://github.com/TiagoTi/projeto-ong-digital-backend) e clone do fork.

2 - Acesse a pasta raiz do projeto `"projeto-ong-digital-backend"` e execute o comando:

```bash
npm install
```

3 - Instale a CLI do [sequelize](http://docs.sequelizejs.com/), executando: 
	
```bash
npm install sequelize -g
```

>	Obs: Talvez seja necessário ter privilégios de *root* para instalação da cli.

4 - Após instalação da cli, execute na raiz do projeto:
	
```bash
sequelize init
```

5 - Na pasta `config`, edite o arquivo `config.json` com as informações do db local.

## Execução dos testes:

1 - Copie o arquivo .env.exemple na pasta `/test` do projeto com o nome .env apenas. Ficará assim:

	`projeto-ong-digital-backend/test/.env`

  - 1.1 - Faça o mesmo com o `.env-development.exemple`,
  deverá ficar assim:

    `projeto-ong-digital-backend/.env-development`

2 - Copie o conteudo do arquivo ".env-development" e cole dentro do arquivo "projeto-ong-digital-backend/test/.env"

3 - Edite o valor das variaveis do arquivo "projeto-ong-digital-backend/test/.env" para apontarem para o banco de dados corretamente:

	Exemplo:

	MYSQL_USER=nome_usuario_mysql
	MYSQL_PASSWORD=senha_mysql
	MYSQL_DATABASE=nome_do_banco_de_dados
	MYSQL_PORT=3306
	MYSQL_HOST=localhost

4 - Acesse a pasta raiz do projeto (projeto-ong-digital-backend) e execute o comando:

```bash
npm test
```

## Execução da aplicação em desenvolvimento:

1 - Edite o valor das variaveis do arquivo ".env-development" para que apontem para o banco de desenvolvimento. Se o banco de desenvolvimento for o mesmo de testes basta copiar o conteudo do arquivo "projeto-ong-digital-backend/test/.env". 


2 - Acesse a pasta raiz do projeto (projeto-ong-digital-backend) e execute o comando:

```bash
npm run start
```

> Para o windows, será necessário rodar as migrations e seeder através da [cli do sequelize](https://github.com/sequelize/cli), e após, executar o projeto com:
	
	```bash
	node index // Para execução da API
	npm run watch // Execução da API com watch nos arquivos (recomendado em desenvolvimento)
	```



