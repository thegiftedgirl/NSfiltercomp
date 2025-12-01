import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FlowerType {
  id: string;
  name: string;
  category: string;
}

const flowerData: FlowerType[] = [
  { id: '1', name: 'Rose', category: 'Classic' },
  { id: '2', name: 'Tulip', category: 'Spring' },
  { id: '3', name: 'Sunflower', category: 'Summer' },
  { id: '4', name: 'Lavender', category: 'Aromatic' },
  { id: '5', name: 'Orchid', category: 'Exotic' },
  { id: '6', name: 'Lily', category: 'Classic' },
  { id: '7', name: 'Daisy', category: 'Wildflower' },
  { id: '8', name: 'Peony', category: 'Luxury' },
  { id: '9', name: 'Hydrangea', category: 'Garden' },
  { id: '10', name: 'Jasmine', category: 'Aromatic' },
  { id: '11', name: 'Dahlia', category: 'Summer' },
  { id: '12', name: 'Magnolia', category: 'Classic' },
];

export default function FlowerFilter() {
  const [selectedFlowers, setSelectedFlowers] = useState<FlowerType[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectFlower = (flower: FlowerType) => {
    if (!selectedFlowers.find(f => f.id === flower.id)) {
      setSelectedFlowers([...selectedFlowers, flower]);
    }
    setIsDropdownOpen(false);
  };

  const handleRemoveFlower = (flowerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFlowers(selectedFlowers.filter(f => f.id !== flowerId));
  };

  const availableFlowers = flowerData.filter(
    flower => !selectedFlowers.find(f => f.id === flower.id)
  );

  return (
    <div className="w-full max-w-2xl">
      <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ease-in-out ${
          isExpanded ? 'p-6' : 'p-4'
        }`}
      >
        <div
          onClick={handleToggleExpand}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-800">Flower Filter</h3>
            {selectedFlowers.length > 0 && !isExpanded && (
              <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                {selectedFlowers.length}
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleToggleDropdown}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-between group"
              >
                <span className="text-sm font-medium">Select flowers</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {availableFlowers.length > 0 ? (
                    availableFlowers.map(flower => (
                      <button
                        key={flower.id}
                        onClick={() => handleSelectFlower(flower)}
                        className="w-full px-4 py-2.5 text-left hover:bg-green-50 transition-colors flex items-center justify-between group"
                      >
                        <span className="text-sm text-gray-700 font-medium group-hover:text-green-700">
                          {flower.name}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded group-hover:bg-green-100 group-hover:text-green-600">
                          {flower.category}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      All flowers selected
                    </div>
                  )}
                </div>
              )}
            </div>

            {selectedFlowers.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Selected Flowers
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedFlowers.map(flower => (
                    <div
                      key={flower.id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full group hover:from-green-100 hover:to-emerald-100 transition-all"
                    >
                      <span className="text-sm font-medium text-green-800">
                        {flower.name}
                      </span>
                      <button
                        onClick={(e) => handleRemoveFlower(flower.id, e)}
                        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-green-200 transition-colors"
                        aria-label={`Remove ${flower.name}`}
                      >
                        <X className="w-3 h-3 text-green-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFlowers.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No flowers selected yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
