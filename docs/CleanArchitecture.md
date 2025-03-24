### Definição

- A CA é um modelo que tem como objetivo desacoplar as regras de negócio, ou domínio, da aplicação e os recursos externos como frameworks e banco de dados.

### UseCases

- Expõe o comportamento demandado pelos drivers (atores), e orquestram as entidades e os recursos externos como banco de dados, APIs, Filas, CLI...

- O cliente (usuário final ou outro sistema que consome a minha API) consome aquele código? Se sim, é usecase. 

- Exemplos: Signup, GetAccout, RequestRide, GetRide...

- Calcular distância para calcular o frete não é um usecase, pois o cálculo da distância é de uso interno.

### Caso de uso é diferente do CRUD? 

- Caso de Uso e CRUD são conceitos diferentes, embora possam se relacionar.

- CRUD são operações (mecanismo) de persistência. 

- Pode ocorrer em determinada aplicação, que um usecase seja equivalente a uma operação de crud. Exemplo: atualizar/criar produto.

slide 10