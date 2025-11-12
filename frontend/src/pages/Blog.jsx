import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { Plus, Search, Edit, Trash2, Eye, BookOpen } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/blog');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo articolo?')) return;

    try {
      await api.delete(`/blog/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
      toast.success('Articolo eliminato con successo');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Errore durante l\'eliminazione');
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold mb-2">Blog</h1>
          <p className="text-gray-400">Gestisci i tuoi articoli</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/blog/new')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuovo Articolo
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cerca articoli..."
          className="input-glass w-full pl-10"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-xl hover:bg-white/15 transition-all cursor-pointer group"
          >
            {post.featured_image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
            {post.excerpt && (
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {post.author_avatar ? (
                  <img
                    src={post.author_avatar}
                    alt={post.author_name}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xs text-accent font-semibold">
                      {post.author_name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-xs text-gray-400">{post.author_name}</span>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  post.status === 'published'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {post.status}
              </span>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => navigate(`/blog/${post.id}`)}
                className="flex-1 btn-glass flex items-center justify-center gap-2 text-sm"
              >
                <Edit size={16} />
                Modifica
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="btn-glass text-danger hover:bg-danger/20 flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <EmptyState
          icon={BookOpen}
          title={searchTerm ? "Nessun articolo trovato" : "Nessun articolo ancora"}
          description={searchTerm ? "Prova a modificare i termini di ricerca" : "Inizia creando il tuo primo articolo"}
          action={
            !searchTerm && (
              <button
                onClick={() => navigate('/blog/new')}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                Crea Primo Articolo
              </button>
            )
          }
        />
      )}
    </div>
  );
};

export default Blog;

