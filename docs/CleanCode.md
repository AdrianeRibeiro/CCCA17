### Refatoração

- Alteração feita na estrutura interna do software para torná-lo mais fácil de ser entendido e menos custoso de ser modificado, sem alterar o seu comportamento observável.

### Code Smells e Técnicas de refactoring

- Um smell é um sintoma que ocorre dentro do código fonte e que pode ser um indicador de problemas.


#### Renomear variável

- ALTERE O NOME de uma variável, método ou classe que não está revelando seu propósito.

```js
function calculateDiscount(amount, p) {
    const disc = (amount * p)/100;
    return disc;
}

// refactor
function calculateDiscount(amount, percentage) {
    const discount = (amount * percentage)/100;
    return discount;
}
```

#### Números mágicos

- Substituir números mágicos por constantes.

```js
function calculatePotencialEnergy(mass, height) {
    return mass * 9.81 * height; 
}

// refactor
const GRAVITY = 9.81;
function calculatePotencialEnergy(mass, height) {
    return mass * GRAVITY * height; 
}
```

#### Comentários

- Introduzir Variável Explicativa.

- Se você tem uma expressão que não é suficientemente clara: coloque a expressão, ou partes dela, em uma variável temporária ou método cujo único objetivo é explicar seu propósito.

```js
function calculateRide(hour, distance) {
    // overnight
    if (hour > 22 || hour < 6) {
        return distance * 3.90;
    } else {
        return distance * 2.10;
    }
}

// refactor
function isOvernight (hour) {
    return hour > 22 || hour < 6;
}

function calculateRide(hour, distance) {
    const isOvernight = hour > 22 || hour < 6;
    if (isOvernight(hour)) {
        return distance * 3.90;
    } else {
        return distance * 2.10;
    }
}
```

#### Código duplicado

- Extrair método

```js
function calculatePenalty (amount, percentage) {
    if (today.getTime() < dueDate.getTime()) return 0;
    return (amount * percentage)/100;
}

function calculateInterest(amount, percentage, dueDate) {
    if (today.getTime() < dueDate.getTime()) return 0;
    const dueDays = (today.getTime() - dueDate.getTime())/(1000*60*60*24)
    return (amount * percentage * dueDays)/100;
}

// refactor
function isOverdue (dueDate) {
    return today.getTime() > dueDate.getTime(); 
}

function calculatePenalty (amount, percentage) {
    if (!isOverdue(dueDate)) return 0;
    return (amount * percentage)/100;
}

function calculateInterest(amount, percentage, dueDate) {
    if (!isOverdue(dueDate)) return 0;
    const dueDays = (today.getTime() - dueDate.getTime())/(1000*60*60*24)
    return (amount * percentage * dueDays)/100;
}
```

#### Condições confusas

- Remover condição aninhada por cláusulas guarda

#### Outros

- Código morto -> Apagar o código
- Linhas em branco -> Apagar as linhas em branco
- Variáveis declaradas longe da utilizaçaõ -> Mover variáveis