# 🚀 Quick Start Guide

## Installazione Rapida

### 1. Installa le dipendenze
```bash
npm run install:all
```

### 2. Avvia PostgreSQL con Docker
```bash
docker-compose up -d
```

### 3. Configura le variabili d'ambiente
Crea il file `backend/.env`:
```bash
cp backend/env.example backend/.env
```

Modifica `backend/.env` se necessario (di default funziona con Docker).

### 4. Avvia il backend
```bash
cd backend
npm run dev
```

Il backend sarà disponibile su http://localhost:5000

### 5. Avvia il frontend (in un altro terminale)
```bash
cd frontend
npm run dev
```

Il frontend sarà disponibile su http://localhost:5173

## 🔑 Primo Accesso

Dopo aver avviato il backend per la prima volta, viene creato automaticamente un utente admin:

- **Email**: `admin@cms.com`
- **Password**: `admin123`

⚠️ **Cambia la password dopo il primo accesso!**

## 📝 Note

- Il database viene inizializzato automaticamente al primo avvio del backend
- Le tabelle vengono create automaticamente se non esistono
- I file caricati vengono salvati in `backend/uploads/`

## 🐛 Troubleshooting

### Errore di connessione al database
- Verifica che PostgreSQL sia in esecuzione: `docker-compose ps`
- Controlla le credenziali in `backend/.env`
- Verifica che la porta 5432 non sia già in uso

### Errore CORS
- Verifica che `CORS_ORIGIN` in `backend/.env` corrisponda all'URL del frontend
- Di default: `http://localhost:5173`

### Porta già in uso
- Backend: modifica `PORT` in `backend/.env`
- Frontend: modifica `server.port` in `frontend/vite.config.js`

