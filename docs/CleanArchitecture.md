### Definição

- A CA é um modelo que tem como objetivo desacoplar as regras de negócio, ou domínio, da aplicação e os recursos externos como frameworks e banco de dados.

### UseCases

- Expõe o comportamento demandado pelos drivers (atores), e orquestram as entidades e os recursos externos como banco de dados, APIs, Filas, CLI...

- O cliente (usuário final ou outro sistema que consome a minha API) consome aquele código? Se sim, é usecase. 

- Exemplos: Signup, GetAccout, RequestRide, GetRide...

- Calcular distância para calcular o frete não é um usecase, pois o cálculo da distância é de uso interno.

#### Caso de uso é diferente do CRUD? 

- Caso de Uso e CRUD são conceitos diferentes, embora possam se relacionar.

- CRUD são operações (mecanismo) de persistência. 

- Pode ocorrer em determinada aplicação, que um usecase seja equivalente a uma operação de crud. Exemplo: atualizar/criar produto.

### Entities

- São responsáveis por abstrair as regras de negócio independentes, que podem ser desde um objeto com métodos até mesmo um conjunto de funções.

- O que são regras de negócio independentes?

    - A placa do carro é válida?
    - Qual a distância entre duas coordenadas?
    - Quanto é a tarifa da corrida?
    - Como é a mudança de status de uma corrida?

- Essas entidades não são as mesmas que utilizamos em um ORM.

### Interface adapters

- Fazem a ponte entre os casos de uso e os recursos externos.
    - Tratamento de requisições e respostas HTTP, lidando com parâmetros.
    - Acesso ao banco de dados, todo o código SQL pertence à esta camada.
    - Integração com uma API externa.
    - Escrita e leitura no sistema de arquivos.
    - Conversão de dados para formatos específicos com CSV e PDF.

### Frameworks and drivers

- São o nível mais baixo de abstração, é a interação com a tecnologia, como os componentes que realizam a conexão com o banco de dados, as requisições HTTP, a interação com o sistema de arquivos ou o acesso aos recursos do sistema operacional.

- Quem está dentro não conhece quem está fora, mas quem está fora conhece quem está dentro. As entidades não conhecem os use cases e esses não conhecem a implementação dos interface adapters, que não conhecem a implementação dos frameworks and drivers.

### São somente 4 camadas?

- Uma camada é a fronteira lógica entre um conjunto de componentes, que tem uma responsabilidade bem definida.

- As camadas não tem necessariamente relação física com as pastas.

### Main

- É o ponto de entrada da aplicação (HTTP, CLI, UI, Testes), é lá que as fábricas e estratégias são inicializadas e as injeções de dependência são realizadas durante a inicialização.
