# Objetivo
Criar um template de API com regra de negócio simplificada, mas que seja escalável para milhões de usuários com diversas técnicas de escalonamento e performance.

## Técnicas de escalonamento e performance

* CQRS
   * é uma forma de desacoplar as responsabilidades de persistência em `Command` e `Queries`, geralmente usado com Event Sourcing.
   Todas as vezes que executamos um `Command`, um evento de mudança é disparado. 
   E também é amplamente comum utilizar um banco de dados de `EventStore`, como o `DynamoDB` para disparar os comandos para a tabela de eventos. É bom para escalar grande volumes de dados sendo anexados, além de trazer auditabilidade, rastreabilidade e segurança de replicar todos os dados existentes com o histórico no banco de dados de `EventStore`.
* Event Sourcing

* Sourcing Command
  * Traz a possibilidade de replicarmos todos os comandos, mas dar valores diferentes para ver quais resultados ele geraria em determinadas épocas. Isso é interessante, pois conseguirmos simular o que aconteceria com o sistema se tivesse em uma outra situação. Ele é um banco de dados que salva todos os comandos, mas ele é usado com Event Sourcing.