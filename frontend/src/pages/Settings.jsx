import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    site_name: '',
    site_description: '',
    site_logo: '',
    primary_color: '#00BFA6',
    secondary_color: '#FF6B6B',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/settings');
      setSettings({ ...settings, ...response.data.settings });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/settings', settings);
      toast.success('Impostazioni salvate con successo!');
    } catch (error) {
      console.error('Error saving settings:', error);
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Impostazioni</h1>
          <p className="text-gray-400">Configura il tuo CMS</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          <Save size={20} />
          {saving ? 'Salvataggio...' : 'Salva'}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-6 rounded-xl space-y-4"
        >
          <h2 className="text-xl font-bold mb-4">Generale</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Nome del sito</label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              className="input-glass w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Descrizione</label>
            <textarea
              value={settings.site_description}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              className="input-glass w-full"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Logo URL</label>
            <input
              type="text"
              value={settings.site_logo}
              onChange={(e) => setSettings({ ...settings, site_logo: e.target.value })}
              className="input-glass w-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-6 rounded-xl space-y-4"
        >
          <h2 className="text-xl font-bold mb-4">Branding</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Colore primario</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.primary_color}
                onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                className="w-16 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.primary_color}
                onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                className="input-glass flex-1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Colore secondario</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.secondary_color}
                onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                className="w-16 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.secondary_color}
                onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                className="input-glass flex-1"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;

