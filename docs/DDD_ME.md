### Modelagem Estratégica

É o coração do DDD, onde toma-se decisões de alto nível sobre como dividir o domínio, identificar os bounded contexts, definir como eles se relacionam e alinhar tudo com os objetivos do negócio.

A Modelagem Estratégica (ME) identifica e define fronteiras entre os bounded contexts.

Fazendo uma boa modelagem estratégicas
- Divisão da complexidade
- Equipes menores
- Reuso

### Bounded contexts

- Uma fronteira lógica dentro do sistema onde um modelo de domínio é válido.

- Imagine um bounded context como uma forma de modularização de negócio que tem como objetivo reduzir o acoplamento interno do código-fonte.

- A forma de interação entre cada bounded context dá origem ao context map.

- Context Maps: diagramas que mostram como os bounded contexts se relacionam entre si e que tipo de integração eles tem.

### Tipos de subdomínio

Todo domínio pode e deve ser dividido em subdomínios.
- Domínio: problema que a organização resolve. Ex: RD - marketing digital, TOTVS - ERP
- Quem tem domínio é organização e não projeto.

> Subdomínio = área de conhecimento

> Área de conhecimento não é feature

<hr>

- Core ou Basic: É O QUE TE DIFERENCIA DO MERCADO. É o mais importante e traz mais valor para a empresa. É onde você coloca seus maiores e melhores esforços.

- Support ou Auxiliary: complementa o core domain, sem eles talvez seja difícil ter sucesso no negócio, mas você não precisa aplicar seus melhores esforços nele.

- Generic: é um subdomínio que pode ser delegado para outra empresa ou mesmo ser um produto de mercado.
    > O melhor software é aquele que você não precisa desenvolver.

#### E-commerce

- Catálogo de produtos (Core)
- Carrinho de compras (Core)
- Checkout (Core)
- Avaliação dos produtos (Suporte)
- Produtos favoritos (Suporte)
- Processamento do pagamento (Genérico)
- Emissão de nota fiscal (Genérico)
- Gestão de estoque (Genérico)

#### Gateway de Pagamento

- Gestão de recorrência (Core)
- Integração com os adquirentes e bancos (Core)
- Análise antifraude (Genérico)
- Régua de cobrança para avisar do vencimento dos boletos (Suporte)

### Integration Patterns

Os padrões de integração definem naturalmente o tipo de relacionamento entre cada bounded context.

- Partnership: 
Duas ou mais equipes podem trabalhar de forma sincronizada numa entrega que envolve dois ou mais bounded contexts.

- Shared kernel:
Contextos compartilham uma parte comum do modelo.
É relativamente normal compartilhar parte do código comum entre vários bounded contexts, principalmente por propósitos não relacionados diretamente ao negócios mas por infraestrutura.
Em termos mais técnicos, o código pode ser compartilhado por meio do relacionamento direto em um monorepo ou alguma biblioteca que deve ser versionada e publicada internamente para que possa ser importada pelos outros bounded contexts.

- Customer/Supplier:
Um contexto fornece dados para o outro (ex: vendas envia pedidos para faturamento)
Existe uma relação de fornecimento onde tanto o customer quanto o supplier podem determinar como deve ser o contrato entre eles.

- Conformist:
Um contexto aceita o modelo do outro sem adaptação (usado quando o outro é muito dominante)
Uma integração com uma API externa, contratada no modelo SaaS, acaba quase sempre sendo do tipo conformista já que temos que nos adequar a sua interface, nesses casos é normal oferecer uma Open Host Service com uma Published Language.

- Open-Host Service:
Um bounded context pode disponibilizar um conjunto de serviços utilizando um protocolo padrão e com uma documentação abrangente para quem tiver interesse em integrar.

- Anti-Corruption Layer
Cria-se uma camada de tradução entre dois contextos para evitar poluição de modelos.
As relações conformistas geralmente existem uma tradução para o domínio e isso pode ser feito por meio de adaptadores importantes para inclusive permitir a utilização de diferentes fornecedores.
Eventialmente vale a mais a pena ir por caminhos diferentes e não ter qualquer tipo de relação.

### Microserviço

A fronteira do bounded context é excelente para definir um microserviço.

Analyze Domain -> Define Bounded Contexts -> Identify Microservices

#### Vantagens

- Diversidade tecnológica
- Melhor controle sobre o débito técnico
- Facilidade em acompanhar a evolução tecnológica (por conta de uma base de código menor)

#### Desafios

- Transações distribuídas
- Dificuldade em tratar e diagnosticar erros
- Complexidade técnica mais alta
