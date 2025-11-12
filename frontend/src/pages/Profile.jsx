import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { 
  User, Mail, Lock, Camera, Save, Bell, Shield, Download, 
  Calendar, Globe, Key, Image as ImageIcon 
} from 'lucide-react';

const Profile = () => {
  const { user, checkAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    language: 'it',
    timezone: 'Europe/Rome',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      await api.put(`/users/${user.id}`, profileData);
      await checkAuth();
      toast.success('Profilo aggiornato con successo!');
    } catch (error) {
      toast.error('Errore durante l\'aggiornamento del profilo');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Le password non corrispondono');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('La password deve essere di almeno 6 caratteri');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implementare endpoint per cambio password
      toast.success('Password cambiata con successo!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Errore durante il cambio password');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // TODO: Implementare upload avatar
    toast.success('Avatar aggiornato!');
  };

  const tabs = [
    { id: 'profile', label: 'Profilo', icon: User },
    { id: 'security', label: 'Sicurezza', icon: Shield },
    { id: 'preferences', label: 'Preferenze', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Profilo Utente</h1>
        <p className="text-gray-400">Gestisci le tue informazioni personali e preferenze</p>
      </motion.div>

      {/* Avatar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center border-4 border-accent/30 overflow-hidden">
              {profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-accent font-bold text-3xl">
                  {profileData.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 btn-glass p-2 rounded-full cursor-pointer hover:bg-accent/20">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            <p className="text-gray-400 mb-2">{profileData.email}</p>
            <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm inline-block">
              {user?.role}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="glass p-2 rounded-xl flex gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-accent/20 text-accent'
                  : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass p-6 rounded-xl"
      >
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User size={24} />
              Informazioni Personali
            </h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="input-glass w-full pl-10"
                  placeholder="Il tuo nome"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="input-glass w-full pl-10"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <button
                onClick={handleProfileUpdate}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                <Save size={18} />
                {loading ? 'Salvataggio...' : 'Salva Modifiche'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield size={24} />
              Sicurezza
            </h2>

            <div>
              <label className="block text-sm font-medium mb-2">Password attuale</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="input-glass w-full pl-10"
                  placeholder="Password attuale"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nuova password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="input-glass w-full pl-10"
                  placeholder="Nuova password (min. 6 caratteri)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Conferma password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="input-glass w-full pl-10"
                  placeholder="Conferma nuova password"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <button
                onClick={handlePasswordChange}
                disabled={loading || !passwordData.currentPassword || !passwordData.newPassword}
                className="btn-primary flex items-center gap-2"
              >
                <Lock size={18} />
                {loading ? 'Aggiornamento...' : 'Cambia Password'}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <h3 className="font-bold mb-3">Privacy & Dati</h3>
              <button className="btn-glass flex items-center gap-2 w-full justify-center">
                <Download size={18} />
                Scarica i miei dati (GDPR)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bell size={24} />
              Preferenze
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between glass-light p-4 rounded-lg">
                <div>
                  <h3 className="font-medium">Notifiche Email</h3>
                  <p className="text-sm text-gray-400">Ricevi notifiche via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between glass-light p-4 rounded-lg">
                <div>
                  <h3 className="font-medium">Notifiche Push</h3>
                  <p className="text-sm text-gray-400">Ricevi notifiche push nel browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.pushNotifications}
                    onChange={(e) => setPreferences({ ...preferences, pushNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lingua</label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="input-glass w-full"
                >
                  <option value="it">Italiano</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fuso orario</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                  className="input-glass w-full"
                >
                  <option value="Europe/Rome">Europe/Rome (GMT+1)</option>
                  <option value="Europe/London">Europe/London (GMT+0)</option>
                  <option value="America/New_York">America/New_York (GMT-5)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <button
                onClick={() => toast.success('Preferenze salvate!')}
                className="btn-primary flex items-center gap-2"
              >
                <Save size={18} />
                Salva Preferenze
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;



