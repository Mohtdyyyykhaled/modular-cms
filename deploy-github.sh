#!/bin/bash

# Script per deploy su GitHub
# Uso: ./deploy-github.sh <nome-repository>

if [ -z "$1" ]; then
    echo "❌ Errore: Specifica il nome del repository GitHub"
    echo "Uso: ./deploy-github.sh <nome-repository>"
    echo "Esempio: ./deploy-github.sh modular-cms"
    exit 1
fi

REPO_NAME=$1
GITHUB_USER=$(git config user.name 2>/dev/null || echo "your-username")

echo "🚀 Preparazione deploy su GitHub..."
echo ""

# Verifica che git sia inizializzato
if [ ! -d ".git" ]; then
    echo "❌ Errore: Repository Git non inizializzato"
    exit 1
fi

# Verifica che ci sia almeno un commit
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    echo "❌ Errore: Nessun commit trovato"
    exit 1
fi

echo "✅ Repository Git configurato"
echo ""

# Istruzioni per creare il repository su GitHub
echo "📋 ISTRUZIONI PER COMPLETARE IL DEPLOY:"
echo ""
echo "1. Crea un nuovo repository su GitHub:"
echo "   - Vai su https://github.com/new"
echo "   - Nome repository: $REPO_NAME"
echo "   - Scegli se renderlo pubblico o privato"
echo "   - NON inizializzare con README, .gitignore o licenza"
echo ""
echo "2. Dopo aver creato il repository, esegui questi comandi:"
echo ""
echo "   git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Oppure se preferisci SSH:"
echo ""
echo "   git remote add origin git@github.com:$GITHUB_USER/$REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Verifica il deploy:"
echo "   Visita: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""

# Chiedi se vuoi procedere automaticamente
read -p "Vuoi che aggiunga il remote automaticamente? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Aggiungendo remote..."
    git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git 2>/dev/null || {
        echo "⚠️  Remote 'origin' già esistente. Vuoi sovrascriverlo? (y/n)"
        read -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git remote set-url origin https://github.com/$GITHUB_USER/$REPO_NAME.git
        fi
    }
    
    echo "✅ Remote aggiunto"
    echo ""
    echo "Ora puoi fare push con:"
    echo "   git push -u origin main"
    echo ""
    read -p "Vuoi fare push ora? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push -u origin main
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 Deploy completato con successo!"
            echo "📦 Repository: https://github.com/$GITHUB_USER/$REPO_NAME"
        else
            echo ""
            echo "❌ Errore durante il push. Verifica:"
            echo "   - Che il repository esista su GitHub"
            echo "   - Le tue credenziali GitHub"
            echo "   - La connessione internet"
        fi
    fi
fi

