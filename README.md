# aCrud #
## Sistema de Alunos ##

### Início ###
Este é um sistema básico de cadastro de alunos.

### Pré requisitos ###
- NodeJs (v12.21.0)
- PostgreSQL

### Passo-a-passo para execução do sistema: ###
#### I - Back-end ####
1. Clone o projeto deste repositório :)

2. No diretório ./back-end, execute o seguinte comando para instalar as dependências do back-end:
```
npm install
```
3. Execute as migrações do banco de dados e o semeie com dados iniciais, seguindo os seguintes comandos:
```
npx sequelize db:migrate
npx sequelize db:seed:all
```

3. Inicie o serviço do back-end do sistema rodando o comando:
````
npm start
````

4. O back-end do sistema instancia um http server na porta 3000, servindo os arquivos estáticos presentes em no diretório ./front-end/dist. Dessa forma é possível compilar o front-end e serví-lo apenas rodando o back-end do sistema.

#### II - Front-end ####
1. Em outra instância do seu terminal, navegue até o diretório ./front-end e execute o seguinte comando para instalar as dependências do frontend:
````
npm install
````

2. Após a instalação das dependências, execute o seguinte comando para iniciar o serviço do front-end:
````
npm run serve
````

3. Acesse o sistema por meio do endereço http://localhost:8080.

4. Para compilar o front-end a fim de gerar arquivos estáticos para produção, execute o seguinte comando:
```
npm run build
```
Após o comando finalizar sua execução, os arquivos estáticos gerados podem ser encontrados no diretório ./dist. Esses arquivos podem ser servidos por um http server.

5. Quando estiver com o serviço do front-end em execução simultaneamente ao serviço do back-end, acesse http://localhost:8080 para utilizar o sistema, com hot-reload no front-end.


### Nuvem ###
1. O sistema também pode ser encontrado seguindo o link https://3.144.144.228:3000 no seu navegador. Atualmente, o sistema está rodando em uma instância ec2 da AWS.
