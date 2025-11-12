# 🚀 Guida al Deploy su GitHub

## ✅ Stato Attuale

Il repository Git è stato inizializzato e il commit iniziale è stato creato con successo.

## 📋 Passi per Completare il Deploy

### Opzione 1: Usando lo Script Automatico

1. **Esegui lo script di deploy:**
   ```bash
   ./deploy-github.sh modular-cms
   ```
   (Sostituisci `modular-cms` con il nome che vuoi dare al repository)

2. **Segui le istruzioni** che appariranno a schermo.

### Opzione 2: Deploy Manuale

#### Passo 1: Crea il Repository su GitHub

1. Vai su [GitHub](https://github.com/new)
2. Compila i campi:
   - **Repository name**: `modular-cms` (o il nome che preferisci)
   - **Description**: "Modular CMS with glassmorphism UI and advanced features"
   - **Visibility**: Scegli se renderlo pubblico o privato
   - ⚠️ **NON** selezionare "Add a README file", "Add .gitignore", o "Choose a license" (già presenti nel progetto)
3. Clicca su **"Create repository"**

#### Passo 2: Collega il Repository Locale a GitHub

Esegui questi comandi nel terminale (sostituisci `TUO_USERNAME` e `NOME_REPO`):

**Se usi HTTPS:**
```bash
git remote add origin https://github.com/TUO_USERNAME/NOME_REPO.git
git branch -M main
git push -u origin main
```

**Se usi SSH:**
```bash
git remote add origin git@github.com:TUO_USERNAME/NOME_REPO.git
git branch -M main
git push -u origin main
```

#### Passo 3: Verifica

Visita il tuo repository su GitHub:
```
https://github.com/TUO_USERNAME/NOME_REPO
```

## 🔐 Autenticazione GitHub

Se è la prima volta che fai push, GitHub potrebbe richiedere l'autenticazione:

### HTTPS
- **Token Personale**: Vai su GitHub Settings → Developer settings → Personal access tokens → Generate new token
- Oppure usa GitHub CLI per autenticarti

### SSH
- Assicurati di avere una chiave SSH configurata su GitHub
- Verifica con: `ssh -T git@github.com`

## 📝 Note Importanti

✅ **File già esclusi dal repository:**
- `.env` e file di configurazione sensibili
- `node_modules/`
- `uploads/`
- File di log e temporanei

✅ **Branch principale:** `main`

✅ **Commit iniziale:** Completato con tutti i file del progetto

## 🚀 Deploy su Vercel

Il progetto è configurato per il deploy automatico su Vercel.

### Configurazione Automatica

Il progetto include:
- ✅ `vercel.json` - Configurazione Vercel
- ✅ `.vercelignore` - File esclusi dal deploy
- ✅ Script `vercel-build` nel package.json

### Passi per Deploy

1. **Installa Vercel CLI** (opzionale):
   ```bash
   npm i -g vercel
   ```

2. **Deploy da GitHub** (consigliato):
   - Vai su [Vercel](https://vercel.com)
   - Connetti il tuo account GitHub
   - Importa il repository `thedragon689/modular-cms`
   - Vercel rileverà automaticamente la configurazione da `vercel.json`
   - Clicca "Deploy"

3. **Deploy da CLI**:
   ```bash
   vercel
   ```

### Configurazione Vercel

Il file `vercel.json` è già configurato con:
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `frontend/dist`
- **Install Command**: Installa dipendenze root e frontend
- **Framework**: Vite
- **Rewrites**: SPA routing configurato

### Variabili d'Ambiente

Se necessario, aggiungi variabili d'ambiente su Vercel:
- Dashboard Vercel → Project → Settings → Environment Variables

### Risoluzione Problemi Vercel

#### Errore: "vite: command not found"
✅ **Risolto**: Il `vercel.json` ora installa le dipendenze nella cartella `frontend` prima del build.

#### Build Fallisce
- Verifica che tutte le dipendenze siano nel `package.json` del frontend
- Controlla i log di build su Vercel per dettagli

## 🎯 Prossimi Passi Dopo il Deploy

1. **Configura GitHub Actions** (opzionale) per CI/CD
2. **Aggiungi GitHub Pages** se vuoi hostare la documentazione
3. **Configura branch protection** per il branch `main`
4. **Aggiungi collaboratori** se necessario
5. **Deploy su Vercel** per il frontend

## 🆘 Risoluzione Problemi

### Errore: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TUO_USERNAME/NOME_REPO.git
```

### Errore: "Authentication failed"
- Verifica le tue credenziali GitHub
- Usa un Personal Access Token invece della password
- Configura SSH se preferisci

### Errore: "Permission denied"
- Verifica di avere i permessi sul repository
- Controlla che il repository esista su GitHub

---

**Buon deploy! 🚀**

