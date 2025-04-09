

## Domínio anêmico

- Objeto: características (propriedades) e comportamentos
- Estrutura de dados: características (propriedades) + get e setters

## Interface adapters

- Fazem a ponte entre os casos de uso e os recursos externos (http, fila, banco).
- Tratamento de requisições e respostas HTTP, lidando com parâmetros, acesso ao banco, SQL pertence a essa camada, interação com API externa.

- O motivo do repository existir é conhecer a entity. Papel do repository é persistir e retornar o object.

Account e cpf: entities
signup e account: usecases
repository: interface adapter
api: interface adapter


docker-compose down -v

psql -U postgres -d app
\dt cccat17.*


