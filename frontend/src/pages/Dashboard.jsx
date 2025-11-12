import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import TurnCard from '../components/TurnCard';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { FileText, Users, Image, BookOpen, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="title" className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="card" className="p-6" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Articoli pubblicati',
      value: stats?.publishedPosts || 0,
      icon: BookOpen,
      color: 'text-accent',
      bgColor: 'bg-accent/20',
    },
    {
      title: 'Bozze',
      value: stats?.draftPosts || 0,
      icon: FileText,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/20',
    },
    {
      title: 'Utenti attivi',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
    },
    {
      title: 'Media',
      value: stats?.totalMedia || 0,
      icon: Image,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20',
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Panoramica del tuo CMS</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <TrendingUp className="text-gray-400" size={20} />
              </div>
              <h3 className="text-sm text-gray-400 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Articoli recenti</h2>
            <button
              onClick={() => navigate('/blog')}
              className="text-sm text-accent hover:underline"
            >
              Vedi tutti
            </button>
          </div>
          <div className="space-y-3">
            {stats?.recentPosts?.length > 0 ? (
              stats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="glass-light p-4 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{post.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock size={14} />
                        <span>{new Date(post.created_at).toLocaleDateString('it-IT')}</span>
                        <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs">
                          {post.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">Nessun articolo ancora</p>
            )}
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Utenti recenti</h2>
            <button
              onClick={() => navigate('/users')}
              className="text-sm text-accent hover:underline"
            >
              Vedi tutti
            </button>
          </div>
          <div className="space-y-3">
            {stats?.recentUsers?.length > 0 ? (
              stats.recentUsers.map((user) => (
                <TurnCard
                  key={user.id}
                  className="h-24"
                  front={
                    <>
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full rounded-full"
                          />
                        ) : (
                          <span className="text-accent font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-xs text-gray-400">{user.role}</p>
                    </>
                  }
                  back={
                    <>
                      <p className="text-sm mb-2">{user.email}</p>
                      <p className="text-xs text-gray-400">
                        Registrato: {new Date(user.created_at).toLocaleDateString('it-IT')}
                      </p>
                    </>
                  }
                />
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">Nessun utente ancora</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

