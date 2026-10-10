'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchControls from '@/components/SearchControls';
import MainResult from '@/components/MainResult';
import SecondaryResults from '@/components/SecondaryResults';
import LocationModal from '@/components/LocationModal';
import LocationPromptModal from '@/components/LocationPromptModal';

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
  const [isExactGps, setIsExactGps] = useState(false);
  const [isLocationPromptOpen, setIsLocationPromptOpen] = useState(false);

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
        setIsExactGps(true);
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
    setIsExactGps(true);
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

  // 5. Core Jumble Execution (Fetch batch of places from Serverless API)
  const executeJumble = async (targetCoords = coords) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const payload = {
        lat: targetCoords?.lat || coords.lat,
        lng: targetCoords?.lng || coords.lng,
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

  // 6. User clicks Jumble button: check if precise location needed
  const handleJumbleClick = () => {
    if (isExactGps) {
      executeJumble(coords);
    } else {
      setIsLocationPromptOpen(true);
    }
  };

  // 7. Accept GPS from prompt modal
  const handleAcceptGpsAndJumble = () => {
    setIsLocationPromptOpen(false);
    if (!navigator.geolocation) {
      executeJumble(coords);
      return;
    }

    setIsDetectingLocation(true);
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const newCoords = { lat, lng };
        setCoords(newCoords);
        setLocationLabel('Exact GPS Location');
        setIsExactGps(true);
        setIsDetectingLocation(false);
        executeJumble(newCoords);
      },
      (err) => {
        console.warn('GPS request failed or denied:', err);
        setIsDetectingLocation(false);
        executeJumble(coords);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // 8. Decline GPS and proceed with guessed location
  const handleDeclineGpsAndJumble = () => {
    setIsLocationPromptOpen(false);
    executeJumble(coords);
  };

  // 9. Select specific place from secondary list
  const handleSelectSpecificPlace = (idx) => {
    setCurrentIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 10. Return to search filters
  const handleResetSearch = () => {
    setViewState('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPlace = placesPool[currentIndex] || null;

  return (
    <div className={`w-full flex flex-col ${viewState === 'search' ? 'h-dvh max-h-dvh justify-between overflow-hidden' : 'min-h-dvh justify-between'}`}>
      
      {/* Navigation: Top 10dvh */}
      <Navbar
        locationLabel={locationLabel}
        isDetectingLocation={isDetectingLocation}
        onRequestGps={handleRequestGps}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        className={viewState === 'search' ? 'h-[10dvh] min-h-14 flex items-center shrink-0' : 'min-h-[10dvh] flex items-center py-2 sm:py-3 shrink-0'}
      />

      {/* Main Content Area: Middle auto-centered in remaining space */}
      <div className={`w-full flex flex-col items-center justify-center ${viewState === 'search' ? 'flex-1 min-h-0 overflow-y-auto py-2' : 'flex-1 py-4 sm:py-6'}`}>
        
        {apiError && (
          <div className="w-full max-w-2xl mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between">
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
            onJumble={handleJumbleClick}
            isLoading={isLoading}
          />
        ) : (
          <div className="w-full flex flex-col items-center">
            <MainResult
              business={currentPlace}
              onResetSearch={handleResetSearch}
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

      {/* Precise Location Prompt Modal */}
      <LocationPromptModal
        isOpen={isLocationPromptOpen}
        onClose={() => setIsLocationPromptOpen(false)}
        onAcceptGps={handleAcceptGpsAndJumble}
        onDeclineGps={handleDeclineGpsAndJumble}
        guessedLocationLabel={locationLabel}
      />

      {/* Footer: Bottom 5dvh */}
      <Footer className={viewState === 'search' ? 'h-[5dvh] min-h-9 flex items-center shrink-0' : 'min-h-[5dvh] flex items-center mt-auto py-3 shrink-0'} />

    </div>
  );
}
