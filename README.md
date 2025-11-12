# 🎯 Modular CMS

Un CMS modulare, elegante e accattivante con interfaccia glassmorphism e effetti visivi avanzati.

## 🚀 Caratteristiche

- ✨ **UI Moderna**: Glassmorphism, turncard effects, tema chiaro/scuro
- 🔐 **Autenticazione**: JWT con ruoli utente (admin, editor)
- 📝 **Content Management**: Editor WYSIWYG, gestione blog e pagine
- 🖼️ **Media Manager**: Upload e gestione file multimediali
- 👥 **Gestione Utenti**: Sistema di ruoli e permessi
- ⚙️ **Personalizzabile**: Branding, colori, configurazioni
- 🎨 **Animazioni**: Framer Motion per transizioni fluide
- 📱 **Responsive**: Design mobile-first

## 🛠️ Tecnologie

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Zustand
- React Quill (WYSIWYG Editor)
- Lucide Icons

### Backend
- Node.js + Express
- PostgreSQL
- JWT Authentication
- Multer (file upload)
- Bcrypt (password hashing)

## 📦 Installazione

### Prerequisiti
- Node.js 18+
- PostgreSQL 15+
- Docker (opzionale, per PostgreSQL)

### Setup

1. **Clona il repository**
```bash
cd CMS
```

2. **Installa le dipendenze**
```bash
npm run install:all
```

3. **Configura il database**

Opzione A: Usa Docker
```bash
docker-compose up -d
```

Opzione B: PostgreSQL locale
- Crea un database PostgreSQL
- Aggiorna le variabili d'ambiente in `backend/.env`

4. **Configura le variabili d'ambiente**

Copia `backend/.env.example` in `backend/.env` e modifica:
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
DB_HOST=localhost
DB_PORT=5432
DB_USER=cms_user
DB_PASSWORD=cms_password
DB_NAME=cms_db
CORS_ORIGIN=http://localhost:5173
```

5. **Avvia il backend**
```bash
cd backend
npm run dev
```

6. **Avvia il frontend** (in un altro terminale)
```bash
cd frontend
npm run dev
```

7. **Accedi all'applicazione**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔑 Credenziali di default

Dopo la prima inizializzazione del database, viene creato un utente admin:
- **Email**: admin@cms.com
- **Password**: admin123

⚠️ **IMPORTANTE**: Cambia la password dopo il primo accesso!

## 📁 Struttura del progetto

```
CMS/
├── backend/
│   ├── config/          # Configurazione database
│   ├── middleware/      # Middleware (auth, ecc.)
│   ├── routes/          # Route API
│   ├── uploads/         # File caricati
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Componenti React
│   │   ├── pages/       # Pagine
│   │   ├── store/       # Zustand stores
│   │   ├── utils/       # Utilities
│   │   └── App.jsx      # App principale
│   └── vite.config.js
├── docker-compose.yml   # Configurazione Docker
└── README.md
```

## 🎨 Componenti UI

### Glassmorphism
```jsx
<div className="glass">
  Contenuto con effetto glassmorphism
</div>
```

### TurnCard Effect
```jsx
<TurnCard
  front={<div>Fronte</div>}
  back={<div>Retro</div>}
/>
```

### Button Glass
```jsx
<button className="btn-glass">
  Pulsante
</button>
```

## 📡 API Endpoints

### Autenticazione
- `POST /api/auth/register` - Registrazione
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Utente corrente
- `POST /api/auth/logout` - Logout

### Blog
- `GET /api/blog` - Lista articoli
- `GET /api/blog/:id` - Dettaglio articolo
- `POST /api/blog` - Crea articolo
- `PUT /api/blog/:id` - Aggiorna articolo
- `DELETE /api/blog/:id` - Elimina articolo

### Pagine
- `GET /api/pages` - Lista pagine
- `GET /api/pages/:slug` - Dettaglio pagina
- `POST /api/pages` - Crea pagina
- `PUT /api/pages/:id` - Aggiorna pagina
- `DELETE /api/pages/:id` - Elimina pagina

### Media
- `GET /api/media` - Lista media
- `POST /api/media/upload` - Upload file
- `DELETE /api/media/:id` - Elimina file

### Utenti
- `GET /api/users` - Lista utenti (admin)
- `GET /api/users/:id` - Dettaglio utente
- `PUT /api/users/:id` - Aggiorna utente
- `DELETE /api/users/:id` - Elimina utente (admin)

### Dashboard
- `GET /api/dashboard/stats` - Statistiche

### Impostazioni
- `GET /api/settings` - Ottieni impostazioni
- `PUT /api/settings` - Aggiorna impostazioni (admin)

## 🚢 Deploy

### Backend
Il backend può essere deployato su:
- DigitalOcean
- Heroku
- AWS
- Vercel (con serverless functions)

### Frontend
Il frontend può essere deployato su:
- Vercel (consigliato)
- Netlify
- AWS S3 + CloudFront

### Database
- PostgreSQL su cloud (AWS RDS, DigitalOcean Managed Database, ecc.)

## 🔒 Sicurezza

- Password hashate con bcrypt
- JWT per autenticazione
- Helmet per sicurezza HTTP headers
- Validazione input con express-validator
- CORS configurato

## 📝 Licenza

MIT

## 🤝 Contribuire

Contributi benvenuti! Apri una issue o una pull request.

## 📧 Supporto

Per supporto, apri una issue su GitHub.

---

Sviluppato con ❤️ usando React, Express e TailwindCSS

