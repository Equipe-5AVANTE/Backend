# Documentação da API do Backend - Sistema de Triagem Hospitalar

Este documento detalha os endpoints da API do sistema de triagem hospitalar, incluindo métodos, URLs, e exemplos de requisição/resposta, com base no arquivo `cliente.http` e na estrutura do projeto Backend.

## Base URL

A URL base para todos os endpoints da API é configurável e pode ser definida em variáveis de ambiente. O valor padrão para desenvolvimento é:

`http://localhost:4000`

## Autenticação

Para acessar a maioria dos endpoints, é necessário um token de autenticação (Bearer Token), obtido através do endpoint de login. Este token deve ser incluído no cabeçalho `Authorization` de cada requisição.

`Authorization: Bearer <seu_token_aqui>`

---

## 🚀 Usuários e Autenticação

### 1. Cadastrar Usuário

Cria um novo usuário no sistema. Pode ser um `DOCTOR` ou `ATTENDANT`.

*   **Endpoint**: `POST /user`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Corpo da Requisição**:

    ```json
    {
      "fullName": "Nome Completo do Usuário",
      "email": "email@example.com",
      "password": "sua_senha",
      "specialty": "ESPECIALIDADE_MEDICA" // Opcional, para DOCTOR
      "role": "ATTENDANT" // ou "DOCTOR"
    }
    ```
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    {
      "id": "uuid-do-usuario",
      "fullName": "Nome Completo do Usuário",
      "email": "email@example.com",
      "role": "ATTENDANT",
      "createdAt": "2025-09-30T10:00:00.000Z",
      "updatedAt": "2025-09-30T10:00:00.000Z"
    }
    ```

### 2. Login de Usuário

Autentica um usuário e retorna um token de acesso.

*   **Endpoint**: `POST /login`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Corpo da Requisição**:

    ```json
    {
      "email": "email@example.com",
      "password": "sua_senha"
    }
    ```
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    {
      "token": "seu_token_jwt_aqui",
      "user": {
        "id": "uuid-do-usuario",
        "fullName": "Nome Completo do Usuário",
        "email": "email@example.com",
        "role": "DOCTOR"
      }
    }
    ```

### 3. Verificar Token

Verifica a validade de um token de autenticação.

*   **Endpoint**: `GET /check`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    {
      "message": "Token válido",
      "user": {
        "id": "uuid-do-usuario",
        "fullName": "Nome Completo do Usuário",
        "email": "email@example.com",
        "role": "DOCTOR"
      }
    }
    ```

### 4. Listar Todos os Usuários

Retorna uma lista de todos os usuários cadastrados no sistema.

*   **Endpoint**: `GET /usersAll`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    [
      {
        "id": "uuid-do-usuario-1",
        "fullName": "Usuário Um",
        "email": "usuario1@example.com",
        "role": "ATTENDANT"
      },
      {
        "id": "uuid-do-usuario-2",
        "fullName": "Usuário Dois",
        "email": "usuario2@example.com",
        "role": "DOCTOR"
      }
    ]
    ```

---

## 🚀 Pacientes

### 1. Listar Todos os Pacientes

Retorna uma lista de todos os pacientes. Pode ser filtrado por status de triagem.

*   **Endpoint**: `GET /patients`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Parâmetros de Query (Opcional)**:
    *   `filter=triage`: Pacientes em triagem (`level === 0`).
    *   `filter=doctor`: Pacientes para médico (`level !== 0` e `status !== 2`).
    *   `filter=attended`: Pacientes atendidos (`status === 2`).
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    [
      {
        "id": "uuid-do-paciente",
        "name": "Nome do Paciente",
        "reason": "Razão da consulta",
        "level": 1, // 0: Triagem, 1: Leve, 2: Brando, 3: Grave
        "status": 0, // 0: Aguardando, 1: Em atendimento, 2: Atendido
        "createdAt": "2025-09-30T10:00:00.000Z"
      }
    ]
    ```

### 2. Cadastrar Paciente

Cria um novo paciente no sistema.

*   **Endpoint**: `POST /patients`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Corpo da Requisição**:

    ```json
    {
      "name": "Nome do Paciente",
      "reason": "Dor de cabeça",
      "level": 0, // Nível inicial de triagem
      "status": 0 // Status inicial
    }
    ```
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    {
      "id": "uuid-do-paciente",
      "name": "Nome do Paciente",
      "reason": "Dor de cabeça",
      "level": 0,
      "status": 0,
      "createdAt": "2025-09-30T10:00:00.000Z"
    }
    ```

### 3. Atualizar Nível de Triagem do Paciente

Atualiza o nível de triagem de um paciente específico.

*   **Endpoint**: `PATCH /patients/:id`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Parâmetros de Path**:
    *   `id`: ID do paciente (UUID).
*   **Corpo da Requisição**:

    ```json
    {
      "level": 3 // Novo nível de triagem (0, 1, 2, 3)
    }
    ```
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    {
      "id": "uuid-do-paciente",
      "name": "Nome do Paciente",
      "reason": "Dor de cabeça",
      "level": 3,
      "status": 0,
      "createdAt": "2025-09-30T10:00:00.000Z",
      "updatedAt": "2025-09-30T10:05:00.000Z"
    }
    ```

### 4. Atualizar Status do Paciente

Atualiza o status de atendimento de um paciente específico.

*   **Endpoint**: `PATCH /patients/status/:id`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Parâmetros de Path**:
    *   `id`: ID do paciente (UUID).
*   **Corpo da Requisição**:

    ```json
    {
      "status": 1 // Novo status (0: Aguardando, 1: Em atendimento, 2: Atendido)
    }
    ```
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    {
      "id": "uuid-do-paciente",
      "name": "Nome do Paciente",
      "reason": "Dor de cabeça",
      "level": 3,
      "status": 1,
      "createdAt": "2025-09-30T10:00:00.000Z",
      "updatedAt": "2025-09-30T10:06:00.000Z"
    }
    ```

---

## 🚀 Consultas / Agendamentos

### 1. Criar Agendamento

Cria um novo agendamento para um paciente com um médico.

*   **Endpoint**: `POST /appointments`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Corpo da Requisição**:

    ```json
    {
      "patientId": "uuid-do-paciente",
      "doctorId": "uuid-do-medico",
      "startTime": "2025-09-10T14:00:00.000Z",
      "endTime": "2025-09-10T15:00:00.000Z",
      "status": "SCHEDULED" // ou "PENDING", "FINISHED", "CANCELED"
    }
    ```
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    {
      "id": "uuid-do-agendamento",
      "patientId": "uuid-do-paciente",
      "doctorId": "uuid-do-medico",
      "startTime": "2025-09-10T14:00:00.000Z",
      "endTime": "2025-09-10T15:00:00.000Z",
      "status": "SCHEDULED",
      "createdAt": "2025-09-30T10:00:00.000Z"
    }
    ```

### 2. Listar Todos os Agendamentos

Retorna uma lista de todos os agendamentos.

*   **Endpoint**: `GET /appointments`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    [
      {
        "id": "uuid-do-agendamento-1",
        "patientId": "uuid-do-paciente-1",
        "doctorId": "uuid-do-medico-1",
        "startTime": "2025-09-10T14:00:00.000Z",
        "endTime": "2025-09-10T15:00:00.000Z",
        "status": "SCHEDULED"
      }
    ]
    ```

### 3. Buscar Agendamento por ID do Médico

Retorna agendamentos associados a um médico específico.

*   **Endpoint**: `GET /appointments/doctor/:doctorId`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Parâmetros de Path**:
    *   `doctorId`: ID do médico (UUID).
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    [
      {
        "id": "uuid-do-agendamento",
        "patientId": "uuid-do-paciente",
        "doctorId": "uuid-do-medico",
        "startTime": "2025-09-10T14:00:00.000Z",
        "endTime": "2025-09-10T15:00:00.000Z",
        "status": "SCHEDULED"
      }
    ]
    ```

### 4. Atualizar Agendamento

Atualiza o status e/ou horário de término de um agendamento específico.

*   **Endpoint**: `PATCH /appointments/:id`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Parâmetros de Path**:
    *   `id`: ID do agendamento (UUID).
*   **Corpo da Requisição**:

    ```json
    {
      "status": "FINISHED",
      "endTime": "2025-09-10T15:30:00.000Z"
    }
    ```
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    {
      "id": "uuid-do-agendamento",
      "patientId": "uuid-do-paciente",
      "doctorId": "uuid-do-medico",
      "startTime": "2025-09-10T14:00:00.000Z",
      "endTime": "2025-09-10T15:30:00.000Z",
      "status": "FINISHED",
      "createdAt": "2025-09-30T10:00:00.000Z",
      "updatedAt": "2025-09-30T10:07:00.000Z"
    }
    ```

### 5. Deletar Agendamento

Exclui um agendamento específico.

*   **Endpoint**: `DELETE /appointments/:id`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <seu_token_aqui>`
*   **Parâmetros de Path**:
    *   `id`: ID do agendamento (UUID).
*   **Exemplo de Resposta (Sucesso)**:

    ```json
    {
      "message": "Agendamento excluído com sucesso."
    }
    ```

