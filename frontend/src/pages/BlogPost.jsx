import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Save, ArrowLeft, Eye } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    url: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(id !== 'new');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id !== 'new') {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/blog/${id}`);
      setPost(response.data.post);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!post.title || !post.slug) {
      toast.error('Titolo e slug sono obbligatori');
      return;
    }

    setSaving(true);
    try {
      if (id === 'new') {
        await api.post('/blog', post);
        toast.success('Articolo creato con successo!');
      } else {
        await api.put(`/blog/${id}`, post);
        toast.success('Articolo aggiornato con successo!');
      }
      navigate('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Errore durante il salvataggio');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/blog')}
          className="btn-glass flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Indietro
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            <Save size={20} />
            {saving ? 'Salvataggio...' : 'Salva'}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl space-y-6"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Titolo</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="input-glass w-full"
            placeholder="Titolo dell'articolo"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              className="input-glass w-full"
              placeholder="url-friendly-slug"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stato</label>
            <select
              value={post.status}
              onChange={(e) => setPost({ ...post, status: e.target.value })}
              className="input-glass w-full"
            >
              <option value="draft">Bozza</option>
              <option value="published">Pubblicato</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            className="input-glass w-full"
            rows="3"
            placeholder="Breve descrizione dell'articolo"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Immagine in evidenza</label>
            <input
              type="text"
              value={post.featured_image}
              onChange={(e) => setPost({ ...post, featured_image: e.target.value })}
              className="input-glass w-full"
              placeholder="URL immagine"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">URL del Blog</label>
            <input
              type="url"
              value={post.url}
              onChange={(e) => setPost({ ...post, url: e.target.value })}
              className="input-glass w-full"
              placeholder="https://example.com/blog"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contenuto</label>
          <div className="bg-white/5 rounded-lg quill-dark">
            <ReactQuill
              theme="snow"
              value={post.content}
              onChange={(value) => setPost({ ...post, content: value })}
              className="bg-transparent"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPost;

