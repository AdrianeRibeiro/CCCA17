### Domínio:

- É o problema, em termos de negócio, que precisa ser resolvido independente da tecnologia que será utilizada.

- Complementa a camada de entities do Clean Architecture.

### Objetos de Domínio

- Entities
- Value Objects
- Domain Services
- Aggregates
- Repositories

### Entities <E>

- Abstraem regras de negócio independentes, tem identidade e estado, podendo sofrer mutação ao longo do tempo.

- Exemplos:
    - Account: O passageiro ou moterista pode ter sua conta bloqueada, a placa do carro modificada, a senha redefinida.
    - Ride: Uma corrida pode ter o status em andamento ou finalizada.

### Value Objects <VO>

- Também contém regras de negócio independentes, no entando são identificados pelo seu valor, sendo imutáveis, ou seja, a mudança implica na sua substituição. Seu papel é proteger esse valor.

- Características
    - Mede, quantifica ou descreve alguma coisa.
    - Seu valor é imutável.
    - É substituido quando seu valor mudar.
    - Pode ser comparado pelo valor que representa.

- Exemplos:CPF, Senha, Coordenadas, Segmento.

- Uma técnica para identificar um value object é tentar substituí-lo por um tipo primitivo como uma string ou um número.

### Domain Service <DS>

- Realiza tarefas específicas do domínio, não tendo estado. 

- É indicado quando a operação que você quer executar não pertence a uma entity ou a um value object.

- Exemplos:
    - DistanceCalculator: pegando duas coordenadas retorna a distância.
    - FareCalculator: calcula o valor de um segmento da corrida.
    - TokenGenerator: gera um token de acordo com um email.

- Utilize em operações que envolvem múltiplos objetos de domínio.
    - Normalmente quando uma operação afeta múltiplos objetos de domínio, não pertencendo a nenhum deles, ela deve ser descrita em um domain service.

### Como definir o relacionamento entre diferentes objetos de domínio?

- A relação entre os objetos de domínio não é a mesma utilizada no banco de dados.

- Grandes aggregates podem trazer desperdício de memória, além de sobrecarregar o banco de dados sem necessidade já que nem sempre a camada de aplicação estará interessada em utilizá-la na íntegra.

### Aggregates <A>

- Um aggregate é um agrupamento, ou cluster, de objetos de domínio como entities e value objects, estabelecendo o relacionamento entre eles.

- Todas as operações são realizadas por meio da raíz, que é uma entity ou aggregate root <AR>.

slide 30