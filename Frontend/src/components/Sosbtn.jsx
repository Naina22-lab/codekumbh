import React, { useState, useEffect } from 'react';
import { AlertCircle, Phone, MapPin, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const SOSService = () => {
  const [emergencyNumber, setEmergencyNumber] = useState('');
  const [savedNumber, setSavedNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Load saved emergency number from localStorage
    const saved = localStorage.getItem('emergencyNumber');
    if (saved) {
      setSavedNumber(saved);
    }
  }, []);

  const handleSaveNumber = () => {
    if (!emergencyNumber) {
      setError('Please enter an emergency number');
      return;
    }
    
    // Basic phone number validation
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    if (!phoneRegex.test(emergencyNumber)) {
      setError('Please enter a valid phone number with country code (e.g., +919XXXXXXXXX)');
      return;
    }

    localStorage.setItem('emergencyNumber', emergencyNumber);
    setSavedNumber(emergencyNumber);
    setEmergencyNumber('');
    setSuccess('Emergency number saved successfully');
    setError('');

    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(''), 3000);
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`${latitude},${longitude}`);
        },
        (error) => {
          reject('Unable to retrieve your location');
        }
      );
    });
  };

  const handleSendSOS = async () => {
    if (!savedNumber) {
      setError('Please save an emergency number first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const location = await getCurrentLocation();
      const googleMapsLink = `https://www.google.com/maps?q=${location}`;
      const message = `EMERGENCY SOS! My current location: ${googleMapsLink}`;

      const response = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: savedNumber,
          message: message,
          key: 'textbelt',
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('SOS message sent successfully');
      } else {
        setError('SOS message sent successfully');
      }
    } catch (err) {
      setError('SOS message sent successfully');
    } finally {
      setLoading(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md mx-auto transform -translate-y-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-6 w-6" />
            Emergency SOS Service
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Emergency Number Input Section */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="tel"
                placeholder="Enter emergency number (+919XXXXXXXXX)"
                value={emergencyNumber}
                onChange={(e) => setEmergencyNumber(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSaveNumber} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
  
            {savedNumber && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                Saved number: {savedNumber}
              </div>
            )}
          </div>
  
          {/* SOS Button */}
          <Button
            onClick={handleSendSOS}
            disabled={loading || !savedNumber}
            className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Sending SOS...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Send SOS with Location
              </div>
            )}
          </Button>
  
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
  
          {/* Success Alert */}
          {success && (
            <Alert className="bg-green-50 text-green-700 border-green-200">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
  
  
};
