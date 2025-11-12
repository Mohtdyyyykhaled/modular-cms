import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import toast from 'react-hot-toast';
import TurnCard from '../components/TurnCard';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { UserPlus, Edit, Trash2, X, Save, Mail, Phone, Building, MapPin, Users } from 'lucide-react';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      setClients(response.data.clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      notes: '',
    });
    setShowModal(true);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      company: client.company || '',
      address: client.address || '',
      notes: client.notes || '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingClient) {
        await api.put(`/clients/${editingClient.id}`, formData);
        toast.success('Cliente aggiornato con successo!');
      } else {
        await api.post('/clients', formData);
        toast.success('Cliente creato con successo!');
      }
      setShowModal(false);
      fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Errore durante il salvataggio');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo cliente?')) return;

    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter((client) => client.id !== id));
      toast.success('Cliente eliminato con successo');
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Errore durante l\'eliminazione');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton variant="title" className="w-64" />
          <Skeleton variant="button" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="card" className="h-80" />
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
          <h1 className="text-3xl font-bold mb-2">Clienti</h1>
          <p className="text-gray-400">Gestisci i tuoi clienti</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2"
        >
          <UserPlus size={20} />
          Nuovo Cliente
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TurnCard
              className="h-80"
              front={
                <>
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <span className="text-accent font-bold text-2xl">
                      {client.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{client.name}</h3>
                  {client.company && (
                    <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Building size={14} />
                      {client.company}
                    </p>
                  )}
                  <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                    <Mail size={14} />
                    {client.email}
                  </p>
                  {client.phone && (
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <Phone size={14} />
                      {client.phone}
                    </p>
                  )}
                </>
              }
              back={
                <>
                  <div className="text-center space-y-2">
                    {client.address && (
                      <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                        <MapPin size={14} />
                        {client.address}
                      </p>
                    )}
                    {client.notes && (
                      <p className="text-sm text-gray-400 italic">
                        "{client.notes}"
                      </p>
                    )}
                    <p className="text-sm text-gray-400">
                      Aggiunto: {new Date(client.created_at).toLocaleDateString('it-IT')}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(client)}
                        className="flex-1 btn-glass text-sm flex items-center justify-center gap-2"
                      >
                        <Edit size={16} />
                        Modifica
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="flex-1 btn-glass text-danger hover:bg-danger/20 text-sm flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Elimina
                      </button>
                    </div>
                  </div>
                </>
              }
            />
          </motion.div>
        ))}
      </div>

      {clients.length === 0 && (
        <EmptyState
          icon={Users}
          title="Nessun cliente ancora"
          description="Inizia aggiungendo il tuo primo cliente. Potrai gestire tutte le informazioni di contatto in un unico posto."
          action={
            <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
              <UserPlus size={20} />
              Aggiungi Primo Cliente
            </button>
          }
        />
      )}

      {/* Modal per aggiungere/modificare cliente */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong p-6 rounded-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingClient ? 'Modifica Cliente' : 'Nuovo Cliente'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="btn-glass p-2"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-glass w-full"
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-glass w-full"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Telefono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-glass w-full"
                  placeholder="+39 123 456 7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Azienda</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="input-glass w-full"
                  placeholder="Nome azienda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Indirizzo</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-glass w-full"
                  placeholder="Via, Città, CAP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Note</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input-glass w-full"
                  rows="3"
                  placeholder="Note aggiuntive sul cliente"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn-glass"
              >
                Annulla
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name || !formData.email}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Salva
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Clients;

