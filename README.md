# GymGo

---

Aplicação construída como Monorepo para construção de um sistema full stack para busca de academias ao arredores com alguns conceitos importantes em ambas sides como backend com bancos relacionais, ferramentas atualizadas do mercado como Fastify, ORM Prisma, SOLID e entre outros. Front-end com alguns conceitos importantes e ferramentas atualizadas como: Next JS 13, Tailwind CSS, Typescript e SOLID.

Dentro da pasta server irá ser acoplado todo o código do back-end e para funcionar corretamente no seu local, basta seguir os passos a passos da inicialização do projeto e dentro da pasta client irá ficar o código responsável pelo front-end e também deve-se seguir os passos a passos da inicialização.

## Observações

Aplicação criada com alguns conceitos e regras que deve-se ser realizados como, instalar um gerenciador de versão do node (NVM) e para gerenciadores de pacotes deve-se ressaltar que esteja o npm esteja instalado e a versão seja 8.19 para que não haja divergência.

Para casos de testes, assim que finalizar a criação de um módulo, pode-se ser testado indo na pasta "request" e criar uma conexão HTTP através dos arquivos com extensão .http e clicando em "send request".

## Setup

Após as configurações acima, para inicializar a parte do server, basta instalar suas dependências e rodar o container do docker para as imagens do postgre dando um:

```
   npm i && docker compose up -d
```

Caso seja necessário remover o container que subiu, basta apenas rodar o comando:

```
    docker compose down
```

Pra simplesmente parar o container basta rodar:

```
    docker compose stop
```

Após rodar os container, basta gerar as tabelas do banco rodando o seguinte comando:

```
    npx prisma migrate dev
```

Para visualizar as tabelas do banco para consulta, basta rodar o seguinte comando:

```
    npx prisma studio
```
