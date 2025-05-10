# Web Application Document (WAD)

## Introdução

Este documento descreve a estrutura e os principais componentes do projeto **Gerenciador de Tarefas**, desenvolvido como parte da entrega de um sistema web completo utilizando o padrão arquitetural MVC. O projeto permite o gerenciamento de tarefas por usuários, incluindo criação de projetos, cadastro de tarefas e visualização por meio de uma interface web.

A aplicação foi desenvolvida utilizando **Node.js**, **Express.js**, **EJS** e **PostgreSQL**, com testes automatizados escritos em **Jest**. Toda a estrutura foi planejada para garantir manutenibilidade, organização e escalabilidade.

## Diagrama do Banco de Dados

O diagrama relacional do banco de dados utilizado neste projeto está representado abaixo:

![Diagrama Relacional](../assets/diagrama-relacional.png)

* **users**: usuários cadastrados no sistema
* **projects**: projetos criados pelos usuários
* **tasks**: tarefas vinculadas aos projetos
* **comments**: comentários realizados pelos usuários em tarefas

As entidades estão relacionadas da seguinte forma:

* Um usuário pode criar vários projetos
* Um projeto pode conter várias tarefas
* Cada tarefa pode ter um usuário responsável
* Tarefas podem conter múltiplos comentários feitos por usuários

O modelo físico das tabelas foi implementado no script `src/scripts/init.sql`, contendo as instruções SQL para criação e vinculação das entidades.

## Autor

Daniel Guilger
