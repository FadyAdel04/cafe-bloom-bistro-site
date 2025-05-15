
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-restaurant-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-restaurant-secondary mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the page you are looking for. The page might have been moved, deleted, or never existed.
        </p>
        <div className="space-x-4">
          <Link to="/">
            <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">
              Go Home
            </Button>
          </Link>
          <Link to="/menu">
            <Button variant="outline" className="border-restaurant-primary text-restaurant-primary hover:bg-restaurant-primary/10">
              View Menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
