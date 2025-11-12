# 🚂 Deploy Backend su Railway - Guida Rapida

## ⚡ Setup Veloce (5 minuti)

### 1. Crea Account Railway

1. Vai su [railway.app](https://railway.app)
2. Clicca **"Start a New Project"**
3. **"Login with GitHub"** e autorizza Railway

### 2. Deploy Backend

1. **"New Project"** → **"Deploy from GitHub repo"**
2. Seleziona il repository: **`thedragon689/modular-cms`**
3. Railway inizierà il deploy automaticamente

### 3. Configura il Servizio

1. Clicca sul servizio appena creato
2. Vai su **Settings** → **Source**
3. Configura:
   - **Root Directory**: `backend`
   - **Build Command**: (lascia vuoto, Railway lo rileva automaticamente)
   - **Start Command**: `npm start`

### 4. Aggiungi PostgreSQL

1. Nel progetto Railway, clicca **"+ New"**
2. Seleziona **"Database"** → **"Add PostgreSQL"**
3. Railway creerà automaticamente il database

### 5. Collega Database al Backend

1. Vai al servizio backend
2. Clicca su **"Variables"** tab
3. Clicca **"Add Reference"**
4. Seleziona il database PostgreSQL
5. Railway aggiungerà automaticamente:
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

### 6. Configura Variabili d'Ambiente

Nella tab **Variables**, aggiungi manualmente:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_NAME=${{Postgres.PGDATABASE}}
CORS_ORIGIN=https://modular-cms-woad.vercel.app
```

**Nota**: Le variabili `${{Postgres.*}}` sono riferimenti automatici al database.

### 7. Ottieni l'URL del Backend

1. Vai su **Settings** → **Networking**
2. Clicca **"Generate Domain"**
3. **Copia l'URL** (es: `https://modular-cms-production.up.railway.app`)

### 8. Configura Vercel

1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona progetto **`modular-cms`**
3. **Settings** → **Environment Variables**
4. Aggiungi:
   - **Key**: `VITE_API_URL`
   - **Value**: L'URL copiato da Railway (es: `https://modular-cms-production.up.railway.app`)
   - **Environment**: Seleziona Production, Preview, Development
5. **Save**
6. **Redeploy** il frontend

## ✅ Verifica

1. **Testa il backend**:
   ```bash
   curl https://your-railway-url.up.railway.app/api/dashboard/stats
   ```

2. **Testa il frontend**: Vai su Vercel e prova a fare login

## 💰 Costi Railway

- **Free Tier**: $5 crediti gratuiti al mese
- **Hobby Plan**: $5/mese per progetti personali
- PostgreSQL incluso nel piano

## 🔧 Troubleshooting

### Backend non si avvia?
- Controlla i **Logs** su Railway
- Verifica che tutte le variabili d'ambiente siano configurate
- Assicurati che `Root Directory` sia impostato su `backend`

### Database connection error?
- Verifica che il database sia stato creato
- Controlla che le variabili `${{Postgres.*}}` siano presenti
- Assicurati che il database sia nello stesso progetto del backend

### CORS error?
- Verifica che `CORS_ORIGIN` sia impostato all'URL Vercel:
  ```
  CORS_ORIGIN=https://modular-cms-woad.vercel.app
  ```

---

**Tempo stimato**: 5-10 minuti  
**Difficoltà**: Facile ⭐

