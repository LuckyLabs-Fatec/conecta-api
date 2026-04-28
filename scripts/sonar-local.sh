#!/bin/bash

# Script para analisar código com SonarQube local
# Pré-requisito: Docker instalado e SonarQube rodando em localhost:9000
# Uso: ./scripts/sonar-local.sh

set -e

SONAR_URL="http://localhost:9000"
SONAR_TOKEN="${SONAR_TOKEN:-admin}"

echo "🔍 Análise com SonarQube Local"
echo "🌐 URL: $SONAR_URL"

# Verificar se SonarQube está rodando
if ! curl -s "$SONAR_URL" > /dev/null; then
    echo "❌ Erro: SonarQube não está acessível em $SONAR_URL"
    echo "📝 Inicie o SonarQube com:"
    echo "  docker run -d --name sonarqube -p 9000:9000 sonarqube:latest"
    exit 1
fi

echo "📦 Instalando dependências..."
pnpm install

echo "🔨 Compilando projeto..."
pnpm build

echo "✅ Executando testes com cobertura..."
pnpm test:coverage

echo "📊 Enviando análise para SonarQube..."
npx sonar-scanner \
  -Dsonar.projectKey=tempo-justo-api \
  -Dsonar.sources=src \
  -Dsonar.host.url=$SONAR_URL \
  -Dsonar.login=$SONAR_TOKEN \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info

echo "✨ Análise concluída com sucesso!"
echo "📈 Visualize os resultados em: $SONAR_URL"
