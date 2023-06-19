# Food-Explorer---BACK-END
O Food Explorer é um aplicativo web que permite aos usuários explorar uma ampla variedade de receitas de comida. Ele oferece uma interface amigável onde os usuários podem pesquisar receitas, filtrá-las por vários critérios e salvar suas receitas favoritas para referência futura. O aplicativo também fornece informações nutricionais para cada receita, facilitando aos usuários tomar decisões informadas sobre suas refeições.
Na primeira etapa devemos criar a conta e se autenticar para identificarmos se o usuário é um administrador ou se é um consumidor.
![image](https://github.com/Josuezuu/Food-Explorer---BACK-END/assets/108033077/5f3ceaac-112d-4e83-aa8c-7bd1532b2c4c)

Feito isso, o usuário seguirá para a página "Home" onde este poderá verificar todos os produtos cadastrados na plataforma.
O usuário pode favoritar os itens que quiser, filtrar os itens por nome, ingredientes ou favoritos.
O usuário pode tambem adicionar os itens que quiser ao carrinho e seguir para o metodo de pagamento que preferir.

![image](https://github.com/Josuezuu/Food-Explorer---BACK-END/assets/108033077/50769a54-a649-4d85-86ab-a0ec8f5f1ce7)
![image](https://github.com/Josuezuu/Food-Explorer---BACK-END/assets/108033077/a6123dc5-1aef-4cc2-be6a-6d445368f0b7)
![image](https://github.com/Josuezuu/Food-Explorer---BACK-END/assets/108033077/f18fc6bc-e444-440e-88db-c4628ef045d7)
![image](https://github.com/Josuezuu/Food-Explorer---BACK-END/assets/108033077/430e4a91-0fa6-4809-aab7-1126586a3716)


# Usuário ADMIN:

Este terá uma interface bem parecida com a do usuário, porém com novas funcionalidades.
O usuário ADMIN poderá criar novos pratos e poderá editar os pratos existentes para os seus clientes.
Por fim, o usuário admin consegue visualizar os pedidos gerados pelos clientes e se organizar de acordo.

![image](https://github.com/Josuezuu/Food-Explorer---BACK-END/assets/108033077/25ec2abf-9e60-417a-8a2a-9fbf5f30b98d)


# INSTALAÇÃO:

Para rodar o projeto em sua máquina, utilize o comando "git clone", navegue até o diretório do projeto e utilize o comando "npm install" para instalar as dependencias do projeto.
Para iniciar, utilize o comando "npm run dev".
Para atualizar as tabelas no banco de dados, utilize o comando "npm run migrate".

OBS: caso você exclua meu banco de dados, certifique-se de que ao criá-lo novamente, as categorias "Refeição, Bebidas e Sobremesas" sejam criadas adequadamente. Talvez seja necessário realizar uma alteração na página HOME no front-end do projeto pois os "IDs" das categorias podem variar.

# DEPLOY

https://foodexplorer-josue.netlify.app/

Para utilizar o login de administrador, utilize as credenciais abaixo:
login: admin@admin.com
senha: admin1

Caso queira definir um novo administrador, basta executar o comando abaixo na query do seu banco de dados:
UPDATE users
SET isAdmin = true
WHERE id = 1;

**lembrando que o ID varia de acordo com o usuário selecionado.


# Tecnologias utilizadas:

- Node.js
- Express.js
- Knex
- Query Builder
- Cors
- DiskStorage
- Autenticação com JWT token
- Migrations
- Estrutura de pastas com Rotas, controllers, middlewares, utils, migrations.
