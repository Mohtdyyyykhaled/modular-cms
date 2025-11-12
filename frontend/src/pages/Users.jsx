import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import TurnCard from '../components/TurnCard';
import { UserPlus, Edit, Trash2 } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo utente?')) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Errore durante l\'eliminazione');
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Utenti</h1>
          <p className="text-gray-400">Gestisci gli utenti del sistema</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="btn-primary flex items-center gap-2"
        >
          <UserPlus size={20} />
          Nuovo Utente
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TurnCard
              className="h-64"
              front={
                <>
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <span className="text-accent font-bold text-2xl">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{user.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{user.email}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      user.role === 'admin'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {user.role}
                  </span>
                </>
              }
              back={
                <>
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-400">
                      Ultimo accesso:{' '}
                      {user.last_login
                        ? new Date(user.last_login).toLocaleDateString('it-IT')
                        : 'Mai'}
                    </p>
                    <p className="text-sm text-gray-400">
                      Registrato: {new Date(user.created_at).toLocaleDateString('it-IT')}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 btn-glass text-sm">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="flex-1 btn-glass text-danger hover:bg-danger/20 text-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </>
              }
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Users;

