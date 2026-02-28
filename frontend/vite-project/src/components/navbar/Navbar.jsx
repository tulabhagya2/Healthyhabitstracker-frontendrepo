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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">HealthyHabits</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/habits" className="text-sm font-medium hover:text-primary transition-colors">
              Habits
            </Link>
            <Link to="/goals" className="text-sm font-medium hover:text-primary transition-colors">
              Goals
            </Link>
            <Link to="/activities" className="text-sm font-medium hover:text-primary transition-colors">
              Activities
            </Link>
            <Link to="/analytics" className="text-sm font-medium hover:text-primary transition-colors">
              Analytics
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <HamburgerMenu user={user} />
          <Button variant="destructive" onClick={handleLogout} className="hidden md:inline-flex">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
