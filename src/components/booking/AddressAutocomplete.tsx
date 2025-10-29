'use client';

import { useState, useEffect, useRef } from 'react';
import { Address } from '@/types/pricing';

interface AddressAutocompleteProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (address: string, fullAddress?: Address) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number];
  context?: Array<{ id: string; text: string }>;
  properties?: {
    address?: string;
  };
}

export default function AddressAutocomplete({
  label,
  placeholder = 'Enter address...',
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className = '',
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceTimer = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions from Mapbox
  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error('Mapbox access token not configured');
      return;
    }

    setLoading(true);

    try {
      // Bias toward Richmond, VA area
      const proximity = '-77.4360,37.5407'; // Richmond coordinates
      const bbox = '-78.5,36.5,-76.5,38.5'; // Virginia region bounding box

      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${accessToken}&proximity=${proximity}&bbox=${bbox}&country=US&limit=5&types=address,poi`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.features) {
        setSuggestions(data.features);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Debounce API calls
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 300);
  };

  // Parse Mapbox feature into Address object
  const parseAddress = (feature: MapboxFeature): Address => {
    const address: Address = {
      formatted: feature.place_name,
      coordinates: {
        lat: feature.center[1],
        lng: feature.center[0],
      },
    };

    // Extract city, state, zip from context
    if (feature.context) {
      feature.context.forEach((ctx) => {
        if (ctx.id.startsWith('place')) {
          address.city = ctx.text;
        } else if (ctx.id.startsWith('region')) {
          address.state = ctx.text;
        } else if (ctx.id.startsWith('postcode')) {
          address.zipCode = ctx.text;
        }
      });
    }

    // Determine zone based on coordinates
    address.zone = determineZone(address.coordinates!);

    return address;
  };

  // Determine pricing zone from coordinates
  const determineZone = (coords: { lat: number; lng: number }): string => {
    const { lat, lng } = coords;

    // Central Virginia (Richmond area): ~37.5° N, ~77.4° W
    if (lat >= 37.3 && lat <= 37.7 && lng >= -77.6 && lng <= -77.2) {
      return 'central-virginia';
    }

    // Prince George: ~37.2° N, ~77.3° W
    if (lat >= 37.0 && lat <= 37.4 && lng >= -77.5 && lng <= -77.1) {
      return 'prince-george';
    }

    // Norfolk/Hampton Roads: ~36.8° N, ~76.3° W
    if (lat >= 36.6 && lat <= 37.0 && lng >= -76.5 && lng <= -76.1) {
      return 'norfolk';
    }

    // Charlottesville: ~38.0° N, ~78.5° W
    if (lat >= 37.9 && lat <= 38.2 && lng >= -78.6 && lng <= -78.3) {
      return 'charlottesville';
    }

    // Default to Central Virginia
    return 'central-virginia';
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (feature: MapboxFeature) => {
    const fullAddress = parseAddress(feature);
    onChange(feature.place_name, fullAddress);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 3 && suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`input-field ${error ? 'border-red-500' : ''} ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />

        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-tnt-red border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm text-gray-900">{suggestion.place_name}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && !loading && suggestions.length === 0 && value.length >= 3 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <p className="text-sm text-gray-500 text-center">
            No addresses found. Please try a different search.
          </p>
        </div>
      )}
    </div>
  );
}
