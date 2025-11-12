# 🚀 Deploy Backend su Vercel - Guida Completa

Il backend è ora configurato per funzionare su Vercel come Serverless Functions!

## ✅ Cosa è stato configurato

1. **`api/index.js`** - Wrapper serverless per Express
2. **`vercel.json`** - Configurazione per frontend + backend
3. **`backend/server.js`** - Adattato per ambiente serverless
4. **Frontend** - Configurato per usare `/api` (stesso dominio)

## 🗄️ Database - Configurazione Necessaria

Vercel non fornisce database, devi usare un servizio esterno. Opzioni consigliate:

### Opzione 1: Neon (Consigliato) ⭐

**Neon** è PostgreSQL serverless, perfetto per Vercel.

1. **Crea account su [Neon](https://neon.tech)**
2. **Crea nuovo progetto**
3. **Copia la connection string** (es: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname`)
4. **Configura su Vercel**:
   - Vai su **Vercel Dashboard** → Il tuo progetto
   - **Settings** → **Environment Variables**
   - Aggiungi:

   ```
   DB_HOST=ep-xxx.region.aws.neon.tech
   DB_PORT=5432
   DB_USER=your-user
   DB_PASSWORD=your-password
   DB_NAME=neondb
   ```

   Oppure usa la connection string completa:
   ```
   DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname
   ```

### Opzione 2: Supabase

1. **Crea account su [Supabase](https://supabase.com)**
2. **Crea nuovo progetto**
3. **Settings** → **Database** → Copia connection string
4. **Configura su Vercel** come sopra

### Opzione 3: Railway PostgreSQL

1. **Crea database su [Railway](https://railway.app)**
2. **Copia le credenziali**
3. **Configura su Vercel**

### Opzione 4: Render PostgreSQL

1. **Crea database su [Render](https://render.com)**
2. **Copia le credenziali**
3. **Configura su Vercel**

## ⚙️ Variabili d'Ambiente Vercel

Configura queste variabili su **Vercel Dashboard** → **Settings** → **Environment Variables**:

### Variabili Richieste

```
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
CORS_ORIGIN=https://modular-cms-woad.vercel.app
```

**Oppure** se il tuo database fornisce una connection string:

```
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

### Configurazione per Ambiente

- **Production**: Tutte le variabili
- **Preview**: Tutte le variabili (per test)
- **Development**: (opzionale, per sviluppo locale)

## 🚀 Deploy

### Primo Deploy

1. **Push su GitHub**:
   ```bash
   git add .
   git commit -m "feat: configure backend for Vercel serverless"
   git push
   ```

2. **Vercel deployerà automaticamente** (se hai connesso GitHub)

3. **Oppure deploy manuale**:
   ```bash
   VERCEL_TOKEN=your-token npx vercel --prod
   ```

### Dopo il Deploy

1. **Verifica le API**:
   ```bash
   curl https://modular-cms-woad.vercel.app/api/health
   ```

2. **Testa il login** sul frontend

## 🔧 Modifiche al Codice

### Database Connection

Il codice è già configurato per:
- ✅ Funzionare in ambiente serverless
- ✅ Inizializzare il database al primo request
- ✅ Usare connection pooling

### File Upload

⚠️ **Nota**: I file upload su Vercel serverless hanno limitazioni:
- File temporanei (max 4.5MB per funzione)
- Non persistono tra invocazioni
- Considera di usare **Vercel Blob Storage** o **AWS S3** per file persistenti

## 📝 Struttura

```
CMS/
├── api/
│   └── index.js          # Serverless function wrapper
├── backend/
│   ├── server.js         # Express app (adattato per serverless)
│   ├── routes/           # API routes
│   └── config/           # Database config
├── frontend/
│   └── dist/             # Build frontend
└── vercel.json           # Configurazione Vercel
```

## 🧪 Test Locale

Per testare localmente con Vercel:

```bash
npm install -g vercel
vercel dev
```

Questo avvierà sia frontend che backend localmente.

## ⚠️ Limitazioni Vercel Serverless

1. **Cold Start**: Prima invocazione può essere lenta (~1-2s)
2. **Timeout**: Max 10s per Hobby, 60s per Pro
3. **Memory**: Max 1024MB
4. **File System**: Solo `/tmp` è scrivibile

## 🔒 Sicurezza

- ✅ JWT secret deve essere forte e unico
- ✅ Database deve essere accessibile solo da Vercel IPs (se possibile)
- ✅ CORS configurato correttamente
- ✅ Helmet per sicurezza headers

## 🆘 Troubleshooting

### Errore: "Database initialization failed"
- Verifica le variabili d'ambiente del database
- Controlla che il database sia accessibile pubblicamente
- Verifica firewall/whitelist del database

### Errore: "Module not found"
- Verifica che `installCommand` in `vercel.json` installi le dipendenze del backend
- Controlla che tutte le dipendenze siano in `backend/package.json`

### API non rispondono
- Verifica i logs su Vercel Dashboard
- Controlla che `/api/*` routes siano configurate in `vercel.json`
- Verifica che `api/index.js` esista

### Cold start lento
- Considera di usare Vercel Pro per timeout più lunghi
- Implementa connection pooling persistente
- Considera di usare database connection pooling esterno

---

**Raccomandazione**: Usa **Neon** per il database - è ottimizzato per serverless e ha un free tier generoso.

