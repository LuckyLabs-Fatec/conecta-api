#!/bin/bash

# Script para configurar e executar análise SonarCloud localmente
# Uso: ./scripts/sonar-analyze.sh

set -e

echo "🔍 Iniciando análise SonarCloud..."

# Verificar se SONAR_TOKEN está definido
if [ -z "$SONAR_TOKEN" ]; then
    echo "❌ Erro: SONAR_TOKEN não está definido"
    echo "Por favor, exporte seu token:"
    echo "  export SONAR_TOKEN=seu-token-aqui"
    exit 1
fi

echo "📦 Instalando dependências..."
pnpm install

echo "🔨 Compilando projeto..."
pnpm build

echo "✅ Executando testes com cobertura..."
pnpm test:coverage

echo "📊 Enviando análise para SonarCloud..."
SONAR_HOST_URL=https://sonarcloud.io pnpm run sonar

echo "✨ Análise concluída com sucesso!"
echo "📈 Visualize os resultados em: https://sonarcloud.io/projects/seu-organization/tempo-justo-api"
