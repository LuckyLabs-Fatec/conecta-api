# Configurações Avançadas (Opcional)

Este documento contém configurações avançadas e opcionais para SonarCloud/SonarQube.

## 1. Qualidade de Porta (Quality Gate)

Para criar uma Quality Gate customizada, adicione ao `sonar-project.properties`:

```properties
# Quality Gate automático
sonar.qualitygate.wait=true

# Isso fará o scanner aguardar o resultado da análise
# e falhará se a qualidade não atingir a porta
```

## 2. Exclusões Avançadas

```properties
# Excluir testes do TypeScript específicos
sonar.test.exclusions=**/*.test.ts,**/*.spec.ts,test/**

# Excluir diretórios inteiros
sonar.exclusions=node_modules/**,dist/**,coverage/**,.next/**

# Incluir apenas código fonte TypeScript
sonar.sources=src
sonar.tests=src
```

## 3. Análise de Segurança

```properties
# Habilitar análise de segurança (requer scanner SonarQube)
sonar.security.enabled=true

# Regras de segurança customizadas
sonar.security.rules=*.SECURITY,*.OWASP
```

## 4. Análise de Cobertura de Testes

```properties
# Caminhos de relatórios de cobertura
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Múltiplos caminhos (se houver)
sonar.javascript.lcov.reportPaths=coverage/lcov.info,other-coverage/lcov.info

# Cobertura mínima
sonar.coverage.exclusions=src/main/index.ts,src/main/docs/**
```

## 5. Complexidade

```properties
# Definir limiares de complexidade
sonar.java.checkstyle.reportPath=dist/checkstyle-result.xml

# Complexidade ciclomática máxima
sonar.core.max_ccn=15
```

## 6. Prefixo de Projeto

```properties
# Usar prefixo para múltiplos projetos
sonar.projectKey=org-tempo-justo-api
sonar.projectName=Tempo Justo - API

# Branch specific
sonar.projectVersion=1.0.0-branch-develop
```

## 7. Integração com GitHub

### Verificar automaticamente Pull Requests:

```yaml
# .github/workflows/sonarcloud.yml
name: SonarCloud with PR decoration

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    steps:
      # ... steps anteriores ...
      
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        with:
          args: >
            -Dsonar.projectBaseDir=.
            -Dsonar.sources=src
            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

## 8. Branches e Pull Requests

```properties
# Configurar análise de branches
sonar.branch.name=develop
sonar.branch.target=main

# Para pull requests
sonar.pullrequest.key=123
sonar.pullrequest.branch=feature/new-feature
sonar.pullrequest.base=main
```

## 9. Ignorar Falsos Positivos

Crie um arquivo `.sonarignore` na raiz:

```
# Ignorar padrões específicos
**/vendor/**
**/node_modules/**
**/dist/**

# Ignorar arquivos gerados
**/*-generated.ts
**/generated/**
```

## 10. Métricas Customizadas

```properties
# Usar variáveis de ambiente para configurações sensíveis
sonar.host.url=${SONAR_HOST_URL:https://sonarcloud.io}
sonar.login=${SONAR_TOKEN}
sonar.sourceEncoding=UTF-8
```

## 11. Dockerfile para Análise

Se quiser análise em contêiner:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g sonar-scanner

RUN npm install && \
    npm run build && \
    npm run test:coverage

CMD ["sonar-scanner", \
     "-Dsonar.projectKey=tempo-justo-api", \
     "-Dsonar.sources=src", \
     "-Dsonar.host.url=${SONAR_HOST_URL:-https://sonarcloud.io}"]
```

## 12. Excluir Padrões Específicos do TypeScript

```properties
# Excluir tipos apenas
sonar.exclusions=src/**/*.d.ts

# Excluir testes e mocks
sonar.test.exclusions=src/**/*.spec.ts,src/**/*.test.ts,src/test/**

# Excluir exemplo de fixtures
sonar.exclusions=src/**/__fixtures__/**,src/**/__mocks__/**
```

## 13. Community Edition vs Enterprise

| Recurso | Community | Enterprise |
|---------|-----------|-----------|
| Análise Base | ✅ | ✅ |
| Pull Request Comments | ✅ | ✅ |
| Branch Analysis | ❌ | ✅ |
| Application Security | ❌ | ✅ |
| LDAP/SAML | ❌ | ✅ |
| SLA | ❌ | ✅ |

## 14. Ferramentas Complementares

Considere também:
- **ESLint** (já configurado)
- **Prettier** (formatação)
- **TypeScript strict mode** (já ativado)
- **Husky + Lint-staged** (já configurado)

## 15. Scripts Úteis Adicionais

Adicione ao `package.json`:

```json
{
  "scripts": {
    "sonar": "sonar-scanner",
    "sonar:local": "sonar-scanner -Dsonar.login=admin -Dsonar.host.url=http://localhost:9000",
    "sonar:token-generate": "openssl rand -base64 32",
    "quality-check": "pnpm lint && pnpm test:coverage && pnpm sonar"
  }
}
```

## 16. Integração com CI/CD Outras Plataformas

### GitLab CI

```yaml
sonarcloud:
  stage: test
  image: node:20-alpine
  script:
    - npm install
    - npm run build
    - npm run test:coverage
    - npm install -g sonar-scanner
    - sonar-scanner
  environment:
    name: sonarcloud
  only:
    - main
    - merge_requests
```

### Jenkins

```groovy
stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('SonarCloud') {
            sh '''
                npm install
                npm run build
                npm run test:coverage
                sonar-scanner
            '''
        }
    }
}
```

## Recursos Adicionais

- [SonarCloud Analysis Parameters](https://docs.sonarcloud.io/advanced-setup/analysis-scope/)
- [Quality Gates](https://docs.sonarcloud.io/quality-gates/quality-gates/)
- [Branch Analysis](https://docs.sonarcloud.io/branches-and-pull-requests/overview/)
