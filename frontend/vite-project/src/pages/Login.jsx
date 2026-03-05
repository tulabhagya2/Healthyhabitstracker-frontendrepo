import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { LoginForm } from '../components/forms/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

 export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Activity className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Login to continue your healthy journey</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


