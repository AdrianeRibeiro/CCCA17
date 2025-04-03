### Refatoração

- Alteração feita na estrutura interna do software para torná-lo mais fácil de ser entendido e menos custoso de ser modificado, sem alterar o seu comportamento observável.

### Code Smells e Técnicas de refactoring

- Um smell é um sintoma que ocorre dentro do código fonte e que pode ser um indicador de problemas.


#### Renomear variável

- ALTERE O NOME de uma variável, método ou classe que não está revelando seu propósito.

```js
function calculateDiscount(amount, p) {
  const disc = (amount * p) / 100;
  return disc;
}

// refactor
function calculateDiscount(amount, percentage) {
  const discount = (amount * percentage) / 100;
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
function calculatePenalty(amount, percentage) {
  if (today.getTime() < dueDate.getTime()) return 0;
  return (amount * percentage)/100;
}

function calculateInterest(amount, percentage, dueDate) {
  if (today.getTime() < dueDate.getTime()) return 0;
  const dueDays = (today.getTime() - dueDate.getTime())/(1000*60*60*24)
  return (amount * percentage * dueDays)/100;
}

// refactor
function isOverdue(dueDate) {
  return today.getTime() > dueDate.getTime(); 
}

function calculatePenalty(amount, percentage) {
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

```js
async function sendEmailCampaign(campaign) {
  if (!campaign.sent) {
    const recipients = await repository.getRecipients(campaign.id);
    if (hasEmailQuota(recipients.length)) {
      for (const recipient of recipients) {
        if (!isBouncedRecipient(recipient)) {
          if (isAllowedRecipient(recipient)) {
            await send(campaign, recipient);
          }
        }
      }
    }
  }
}

// refactor
async function sendEmailCampaign(campaign) {
  if (campaign.sent) return

  const recipients = await repository.getRecipients(campaign.id);
  if (!hasEmailQuota(recipients.length)) return
  
  for (const recipient of recipients) {
    if (isBouncedRecipient(recipient)) continue
    if (!isAllowedRecipient(recipient)) continue

    await send(campaign, recipient)
  }
}
```

#### Introduzir comando ternário

```js
function getClass(element) {
  if (element.buttonClass) {
    return element.buttonClass;
  } else {
    return "btn-lg";
  }
} 

// refactor
function getClass(element) {
  (element.buttonClass) ? element.buttonClass : "btn-lg"
} 
```


#### Remover comando ternário

```js
function calculateTax(amount, last12monthRevenue) {
  return (last12monthRevenue <= 120000) ? amount * 0.06 :
  ((last12monthRevenue <= 240000) ? amount * 0.08 :
  ((last12monthRevenue <= 360000) ? amount * 0.12 : amount *
  0.15));
}

// refactor
function calculateTax(amount, last12monthRevenue) {
  if(last12monthRevenue <= 120000) {
    return amount * 0.06
  }

  if(last12monthRevenue <= 240000) {
    return amount * 0.08
  }

  if(last12monthRevenue <= 360000) {
    return amount * 0.12
  }

  return amount * 0.15
}
```

#### Outros

- Código morto -> Apagar o código
- Linhas em branco -> Apagar as linhas em branco
- Variáveis declaradas longe da utilização -> Mover variáveis
- Falta de tratamento de exceções -> Substituir código de erro por exceção
