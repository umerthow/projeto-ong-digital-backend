Projeto ONG Digital


###Requisitos:

- NodeJS >= v7.10.0
- MySQL >= 5.7

###Instalação:

1 - git clone https://github.com/michel-jader/projeto-ong-digital-backend

2 - Acesse a pasta raiz do projeto (projeto-ong-digital-backend) e execute o comando:
	
	"npm install"

###Execução dos testes:

1 - Crie um arquivo chamado .env na raiz da pasta test do projeto. Ficara assim:

	"projeto-ong-digital-backend/test/.env"

2 - Copie o conteudo do arquivo ".env-development" e cole dentro do arquivo "projeto-ong-digital-backend/test/.env"

3 - Edite o valor das variaveis do arquivo "projeto-ong-digital-backend/test/.env" para apontarem para o banco de dados corretamente:

	Exemplo:

	MYSQL_USER=nome_usuario_mysql
	MYSQL_PASSWORD=senha_mysql
	MYSQL_DATABASE=nome_do_banco_de_dados
	MYSQL_PORT=3306
	MYSQL_HOST=localhost

4 - Acesse a pasta raiz do projeto (projeto-ong-digital-backend) e execute o comando:

	"npm test"



###Execução da aplicação em desenvolvimento:

1 - Edite o valor das variaveis do arquivo ".env-development" para que apontem para o banco de desenvolvimento. Se o banco de desenvolvimento for o mesmo de testes basta copiar o conteudo do arquivo "projeto-ong-digital-backend/test/.env". 


2 - Acesse a pasta raiz do projeto (projeto-ong-digital-backend) e execute o comando:

	"npm run start"



