import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import toast from 'react-hot-toast';
import EmptyState from '../components/EmptyState';
import { Upload, Trash2, Image as ImageIcon, Video, Music, File, X, Play, Pause } from 'lucide-react';

const Media = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [audioProgress, setAudioProgress] = useState({});

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await api.get('/media');
      setMedia(response.data.media);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        await api.post('/media/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchMedia();
      toast.success(`${files.length} file caricati con successo!`);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Errore durante il caricamento');
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo file?')) return;

    try {
      await api.delete(`/media/${id}`);
      setMedia(media.filter((item) => item.id !== id));
      if (selectedMedia?.id === id) {
        setSelectedMedia(null);
      }
      toast.success('File eliminato con successo');
    } catch (error) {
      console.error('Error deleting media:', error);
      toast.error('Errore durante l\'eliminazione');
    }
  };

  const getMediaIcon = (mimeType) => {
    if (mimeType?.startsWith('image/')) return ImageIcon;
    if (mimeType?.startsWith('video/')) return Video;
    if (mimeType?.startsWith('audio/')) return Music;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handlePlayAudio = (mediaItem) => {
    const audio = new Audio(`http://localhost:5000${mediaItem.path}`);
    
    if (playingAudio && playingAudio.id === mediaItem.id) {
      playingAudio.audio.pause();
      setPlayingAudio(null);
      return;
    }

    if (playingAudio) {
      playingAudio.audio.pause();
    }

    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setAudioProgress({ ...audioProgress, [mediaItem.id]: progress });
    });

    audio.addEventListener('ended', () => {
      setPlayingAudio(null);
      setAudioProgress({ ...audioProgress, [mediaItem.id]: 0 });
    });

    audio.play();
    setPlayingAudio({ id: mediaItem.id, audio });
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
          <h1 className="text-3xl font-bold mb-2">Media</h1>
          <p className="text-gray-400">Gestisci i tuoi file multimediali</p>
        </motion.div>
        <label className="btn-primary flex items-center gap-2 cursor-pointer">
          <Upload size={20} />
          {uploading ? 'Caricamento...' : 'Carica File'}
          <input
            type="file"
            onChange={handleUpload}
            className="hidden"
            accept="image/*,video/*,audio/*"
            multiple
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((item, index) => {
          const Icon = getMediaIcon(item.mime_type);
          const isImage = item.mime_type?.startsWith('image/');
          const isVideo = item.mime_type?.startsWith('video/');
          const isAudio = item.mime_type?.startsWith('audio/');
          const isPlaying = playingAudio?.id === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass p-4 rounded-xl group relative cursor-pointer hover:bg-white/15 transition-all"
              onClick={() => setSelectedMedia(item)}
            >
              {isImage ? (
                <img
                  src={`http://localhost:5000${item.path}`}
                  alt={item.original_name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              ) : isVideo ? (
                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2 bg-black/20">
                  <video
                    src={`http://localhost:5000${item.path}`}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Video className="text-white" size={32} />
                  </div>
                </div>
              ) : isAudio ? (
                <div className="w-full h-32 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-lg flex flex-col items-center justify-center mb-2 relative overflow-hidden">
                  <Music className="text-accent mb-2" size={32} />
                  {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/50">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${audioProgress[item.id] || 0}%` }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-32 bg-white/10 rounded-lg flex items-center justify-center mb-2">
                  <Icon className="text-gray-400" size={32} />
                </div>
              )}
              
              <p className="text-xs text-gray-400 truncate mb-1" title={item.original_name}>
                {item.original_name}
              </p>
              <p className="text-xs text-gray-500 mb-2">{formatFileSize(item.size)}</p>
              
              <div className="flex gap-2">
                {isAudio && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(item);
                    }}
                    className="flex-1 btn-glass text-accent hover:bg-accent/20 flex items-center justify-center gap-1 text-xs"
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  className={`${isAudio ? 'flex-1' : 'w-full'} btn-glass text-danger hover:bg-danger/20 flex items-center justify-center gap-1 text-xs`}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {media.length === 0 && (
        <EmptyState
          icon={ImageIcon}
          title="Nessun file caricato"
          description="Inizia caricando il tuo primo file multimediale. Supportiamo immagini, video e audio."
          action={
            <label className="btn-primary flex items-center gap-2 cursor-pointer">
              <Upload size={20} />
              Carica File
              <input
                type="file"
                onChange={handleUpload}
                className="hidden"
                accept="image/*,video/*,audio/*"
                multiple
              />
            </label>
          }
        />
      )}

      {/* Modal per visualizzare/riprodurre media */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold truncate">{selectedMedia.original_name}</h2>
              <button
                onClick={() => setSelectedMedia(null)}
                className="btn-glass p-2"
              >
                <X size={20} />
              </button>
            </div>

            {selectedMedia.mime_type?.startsWith('image/') && (
              <img
                src={`http://localhost:5000${selectedMedia.path}`}
                alt={selectedMedia.original_name}
                className="w-full rounded-lg"
              />
            )}

            {selectedMedia.mime_type?.startsWith('video/') && (
              <div className="glass rounded-lg overflow-hidden">
                <video
                  src={`http://localhost:5000${selectedMedia.path}`}
                  controls
                  className="w-full"
                  style={{ maxHeight: '70vh' }}
                >
                  Il tuo browser non supporta il tag video.
                </video>
              </div>
            )}

            {selectedMedia.mime_type?.startsWith('audio/') && (
              <div className="glass p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <Music className="text-accent" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{selectedMedia.original_name}</h3>
                    <p className="text-sm text-gray-400">{formatFileSize(selectedMedia.size)}</p>
                  </div>
                </div>
                <audio
                  src={`http://localhost:5000${selectedMedia.path}`}
                  controls
                  className="w-full"
                  onPlay={() => handlePlayAudio(selectedMedia)}
                  onPause={() => {
                    if (playingAudio?.id === selectedMedia.id) {
                      playingAudio.audio.pause();
                      setPlayingAudio(null);
                    }
                  }}
                >
                  Il tuo browser non supporta il tag audio.
                </audio>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                <p>Dimensione: {formatFileSize(selectedMedia.size)}</p>
                <p>Tipo: {selectedMedia.mime_type}</p>
                {selectedMedia.uploaded_by_name && (
                  <p>Caricato da: {selectedMedia.uploaded_by_name}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(selectedMedia.id)}
                className="btn-danger flex items-center gap-2"
              >
                <Trash2 size={18} />
                Elimina
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Media;
