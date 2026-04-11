const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Conecta API",
    version: "1.0.0",
    description: "Documentação das rotas de autenticação e IA da Conecta API.",
  },
  tags: [
    { name: "Health", description: "Verificação básica da API" },
    { name: "Auth", description: "Autenticação e cadastro de usuários" },
    { name: "AI", description: "Endpoints de contexto e chat com IA" },
  ],
  components: {
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Invalid credentials",
          },
        },
        required: ["message"],
      },
      LoginRequest: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "usuario@email.com",
          },
          password: {
            type: "string",
            example: "senha-forte",
          },
        },
        required: ["email", "password"],
      },
      LoginResponse: {
        type: "object",
        properties: {
          accessToken: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
        required: ["accessToken"],
      },
      RegisterRequest: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "usuario@email.com",
          },
          password: {
            type: "string",
            example: "senha-forte",
          },
          name: {
            type: "string",
            example: "Usuário Exemplo",
          },
        },
        required: ["email", "password"],
      },
      RegisterResponse: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "7b9237cf-d8b9-40f2-9f42-c7eb4a40d54a",
          },
          email: {
            type: "string",
            format: "email",
            example: "usuario@email.com",
          },
          name: {
            type: "string",
            nullable: true,
            example: "Usuário Exemplo",
          },
        },
        required: ["id", "email"],
      },
      ProfileInput: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            example: "u-1",
          },
          name: {
            type: "string",
            example: "Ana",
          },
          city: {
            type: "string",
            example: "São Paulo",
          },
          remote: {
            type: "boolean",
            example: true,
          },
          rating: {
            type: "number",
            example: 4.8,
          },
          skills: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["React", "Node.js"],
          },
          services: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["Mentoria", "Code review"],
          },
          availability: {
            type: "string",
            example: "manhã",
          },
        },
        required: ["userId", "name"],
      },
      ProfileContextRequest: {
        type: "object",
        properties: {
          profiles: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ProfileInput",
            },
          },
        },
        required: ["profiles"],
      },
      ProfileContextResponse: {
        type: "object",
        properties: {
          context: {
            type: "string",
            example:
              "Contexto recuperado:\n1) [u-1] Ana - habilidades: React; serviços oferecidos: Mentoria; cidade: São Paulo; remoto: sim; avaliação: 4.8; disponibilidade: manhã",
          },
        },
        required: ["context"],
      },
      ProfileChatRequest: {
        type: "object",
        properties: {
          question: {
            type: "string",
            example: "Quem pode me ajudar com backend em Node?",
          },
          profiles: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ProfileInput",
            },
          },
        },
        required: ["question", "profiles"],
      },
      ProfileChatResponse: {
        type: "object",
        properties: {
          text: {
            type: "string",
            example: "Recomendações geradas pela IA",
          },
          context: {
            type: "string",
          },
        },
        required: ["text", "context"],
      },
      RootResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Hello, World!",
          },
        },
        required: ["message"],
      },
    },
  },
  paths: {
    "/": {
      get: {
        tags: ["Health"],
        summary: "Health check da API",
        responses: {
          200: {
            description: "API respondendo",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RootResponse",
                },
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Autentica usuário e retorna token JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          401: {
            description: "Credenciais inválidas",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          500: {
            description: "Erro interno",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Cria um novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuário criado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterResponse",
                },
              },
            },
          },
          409: {
            description: "Usuário já existe",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          500: {
            description: "Erro interno",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/ai/profile-context": {
      post: {
        tags: ["AI"],
        summary: "Monta contexto textual a partir de perfis",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProfileContextRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Contexto gerado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProfileContextResponse",
                },
              },
            },
          },
          400: {
            description: "Payload inválido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/ai/profile-chat": {
      post: {
        tags: ["AI"],
        summary: "Gera resposta de recomendação com IA usando os perfis",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProfileChatRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Resposta da IA",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProfileChatResponse",
                },
              },
            },
          },
          400: {
            description: "Payload inválido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          500: {
            description: "Falha na geração da resposta",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
  },
};

export { swaggerDocument };
