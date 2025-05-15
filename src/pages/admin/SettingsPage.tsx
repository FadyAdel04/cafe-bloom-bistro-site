
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SettingsPage = () => {
  const handleSave = (section: string) => {
    toast({
      title: "Settings Updated",
      description: `${section} settings have been updated successfully.`,
      duration: 3000,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-restaurant-secondary">Settings</h1>
        <p className="text-gray-500">Manage your account and restaurant settings</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input 
                type="text" 
                defaultValue="Admin User"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input 
                type="email" 
                defaultValue="admin@cafebloom.com"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              className="bg-restaurant-primary hover:bg-restaurant-primary/90"
              onClick={() => handleSave('Profile')}
            >
              Save Changes
            </Button>
          </div>
        </Card>
        
        {/* Password Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              className="bg-restaurant-primary hover:bg-restaurant-primary/90"
              onClick={() => handleSave('Password')}
            >
              Update Password
            </Button>
          </div>
        </Card>
        
        {/* Restaurant Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Restaurant Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input 
                type="text" 
                defaultValue="Café Bloom"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input 
                type="text" 
                defaultValue="123 Restaurant Street, City"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input 
                type="text" 
                defaultValue="(123) 456-7890"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-primary"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              className="bg-restaurant-primary hover:bg-restaurant-primary/90"
              onClick={() => handleSave('Restaurant')}
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
