### Single Responsibility Principle

- Devemos separar as coisas que mudam por motivos diferentes e nesse contexto a palavra responsabilidade significa motivo para mudar.

### Open/Closed

- Os componentes da arquitetura devem estar abertos para extensão e fechados para modificação.

### Liskov Substitution

- Se S é subclasse de T então objetos do tipo T podem ser substituídos por objetos do tipo S sem quebrar o funcionamento do programa.

- A proposta é garantir que subclasses possam ser intercambiadas sem causar problemas durante a execução do programa.

### Interface Segregation

- A ideia aqui é criar interfaces com base nas necessidades de cada cliente, evitando que ele dependa de métodos que ele não precisa utilizar.

### Dependency Inversion Principle

- Princípio de design. Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abastrações.