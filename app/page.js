'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchControls from '@/components/SearchControls';
import MainResult from '@/components/MainResult';
import SecondaryResults from '@/components/SecondaryResults';
import LocationModal from '@/components/LocationModal';

export default function Home() {
  // Search parameters
  const [mode, setMode] = useState('hungry');
  const [radius, setRadius] = useState(5);
  const [category, setCategory] = useState('all');
  const [groupSize, setGroupSize] = useState('friends');

  // Location state
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [locationLabel, setLocationLabel] = useState('Detecting location...');
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Results & Pool state
  const [viewState, setViewState] = useState('search'); // 'search' | 'result'
  const [placesPool, setPlacesPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // 1. Initial IP-based Geolocation detection (Zero permission required)
  useEffect(() => {
    async function detectIpLocation() {
      try {
        const res = await fetch('/api/ip-geo');
        const data = await res.json();
        if (data.success && data.lat && data.lng) {
          setCoords({ lat: data.lat, lng: data.lng });
          const label = data.region ? `${data.city}, ${data.region}` : data.city;
          setLocationLabel(label || 'Local Area');
        } else {
          // Default to San Francisco
          setCoords({ lat: 37.7749, lng: -122.4194 });
          setLocationLabel('San Francisco, CA');
        }
      } catch (err) {
        setCoords({ lat: 37.7749, lng: -122.4194 });
        setLocationLabel('San Francisco, CA');
      } finally {
        setIsDetectingLocation(false);
      }
    }

    detectIpLocation();
  }, []);

  // 2. High-Precision GPS Request handler
  const handleRequestGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoords({ lat, lng });
        setLocationLabel('Exact GPS Location');
        setIsDetectingLocation(false);
      },
      (err) => {
        console.warn('GPS permission denied or unavailable:', err);
        setIsDetectingLocation(false);
        alert('Could not acquire GPS. Using IP or custom location instead.');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // 3. Manual Location Selection from Modal
  const handleLocationSelected = ({ lat, lng, label }) => {
    setCoords({ lat, lng });
    setLocationLabel(label);
  };

  // 4. Fire celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3a7b8f', '#5bc0de', '#ed6c4f', '#ffbd4f']
      });
    } catch (e) {
      // Ignore if confetti fails
    }
  };

  // 5. Jumble Action (Fetch batch of 5-10 places from Serverless API)
  const handleJumble = async () => {
    setIsLoading(true);
    setApiError(null);

    try {
      const payload = {
        lat: coords.lat,
        lng: coords.lng,
        radius,
        mode,
        category,
        groupSize
      };

      const res = await fetch('/api/jumble', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success && data.places && data.places.length > 0) {
        setPlacesPool(data.places);
        setCurrentIndex(0);
        setViewState('result');
        triggerConfetti();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setApiError('No matching venues found within this radius. Try expanding your distance.');
      }
    } catch (err) {
      console.error('Error jumbling:', err);
      setApiError('Failed to fetch recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Next Result Action (Spin next spot in the local session pool - Zero API calls!)
  const handleNextResult = () => {
    if (placesPool.length === 0) return;
    const nextIdx = (currentIndex + 1) % placesPool.length;
    setCurrentIndex(nextIdx);
    triggerConfetti();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 7. Select specific place from secondary list
  const handleSelectSpecificPlace = (idx) => {
    setCurrentIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 8. Return to search filters
  const handleResetSearch = () => {
    setViewState('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPlace = placesPool[currentIndex] || null;

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navigation */}
      <Navbar
        locationLabel={locationLabel}
        isDetectingLocation={isDetectingLocation}
        onRequestGps={handleRequestGps}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        
        {apiError && (
          <div className="w-full max-w-2xl mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between">
            <span>{apiError}</span>
            <button
              onClick={() => setApiError(null)}
              className="text-xs font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {viewState === 'search' ? (
          <SearchControls
            mode={mode}
            setMode={setMode}
            radius={radius}
            setRadius={setRadius}
            category={category}
            setCategory={setCategory}
            groupSize={groupSize}
            setGroupSize={setGroupSize}
            onJumble={handleJumble}
            isLoading={isLoading}
          />
        ) : (
          <div className="w-full flex flex-col items-center">
            <MainResult
              business={currentPlace}
              currentIndex={currentIndex}
              totalInBatch={placesPool.length}
              onNextResult={handleNextResult}
              onResetSearch={handleResetSearch}
              groupSize={groupSize}
            />

            <SecondaryResults
              places={placesPool}
              activeIndex={currentIndex}
              onSelectPlace={handleSelectSpecificPlace}
            />
          </div>
        )}

      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelected={handleLocationSelected}
        onRequestGps={handleRequestGps}
        currentLocationLabel={locationLabel}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
