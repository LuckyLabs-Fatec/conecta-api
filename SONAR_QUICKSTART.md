# 🚀 Guia Rápido: SonarCloud/SonarQube

## ⚡ Opção 1: SonarCloud (Recomendado)

### 1️⃣ Setup no SonarCloud
```bash
# 1. Acesse https://sonarcloud.io
# 2. Faça login com GitHub
# 3. Autorize e crie um projeto
# 4. Copie o SONAR_TOKEN
```

### 2️⃣ Configurar GitHub Secrets
```bash
# GitHub > Settings > Secrets and variables > Actions
# Novo secret:
# - Nome: SONAR_TOKEN
# - Valor: [seu token do SonarCloud]
```

### 3️⃣ Atualizar configuração
Edite `.sonarcloud.properties`:
```properties
sonar.organization=seu-usuario-ou-org
sonar.projectKey=tempo-justo-api
```

### ✅ Pronto!
O workflow CI/CD rodará automaticamente em cada push ou pull request.

---

## 🖥️ Opção 2: SonarQube Local

### 1️⃣ Iniciar SonarQube com Docker Compose
```bash
docker-compose -f docker-compose.sonar.yml up -d
```

O SonarQube estará disponível em: http://localhost:9000
- Login padrão: `admin` / `admin`

### 2️⃣ Executar análise
```bash
# Definir token (use 'admin' para teste)
export SONAR_TOKEN=admin

# Executar script
chmod +x scripts/sonar-local.sh
./scripts/sonar-local.sh
```

### 3️⃣ Visualizar resultados
Abra http://localhost:9000 no navegador

### ⛔ Parar SonarQube
```bash
docker-compose -f docker-compose.sonar.yml down
```

---

## 📊 Análise Manual

```bash
# 1. Instalar dependências
pnpm install

# 2. Compilar código
pnpm build

# 3. Gerar cobertura de testes
pnpm test:coverage

# 4. Executar SonarCloud
export SONAR_TOKEN=seu-token
pnpm run sonar
```

---

## 📝 Arquivos Criados

| Arquivo | Propósito |
|---------|-----------|
| `sonar-project.properties` | Configuração principal |
| `.sonarcloud.properties` | Configurações SonarCloud |
| `.github/workflows/sonarcloud.yml` | CI/CD automático |
| `docker-compose.sonar.yml` | SonarQube local com Docker |
| `scripts/sonar-analyze.sh` | Script análise SonarCloud |
| `scripts/sonar-local.sh` | Script análise SonarQube local |
| `SONAR_SETUP.md` | Documentação completa |

---

## ❓ Troubleshooting

### "SONAR_TOKEN não definido"
```bash
export SONAR_TOKEN=seu-token
```

### "SonarQube não acessível"
```bash
docker-compose -f docker-compose.sonar.yml up -d
```

### "Cobertura não aparece"
Verifique se `coverage/lcov.info` foi gerado:
```bash
pnpm test:coverage
ls -la coverage/lcov.info
```

---

## 🔗 Links Úteis

- [SonarCloud](https://sonarcloud.io)
- [SonarQube](https://www.sonarqube.org)
- [Documentação](SONAR_SETUP.md)
