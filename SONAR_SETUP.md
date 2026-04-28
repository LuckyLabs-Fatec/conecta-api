# Guia de Implementação SonarQube/SonarCloud

Este projeto foi configurado para usar SonarCloud para análise de qualidade de código.

## Opções de Uso

### 1. **SonarCloud (Recomendado para repositórios públicos no GitHub)**

#### Setup Inicial:
1. Acesse [sonarcloud.io](https://sonarcloud.io)
2. Faça login com sua conta GitHub
3. Autorize o SonarCloud a acessar seus repositórios
4. Crie um novo projeto ou configure um existente
5. Copie seu `SONAR_TOKEN`

#### Configurar no GitHub:
1. Vá para **Settings > Secrets and variables > Actions**
2. Clique em **New repository secret**
3. Nome: `SONAR_TOKEN`
4. Valor: Cole seu token do SonarCloud
5. Clique em **Add secret**

#### Atualizar configuração:
No arquivo `.sonarcloud.properties`:
```properties
sonar.organization=seu-usuario-ou-organizacao
sonar.projectKey=tempo-justo-api
```

#### CI/CD Automático:
O workflow em `.github/workflows/sonarcloud.yml` executará automaticamente:
- A cada push para `main` ou `develop`
- A cada Pull Request para `main` ou `develop`

### 2. **SonarQube Local (Para análise em máquina local)**

#### Instalação do SonarQube:
```bash
# Docker (mais fácil)
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest

# Ou instalar localmente em sonarqube.org
```

#### Executar análise local:
```bash
# Instalar dependências
pnpm install

# Compilar o projeto
pnpm build

# Gerar cobertura de testes
pnpm test:coverage

# Executar SonarScanner
SONAR_TOKEN=seu-token pnpm run sonar:local
```

#### Acessar resultados:
- Abra `http://localhost:9000`
- Login com padrão: admin/admin

### 3. **Análise sem CI/CD**

```bash
# Instalar dependências
pnpm install

# Compilar
pnpm build

# Testes com cobertura
pnpm test:coverage

# Análise com SonarCloud (requer SONAR_TOKEN)
SONAR_TOKEN=seu-token SONAR_HOST_URL=https://sonarcloud.io pnpm run sonar
```

## Configurações Disponíveis

### Scripts npm:
- `pnpm run sonar` - Análise com SonarCloud
- `pnpm run sonar:local` - Análise com SonarQube local

### Arquivos de configuração criados:
- `sonar-project.properties` - Configuração principal do SonarQube/SonarCloud
- `.sonarcloud.properties` - Configurações específicas do SonarCloud
- `.github/workflows/sonarcloud.yml` - Pipeline CI/CD automático

## Métricas Coletadas

O SonarCloud analisa:
- **Qualidade de Código**: Bugs, vulnerabilidades, code smells
- **Cobertura de Testes**: A partir do LCOV report gerado pelo Vitest
- **Duplicação de Código**: Detecção de código duplicado
- **Complexidade**: Complexidade ciclomática e cognitiva
- **Segurança**: Vulnerabilidades conhecidas

## Obter Token SonarCloud

1. Acesse sua conta em [sonarcloud.io](https://sonarcloud.io)
2. Vá para **My Account > Security**
3. Gere um novo token
4. Copie o token e armazene com segurança

## Troubleshooting

### Erro: "SONAR_TOKEN não definido"
Certifique-se de que:
1. O token está armazenado em GitHub Secrets
2. O workflow tem acesso ao secret

### Cobertura de testes não aparecer
1. Verifique se `pnpm test:coverage` gera `coverage/lcov.info`
2. Confirme o caminho em `sonar-project.properties`

### Projeto não aparece no SonarCloud
1. Verifique o `sonar.projectKey` em `.sonarcloud.properties`
2. Certifique-se de que a organização está correta

## Recursos Adicionais

- [Documentação SonarCloud](https://docs.sonarcloud.io/)
- [Documentação SonarQube](https://docs.sonarqube.org/)
- [GitHub Action do SonarCloud](https://github.com/SonarSource/sonarcloud-github-action)
