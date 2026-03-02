import { Link, useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { HamburgerMenu } from './HamburgerMenu';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';

export function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authAPI.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-white" />
            <span className="font-bold text-xl hidden sm:inline-block">HealthyHabits</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {['Dashboard', 'Habits', 'Goals','Analytics'].map((page) => (
              <Link
                key={page}
                to={`/${page.toLowerCase()}`}
                className="text-white text-sm font-medium hover:text-blue-200 transition-colors"
              >
                {page}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Desktop Logout button */}
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="hidden md:inline-flex px-4 py-2"
          >
            Logout
          </Button>

          {/* Mobile Hamburger menu */}
          <HamburgerMenu user={user} />
        </div>
      </div>
    </header>
  );
}