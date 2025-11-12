import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import toast from 'react-hot-toast';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react';

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await api.get('/pages');
      setPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton variant="title" className="w-64" />
          <Skeleton variant="button" />
        </div>
        <Skeleton variant="default" className="w-full h-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="card" className="p-6" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Pagine</h1>
          <p className="text-gray-400">Gestisci le pagine statiche</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuova Pagina
        </motion.button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cerca pagine..."
          className="input-glass w-full pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold mb-2">{page.title}</h3>
            <p className="text-sm text-gray-400 mb-4">/{page.slug}</p>
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  page.status === 'published'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {page.status}
              </span>
              <div className="flex gap-2">
                <button className="btn-glass p-2">
                  <Edit size={16} />
                </button>
                <button className="btn-glass p-2 text-danger hover:bg-danger/20">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPages.length === 0 && (
        <EmptyState
          icon={FileText}
          title={searchTerm ? "Nessuna pagina trovata" : "Nessuna pagina ancora"}
          description={searchTerm ? "Prova a modificare i termini di ricerca" : "Crea la tua prima pagina statica"}
          action={
            !searchTerm && (
              <button className="btn-primary flex items-center gap-2">
                <Plus size={20} />
                Crea Prima Pagina
              </button>
            )
          }
        />
      )}
    </div>
  );
};

export default Pages;

