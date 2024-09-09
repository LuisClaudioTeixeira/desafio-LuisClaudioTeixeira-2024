# Sistema de manejamento de zoologico

Este desafio implementa um sistema de gestão de recintos para zoológicos, levando em consideração o conforto e a convivência entre diferentes espécies de animais. O objetivo é identificar recintos viáveis para a inclusão de novos animais com base em regras definidas sobre o espaço disponível, compatibilidade de biomas e convivência entre espécies carnívoras e não carnívoras.

## Funcionalidades

- **Verificação de bioma**: O sistema verifica se o bioma do recinto é compatível com o habitat natural de cada espécie de animal.
- **Espaço disponível**: Considera o espaço total do recinto e o espaço ocupado pelos animais já presentes. Cada animal ocupa uma quantidade específica de espaço.
- **Carnívoros e não carnívoros**: O sistema impede que animais carnívoros sejam colocados em recintos com animais não carnívoros, e vice-versa.
- **Regra de convivência para primatas**: Primatas (no caso, macacos) só podem ser adicionados em recintos que já possuem outros animais, a menos que estejam sendo adicionados em grupo.
- **Gestão de múltiplas espécies**: Considera o aumento de espaço ocupado quando múltiplas espécies são colocadas no mesmo recinto.

## Estrutura de Dados

- **Recintos**: Cada recinto possui um número, bioma, tamanho total e lista de animais.

  - Exemplo:
    ```javascript
    { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] }
    ```
- **Animais Válidos**: Cada animal possui uma espécie, tamanho, bioma natural e um indicador de se é carnívoro ou não.

  - Exemplo:
    ```javascript
    { especie: 'LEAO', tamanho: 3, bioma: 'savana', carnivoro: true }
    ```

## Regras de Inclusão de Animais

1. **Bioma Compatível**: O bioma do recinto deve ser compatível com o habitat natural do animal.
2. **Espaço Disponível**: O recinto deve ter espaço suficiente para acomodar o novo animal, levando em consideração o espaço já ocupado pelos animais presentes.
3. **Compatibilidade de Dieta**: Animais carnívoros não podem ser misturados com não carnívoros no mesmo recinto.
4. **Regra Especial para Macacos**: Macacos só podem ser colocados em recintos que já contêm outros animais, ou se estiverem sendo colocados em grupo (mais de um indivíduo).

## Exemplo de Uso

O seguinte código mostra como o sistema pode ser utilizado para verificar os recintos viáveis para a inclusão de dois macacos:

```javascript
const zoo = new RecintosZoo();
const resultado = zoo.analisaRecintos('MACACO', 2);

console.log(resultado);
```

Saída esperada:

```javascript
{
  recintosViaveis: [
    'Recinto 1 (espaço livre: 7 total: 10)',
    'Recinto 2 (espaço livre: 3 total: 5)',
    'Recinto 3 (espaço livre: 2 total: 7)'
  ]
}
```

## Testes

O projeto inclui testes unitários que garantem o funcionamento correto do sistema de análise de recintos. Os testes podem ser encontrados no arquivo `recintos-zoo.test.js` e cobrem os seguintes cenários:

- Inclusão de animais em recintos compatíveis.
- Verificação de biomas e dieta.
- Garantia de que animais não sejam colocados em recintos inadequados.

## Como Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/LuisClaudioTeixeira/desafio-LuisClaudioTeixeira-2024.git
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Execute os testes:

   ```bash
   npm test
   ```
