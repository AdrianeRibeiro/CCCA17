## Event-Driven Architecture

### Transação

- É a abstração de um conjunto de operações que devem ser tratada como uma unidade lógica, onde para ter sucesso, todas as suas operações devem ser bem sucedidas ou serem desfeitas.

- Uma forma comum de pensar em uma transação é pelo conceito de ACID ou Atomicity, Consistency, Isolation e Durability, relacionado a comandos executados em um banco de dados relacional.

### ACID

- Atomicity: todos os comandos da transação são tratados como uma unidade, todos executam ou nenhuma executa.

- Consistency: respeitam as regras de consistência estabelecidas no modelo de dados por meio de constraints, cascades, triggers e a sua combinação.

- Isolation: faz com que a transação não tenha interferência de outros comandos que estejam sendo executados em paralelo por outras transações.

- Durability: garante que uma vez comitada o resultado da transação seja persistido de forma definitiva.

#### Compra de um produto em uma e-commerce

- Processamento do pagamento
- Emissão da nota fiscal
- Expedição do estoque
- Solicitação de coleta
- Crédito de pontos de fidelização
- Geração de cupom de desconto para a próxima compra

### Sistemas distribuídos

- A maior parte dos sistemas tem transações distribuídas e com muitos pontos de falha.

- Quanto mais complexa e distribuída for a arquitetura, maiores são as chances de alguma coisa dar errado e a resiliência é a capacidade de manter o funcionamento e se recuperar de falhas.

### Como lidar com transações de forma resiliente?

- Retry: simplesmente realiza uma ou mais retentativas em um pequeno intervalo de tempo, elas podem resolver problemas simples como perda de pacotes, oscilações na rede e até mesmo um deploy fora de hora.

- Fallback: ao se deparar com uma indisponibilidade faz a tentativa em outro serviço, por exemplo, um grande e-commerce deve trabalhar com diversos adquirentes de cartão de crédito para evitar indisponibilidades e até mesmo bloqueios.

- Saga: é responsável pelo gerenciamento de uma transação de longa duração por meio de uma sequência de transações locais.

### Tipos de transações locais

- Pivot Transaction: são transações go/no go, ou seja, a partir delas é decidido se o fluxo de execução segue em frente ou é abortado.

> Exemplos No go: Cartão rejeitado, sem saldo; Transação deu certo, mas não tem estoque.

- Compensable Transaction: são desfeitas caso a transação toda seja abortada.

- Retriable Transaction: tem uma garantia de execução e podem se recuperar de uma possível falha ou indisposição.