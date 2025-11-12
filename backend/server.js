import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import clientRoutes from './routes/clients.routes.js';
import blogRoutes from './routes/blog.routes.js';
import pageRoutes from './routes/pages.routes.js';
import mediaRoutes from './routes/media.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

// Import database
import { initDatabase } from './config/database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Initialize database and start server (only if not in serverless environment)
if (process.env.VERCEL !== '1') {
  initDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    })
    .catch((error) => {
      console.error('❌ Failed to initialize database:', error);
      process.exit(1);
    });
} else {
  // In Vercel serverless, initialize database on first request
  let dbInitialized = false;
  app.use(async (req, res, next) => {
    if (!dbInitialized) {
      try {
        await initDatabase();
        dbInitialized = true;
        console.log('✅ Database initialized in serverless function');
      } catch (error) {
        console.error('❌ Database initialization error:', error);
        return res.status(500).json({ message: 'Database initialization failed' });
      }
    }
    next();
  });
}

export default app;

