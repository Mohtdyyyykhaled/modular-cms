# ⚙️ Configurazione Vercel - Variabili d'Ambiente

## ✅ Verifica Configurazione

Assicurati di avere configurato su Vercel:

### Variabile Richiesta

**Key**: `VITE_API_URL`  
**Value**: URL del tuo backend (es: `https://modular-cms-production.up.railway.app`)

### Come Verificare

1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona il progetto `modular-cms`
3. **Settings** → **Environment Variables**
4. Verifica che esista:
   - `VITE_API_URL` con l'URL del backend
   - Selezionato per: **Production**, **Preview**, **Development**

### Formato Corretto

✅ **Corretto**:
```
VITE_API_URL = https://modular-cms-production.up.railway.app
```

❌ **Sbagliato**:
```
VITE_API_URL = https://modular-cms-production.up.railway.app/api  (NO /api)
VITE_API_URL = http://localhost:5000  (NO http, solo https in produzione)
```

## 🔄 Redeploy

Dopo aver configurato la variabile, fai redeploy:

### Opzione 1: Dashboard Vercel
1. Vai su **Deployments**
2. Clicca sui **⋯** (tre puntini) dell'ultimo deployment
3. Seleziona **Redeploy**

### Opzione 2: CLI
```bash
cd /home/lfaggi/Documenti/CMS
VERCEL_TOKEN=GvKj6YZlDptjQqpO8EQzSKB6 npx --yes vercel --token GvKj6YZlDptjQqpO8EQzSKB6 --prod --yes
```

## 🧪 Test

Dopo il redeploy, verifica:

1. **Apri la console del browser** (F12)
2. **Vai su Network tab**
3. **Prova a fare login**
4. **Verifica che le chiamate API vadano all'URL corretto**:
   - Dovresti vedere chiamate a `https://your-backend-url.railway.app/api/auth/login`
   - NON a `https://modular-cms-woad.vercel.app/api/auth/login`

## 🔍 Troubleshooting

### Le chiamate vanno ancora a Vercel?
- Verifica che `VITE_API_URL` sia configurata correttamente
- Assicurati di aver fatto redeploy dopo aver aggiunto la variabile
- Controlla che l'URL non finisca con `/api`

### Errore CORS?
- Verifica che nel backend `CORS_ORIGIN` includa l'URL Vercel:
  ```
  CORS_ORIGIN=https://modular-cms-woad.vercel.app
  ```

### Backend non risponde?
- Verifica che il backend sia deployato e funzionante
- Testa l'endpoint direttamente: `curl https://your-backend-url/api/dashboard/stats`

---

**Nota**: Le variabili d'ambiente che iniziano con `VITE_` vengono incluse nel bundle JavaScript al momento del build. Assicurati di fare redeploy dopo ogni modifica.

