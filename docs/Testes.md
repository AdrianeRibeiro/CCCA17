### Unit Tests

- São testes de unidade que não representam um requisito funcional e sem qualquer interação com recursos externos como um banco de dados, uma API ou o sistema de arquivos.

- São muito rápidos, estáveis e resistentes.

- Não são necessariamente unitários e podem ou não envolver mais de uma classe.

### Integration Tests

- Testam componentes diferentes, pertencentes à múltiplas camadas, normalmente envolvendo recursos externos.

- Os recursos externos podem ser reais ou não: o fato de utilizar um Test Pattern como stub ou mock não torna o teste de unidade.

- Em geral são mais lentos por interagirem com recursos externos e fazerem I/O.

### E2E Tests

- Replicam o ambiente do usuário final, ou seja, são testes executados de ponta a ponta envolvendo o frontend, backend e banco de dados.

- Além de lentos, são frágeis e sensíveis a modificações, principalmente no frontend.

### Test double

- Um test double é um padrão que tem o objetivo de substituir um DOC (depended-on component) em um determinado tipo de teste por motivos de performance ou segurança.

### Test Patterns

#### Dummy

- Objetos que criamos apenas para completar a lista de parâmetros que precisamos passar para invocar um determinado método.

#### Stubs

- Objetos que retornam respostas prontas, definidas para um determinado teste, por questão de performance ou segurança.

- Exemplo: quando eu executar o método fazer pedido preciso que o método pegar cotação do dólar retorne 3,00.

#### Spies

- Objetos que espionam a execução do método e armazenam os resultados para verificação posterior.

- Exemplo: quando eu executar o método fazer pedido preciso saber se o método enviar email foi invocado internamente e com quais parâmetros.

#### Mocks

- Objetos similares a stubs e spies, permitem que você diga exatamente o que quer que ele faça e o teste vai quebrar se isso não acontecer.

#### Fake

- Objetos que tem implementações que simulam o funcionamente da instância real, que seria utilizada em produção.

- Exemplo: uma base de dados em memória.
