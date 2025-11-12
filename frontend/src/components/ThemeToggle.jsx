import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="btn-glass p-2 rounded-lg transition-all duration-300 hover:bg-white/20"
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun className="text-yellow-400" size={20} />
      ) : (
        <Moon className="text-blue-400" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;



