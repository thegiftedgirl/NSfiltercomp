import { useState } from 'react';
import { Button, Tabs, Checkbox, Tag, Divider } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

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
      { id: 'pansy', name: 'Pansy', category: 'annuals' },
      { id: 'impatiens', name: 'Impatiens', category: 'annuals' },
      { id: 'begonia', name: 'Begonia', category: 'annuals' },
      { id: 'cosmos', name: 'Cosmos', category: 'annuals' },
    ]
  },
  {
    key: 'perennials',
    label: 'Perennials',
    options: [
      { id: 'rose', name: 'Rose', category: 'perennials' },
      { id: 'lavender', name: 'Lavender', category: 'perennials' },
      { id: 'peony', name: 'Peony', category: 'perennials' },
      { id: 'hydrangea', name: 'Hydrangea', category: 'perennials' },
      { id: 'iris', name: 'Iris', category: 'perennials' },
      { id: 'dahlia', name: 'Dahlia', category: 'perennials' },
      { id: 'chrysanthemum', name: 'Chrysanthemum', category: 'perennials' },
    ]
  },
  {
    key: 'bulbs',
    label: 'Bulbs',
    options: [
      { id: 'tulip', name: 'Tulip', category: 'bulbs' },
      { id: 'daffodil', name: 'Daffodil', category: 'bulbs' },
      { id: 'lily', name: 'Lily', category: 'bulbs' },
      { id: 'hyacinth', name: 'Hyacinth', category: 'bulbs' },
      { id: 'crocus', name: 'Crocus', category: 'bulbs' },
      { id: 'gladiolus', name: 'Gladiolus', category: 'bulbs' },
    ]
  },
  {
    key: 'wildflowers',
    label: 'Wildflowers',
    options: [
      { id: 'daisy', name: 'Daisy', category: 'wildflowers' },
      { id: 'poppy', name: 'Poppy', category: 'wildflowers' },
      { id: 'sunflower', name: 'Sunflower', category: 'wildflowers' },
      { id: 'cornflower', name: 'Cornflower', category: 'wildflowers' },
      { id: 'bluebell', name: 'Bluebell', category: 'wildflowers' },
      { id: 'foxglove', name: 'Foxglove', category: 'wildflowers' },
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

  const tabItems = flowerCategories.map((category) => {
    const count = getCountByCategory(category.key);
    return {
      key: category.key,
      label: `${category.label} ${count > 0 ? `(${count})` : ''}`,
      children: (
        <div className="flex p-4 flex-col items-start gap-4 flex-1 self-stretch">
          {category.options.map((flower) => {
            const isChecked = selectedFlowers.find(f => f.id === flower.id);
            return (
              <div key={flower.id}>
                <Checkbox
                  checked={!!isChecked}
                  onChange={() => handleCheckboxChange(flower)}
                >
                  {flower.name}
                </Checkbox>
              </div>
            );
          })}
        </div>
      )
    };
  });

  return (
    <div className="w-full max-w-3xl relative">
      <Button
        type={selectedFlowers.length > 0 ? 'primary' : 'default'}
        icon={<FilterOutlined />}
        onClick={handleToggle}
      >
        Filters {selectedFlowers.length > 0 && `(${selectedFlowers.length})`}
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-3 bg-white rounded-lg shadow-lg border border-gray-200 w-full z-10">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            tabPosition="left"
            items={tabItems}
            style={{ minHeight: 300 }}
          />

          {selectedFlowers.length > 0 && (
            <>
              <Divider style={{ margin: 0 }} />
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap gap-1 flex-1">
                    {selectedFlowers.map((flower) => (
                      <Tag
                        key={flower.id}
                        closable
                        onClose={() => handleRemoveTag(flower.id)}
                      >
                        {flower.name}
                      </Tag>
                    ))}
                  </div>
                  <Button
                    type="link"
                    onClick={handleClearAll}
                    style={{ padding: 0 }}
                  >
                    Clear all Filters
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
