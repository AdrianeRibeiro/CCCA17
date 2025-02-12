## Usecase
- O cliente (usuário final, outro sistema que consome a minha API) consome aquele código? se sim, é usecase. 
- Exemplo: calcular distância para calcular o frete não é um usecase, pois o cálculo da distância é de uso interno.
- Calcular distância é uma regra independente (entity) que pode ser reaproveitada.


## Caso de uso é diferente do CRUD? 
- São coisas diferentes.
- O crud são operações (mecanismo) de persistência. 
- Pode ocorrer em determinada aplicação, que um usecase seja equivalente a uma operação de crud. Exemplo: atualizar/criar produto.

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