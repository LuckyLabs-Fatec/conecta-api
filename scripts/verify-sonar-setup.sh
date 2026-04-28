#!/bin/bash
# Guia de Verificação da Implementação SonarCloud/SonarQube

echo "🔍 Verificando implementação do SonarQube/SonarCloud..."
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar arquivos criados
echo -e "${YELLOW}📋 Arquivos de Configuração:${NC}"
files=(
    "sonar-project.properties"
    ".sonarcloud.properties"
    ".github/workflows/sonarcloud.yml"
    "docker-compose.sonar.yml"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "✗ $file (não encontrado)"
    fi
done

echo ""
echo -e "${YELLOW}📚 Documentação:${NC}"
docs=(
    "SONAR_SETUP.md"
    "SONAR_QUICKSTART.md"
    "SONAR_ADVANCED.md"
    "SONAR_BADGES.md"
    "IMPLEMENTATION_SUMMARY.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC} $doc"
    else
        echo -e "✗ $doc (não encontrado)"
    fi
done

echo ""
echo -e "${YELLOW}🔧 Scripts:${NC}"
scripts=(
    "scripts/sonar-analyze.sh"
    "scripts/sonar-local.sh"
)

for script in "${scripts[@]}"; do
    if [ -f "$script" ]; then
        echo -e "${GREEN}✓${NC} $script"
    else
        echo -e "✗ $script (não encontrado)"
    fi
done

echo ""
echo -e "${YELLOW}📦 Package.json:${NC}"
if grep -q '"sonar": "sonar-scanner"' package.json; then
    echo -e "${GREEN}✓${NC} Script 'sonar' adicionado"
else
    echo -e "✗ Script 'sonar' não encontrado"
fi

if grep -q '"sonar-scanner"' package.json; then
    echo -e "${GREEN}✓${NC} Dependência 'sonar-scanner' adicionada"
else
    echo -e "✗ Dependência 'sonar-scanner' não encontrada"
fi

echo ""
echo -e "${YELLOW}🔒 .gitignore:${NC}"
if grep -q "\.sonarqube" .gitignore; then
    echo -e "${GREEN}✓${NC} Diretório .sonarqube adicionado ao .gitignore"
else
    echo -e "✗ .sonarqube não está no .gitignore"
fi

echo ""
echo -e "${YELLOW}🌍 .env.example:${NC}"
if grep -q "SONAR_TOKEN" .env.example; then
    echo -e "${GREEN}✓${NC} SONAR_TOKEN adicionado a .env.example"
else
    echo -e "✗ SONAR_TOKEN não encontrado em .env.example"
fi

echo ""
echo -e "${GREEN}✨ Verificação concluída!${NC}"
echo ""
echo "📖 Próximos passos:"
echo "1. Leia: SONAR_QUICKSTART.md"
echo "2. Configure SONAR_TOKEN em GitHub Secrets"
echo "3. Atualize .sonarcloud.properties com sua organização"
echo "4. Faça um push para ativar o CI/CD"
