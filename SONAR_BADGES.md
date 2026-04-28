# Badges para README.md

Adicione os badges abaixo ao seu README.md para exibir o status de qualidade:

## SonarCloud Badge

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=seu-projeto-key&metric=alert_status)](https://sonarcloud.io/dashboard?id=seu-projeto-key)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=seu-projeto-key&metric=coverage)](https://sonarcloud.io/dashboard?id=seu-projeto-key)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=seu-projeto-key&metric=code_smells)](https://sonarcloud.io/dashboard?id=seu-projeto-key)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=seu-projeto-key&metric=bugs)](https://sonarcloud.io/dashboard?id=seu-projeto-key)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=seu-projeto-key&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=seu-projeto-key)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=seu-projeto-key&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=seu-projeto-key)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=seu-projeto-key&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=seu-projeto-key)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=seu-projeto-key&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=seu-projeto-key)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=seu-projeto-key&metric=security_rating)](https://sonarcloud.io/dashboard?id=seu-projeto-key)
```

## Substituir `seu-projeto-key`

1. Acesse SonarCloud
2. Vá para seu projeto
3. Copie o `projectKey` da URL
4. Substitua em todos os badges acima

## Exemplo com projeto real:

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tempo-justo-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=tempo-justo-api)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=tempo-justo-api&metric=coverage)](https://sonarcloud.io/dashboard?id=tempo-justo-api)
```

## Outras Métricas Disponíveis:

- `alert_status` - Status da Quality Gate
- `coverage` - Cobertura de testes
- `code_smells` - Quantidade de code smells
- `bugs` - Quantidade de bugs
- `vulnerabilities` - Vulnerabilidades encontradas
- `duplicated_lines_density` - Percentual de duplicação
- `sqale_rating` - Nota de manutenibilidade (A-E)
- `reliability_rating` - Nota de confiabilidade (A-E)
- `security_rating` - Nota de segurança (A-E)
- `technical_debt_ratio` - Razão de débito técnico

## Inserir no README.md

Adicione os badges no topo ou em uma seção "Status do Projeto":

```markdown
# Tempo Justo API

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tempo-justo-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=tempo-justo-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=tempo-justo-api&metric=coverage)](https://sonarcloud.io/dashboard?id=tempo-justo-api)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=tempo-justo-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=tempo-justo-api)

...resto do README...
```
