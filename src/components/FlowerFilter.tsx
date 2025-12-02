import { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FlowerOption {
  id: string;
  name: string;
  category: string;
}

const flowerCategories = [
  {
    key: 'annuals',
    label: 'Annuals',
    options: [
      { id: 'marigold', name: 'Marigold', category: 'annuals' },
      { id: 'petunia', name: 'Petunia', category: 'annuals' },
      { id: 'zinnia', name: 'Zinnia', category: 'annuals' },
    ]
  },
  {
    key: 'perennials',
    label: 'Perennials',
    options: [
      { id: 'rose', name: 'Rose', category: 'perennials' },
      { id: 'lavender', name: 'Lavender', category: 'perennials' },
      { id: 'peony', name: 'Peony', category: 'perennials' },
    ]
  },
  {
    key: 'bulbs',
    label: 'Bulbs',
    options: [
      { id: 'tulip', name: 'Tulip', category: 'bulbs' },
      { id: 'daffodil', name: 'Daffodil', category: 'bulbs' },
      { id: 'lily', name: 'Lily', category: 'bulbs' },
    ]
  },
  {
    key: 'wildflowers',
    label: 'Wildflowers',
    options: [
      { id: 'daisy', name: 'Daisy', category: 'wildflowers' },
      { id: 'poppy', name: 'Poppy', category: 'wildflowers' },
      { id: 'sunflower', name: 'Sunflower', category: 'wildflowers' },
    ]
  }
];

export default function FlowerFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('annuals');
  const [selectedFlowers, setSelectedFlowers] = useState<FlowerOption[]>([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (flower: FlowerOption) => {
    const isSelected = selectedFlowers.find(f => f.id === flower.id);
    if (isSelected) {
      setSelectedFlowers(selectedFlowers.filter(f => f.id !== flower.id));
    } else {
      setSelectedFlowers([...selectedFlowers, flower]);
    }
  };

  const handleRemoveTag = (flowerId: string) => {
    setSelectedFlowers(selectedFlowers.filter(f => f.id !== flowerId));
  };

  const handleClearAll = () => {
    setSelectedFlowers([]);
  };

  const getCountByCategory = (categoryKey: string) => {
    return selectedFlowers.filter(f => f.category === categoryKey).length;
  };

  return (
    <div className="w-full max-w-3xl">
      <button
        onClick={handleToggle}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border-2 transition-colors ${
          selectedFlowers.length > 0
            ? 'border-blue-500 text-blue-600 bg-white hover:bg-blue-50'
            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
        }`}
      >
        <Filter className="w-4 h-4" />
        <span className="font-medium">
          Filters {selectedFlowers.length > 0 && `(${selectedFlowers.length})`}
        </span>
      </button>

      {isOpen && (
        <div className="mt-3 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex">
            <div className="w-48 border-r border-gray-200">
              <div className="flex flex-col">
                {flowerCategories.map((category) => {
                  const count = getCountByCategory(category.key);
                  return (
                    <button
                      key={category.key}
                      onClick={() => setActiveTab(category.key)}
                      className={`px-4 py-3 text-left text-sm transition-colors relative ${
                        activeTab === category.key
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {activeTab === category.key && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                      )}
                      <span className="font-medium">
                        {category.label} {count > 0 && `(${count})`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 p-6">
              <div className="space-y-3">
                {flowerCategories
                  .find(cat => cat.key === activeTab)
                  ?.options.map((flower) => {
                    const isChecked = selectedFlowers.find(f => f.id === flower.id);
                    return (
                      <label
                        key={flower.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={!!isChecked}
                          onChange={() => handleCheckboxChange(flower)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {flower.name}
                        </span>
                      </label>
                    );
                  })}
              </div>
            </div>
          </div>

          {selectedFlowers.length > 0 && (
            <>
              <div className="border-t border-gray-200" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap gap-2 flex-1">
                    {selectedFlowers.map((flower) => (
                      <div
                        key={flower.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        <span>{flower.name}</span>
                        <button
                          onClick={() => handleRemoveTag(flower.id)}
                          className="hover:bg-gray-200 rounded-sm p-0.5 transition-colors"
                          aria-label={`Remove ${flower.name}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                  >
                    Clear all Filters
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
