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
    key: 'biennials',
    label: 'Biennials',
    options: [
      { id: 'foxglove-bi', name: 'Foxglove', category: 'biennials' },
      { id: 'hollyhock', name: 'Hollyhock', category: 'biennials' },
      { id: 'sweet-william', name: 'Sweet William', category: 'biennials' },
      { id: 'canterbury-bells', name: 'Canterbury Bells', category: 'biennials' },
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
  },
  {
    key: 'spring',
    label: 'Spring Flowers',
    options: [
      { id: 'tulip-spring', name: 'Tulip', category: 'spring' },
      { id: 'daffodil-spring', name: 'Daffodil', category: 'spring' },
      { id: 'hyacinth-spring', name: 'Hyacinth', category: 'spring' },
      { id: 'cherry-blossom', name: 'Cherry Blossom', category: 'spring' },
      { id: 'crocus-spring', name: 'Crocus', category: 'spring' },
    ]
  },
  {
    key: 'summer',
    label: 'Summer Flowers',
    options: [
      { id: 'sunflower-summer', name: 'Sunflower', category: 'summer' },
      { id: 'rose-summer', name: 'Rose', category: 'summer' },
      { id: 'lily-summer', name: 'Lily', category: 'summer' },
      { id: 'dahlia-summer', name: 'Dahlia', category: 'summer' },
      { id: 'zinnia-summer', name: 'Zinnia', category: 'summer' },
    ]
  },
  {
    key: 'fall',
    label: 'Fall Flowers',
    options: [
      { id: 'chrysanthemum-fall', name: 'Chrysanthemum', category: 'fall' },
      { id: 'aster-fall', name: 'Aster', category: 'fall' },
      { id: 'dahlia-fall', name: 'Dahlia', category: 'fall' },
      { id: 'sedum-fall', name: 'Sedum', category: 'fall' },
    ]
  },
  {
    key: 'winter',
    label: 'Winter Flowers',
    options: [
      { id: 'hellebore', name: 'Hellebore', category: 'winter' },
      { id: 'camellia', name: 'Camellia', category: 'winter' },
      { id: 'paperwhite', name: 'Paperwhite', category: 'winter' },
      { id: 'snowdrop', name: 'Snowdrop', category: 'winter' },
    ]
  },
  {
    key: 'shrubs',
    label: 'Shrubs with Flowers',
    options: [
      { id: 'rose-shrub', name: 'Rose', category: 'shrubs' },
      { id: 'hydrangea-shrub', name: 'Hydrangea', category: 'shrubs' },
      { id: 'azalea', name: 'Azalea', category: 'shrubs' },
      { id: 'lilac', name: 'Lilac', category: 'shrubs' },
      { id: 'rhododendron', name: 'Rhododendron', category: 'shrubs' },
    ]
  },
  {
    key: 'climbers',
    label: 'Climbers & Vines',
    options: [
      { id: 'wisteria', name: 'Wisteria', category: 'climbers' },
      { id: 'clematis', name: 'Clematis', category: 'climbers' },
      { id: 'morning-glory', name: 'Morning Glory', category: 'climbers' },
      { id: 'honeysuckle', name: 'Honeysuckle', category: 'climbers' },
      { id: 'climbing-rose', name: 'Climbing Rose', category: 'climbers' },
    ]
  },
  {
    key: 'cut-flowers',
    label: 'Cut Flowers',
    options: [
      { id: 'rose-cut', name: 'Rose', category: 'cut-flowers' },
      { id: 'tulip-cut', name: 'Tulip', category: 'cut-flowers' },
      { id: 'lily-cut', name: 'Lily', category: 'cut-flowers' },
      { id: 'alstroemeria', name: 'Alstroemeria', category: 'cut-flowers' },
      { id: 'carnation', name: 'Carnation', category: 'cut-flowers' },
    ]
  },
  {
    key: 'dried',
    label: 'Dried Flowers',
    options: [
      { id: 'statice', name: 'Statice', category: 'dried' },
      { id: 'strawflower', name: 'Strawflower', category: 'dried' },
      { id: 'baby-breath', name: "Baby's Breath", category: 'dried' },
      { id: 'hydrangea-dried', name: 'Hydrangea', category: 'dried' },
      { id: 'lavender-dried', name: 'Lavender', category: 'dried' },
    ]
  },
  {
    key: 'edible',
    label: 'Edible Flowers',
    options: [
      { id: 'nasturtium', name: 'Nasturtium', category: 'edible' },
      { id: 'pansy-edible', name: 'Pansy', category: 'edible' },
      { id: 'violet', name: 'Violet', category: 'edible' },
      { id: 'calendula', name: 'Calendula', category: 'edible' },
      { id: 'squash-blossom', name: 'Squash Blossom', category: 'edible' },
    ]
  },
  {
    key: 'fragrant',
    label: 'Fragrant Flowers',
    options: [
      { id: 'jasmine-fragrant', name: 'Jasmine', category: 'fragrant' },
      { id: 'gardenia', name: 'Gardenia', category: 'fragrant' },
      { id: 'honeysuckle-fragrant', name: 'Honeysuckle', category: 'fragrant' },
      { id: 'lilac-fragrant', name: 'Lilac', category: 'fragrant' },
      { id: 'tuberose', name: 'Tuberose', category: 'fragrant' },
    ]
  },
  {
    key: 'sun-loving',
    label: 'Sun-Loving',
    options: [
      { id: 'rose-sun', name: 'Rose', category: 'sun-loving' },
      { id: 'sunflower-sun', name: 'Sunflower', category: 'sun-loving' },
      { id: 'lavender-sun', name: 'Lavender', category: 'sun-loving' },
      { id: 'marigold-sun', name: 'Marigold', category: 'sun-loving' },
      { id: 'geranium', name: 'Geranium', category: 'sun-loving' },
    ]
  },
  {
    key: 'shade-loving',
    label: 'Shade-Loving',
    options: [
      { id: 'impatiens-shade', name: 'Impatiens', category: 'shade-loving' },
      { id: 'begonia-shade', name: 'Begonia', category: 'shade-loving' },
      { id: 'hosta-shade', name: 'Hosta', category: 'shade-loving' },
      { id: 'astilbe', name: 'Astilbe', category: 'shade-loving' },
      { id: 'bleeding-heart', name: 'Bleeding Heart', category: 'shade-loving' },
    ]
  },
  {
    key: 'tropical',
    label: 'Tropical Flowers',
    options: [
      { id: 'hibiscus-tropical', name: 'Hibiscus', category: 'tropical' },
      { id: 'bird-of-paradise', name: 'Bird of Paradise', category: 'tropical' },
      { id: 'plumeria', name: 'Plumeria', category: 'tropical' },
      { id: 'orchid', name: 'Orchid', category: 'tropical' },
      { id: 'anthurium', name: 'Anthurium', category: 'tropical' },
    ]
  },
  {
    key: 'white',
    label: 'White & Cream',
    options: [
      { id: 'rose-white', name: 'White Rose', category: 'white' },
      { id: 'lily-white', name: 'White Lily', category: 'white' },
      { id: 'ranunculus-white', name: 'White Ranunculus', category: 'white' },
      { id: 'hydrangea-white', name: 'White Hydrangea', category: 'white' },
      { id: 'gardenia-white', name: 'Gardenia', category: 'white' },
    ]
  },
  {
    key: 'pink',
    label: 'Pink',
    options: [
      { id: 'peony-pink', name: 'Pink Peony', category: 'pink' },
      { id: 'carnation-pink', name: 'Pink Carnation', category: 'pink' },
      { id: 'gerbera-pink', name: 'Pink Gerbera', category: 'pink' },
      { id: 'cherry-blossom-pink', name: 'Cherry Blossom', category: 'pink' },
      { id: 'rose-pink', name: 'Pink Rose', category: 'pink' },
    ]
  },
  {
    key: 'red',
    label: 'Red',
    options: [
      { id: 'rose-red', name: 'Red Rose', category: 'red' },
      { id: 'dahlia-red', name: 'Red Dahlia', category: 'red' },
      { id: 'tulip-red', name: 'Red Tulip', category: 'red' },
      { id: 'poppy-red', name: 'Red Poppy', category: 'red' },
      { id: 'amaryllis-red', name: 'Red Amaryllis', category: 'red' },
    ]
  },
  {
    key: 'yellow-orange',
    label: 'Yellow & Orange',
    options: [
      { id: 'marigold-yellow', name: 'Marigold', category: 'yellow-orange' },
      { id: 'sunflower-yellow', name: 'Sunflower', category: 'yellow-orange' },
      { id: 'daffodil-yellow', name: 'Daffodil', category: 'yellow-orange' },
      { id: 'chrysanthemum-yellow', name: 'Chrysanthemum', category: 'yellow-orange' },
      { id: 'calendula-orange', name: 'Calendula', category: 'yellow-orange' },
    ]
  },
  {
    key: 'purple-blue',
    label: 'Purple & Blue',
    options: [
      { id: 'lavender-purple', name: 'Lavender', category: 'purple-blue' },
      { id: 'iris-purple', name: 'Iris', category: 'purple-blue' },
      { id: 'delphinium-blue', name: 'Delphinium', category: 'purple-blue' },
      { id: 'hydrangea-blue', name: 'Blue Hydrangea', category: 'purple-blue' },
      { id: 'cornflower-blue', name: 'Cornflower', category: 'purple-blue' },
    ]
  },
  {
    key: 'herbaceous',
    label: 'Herbaceous',
    options: [
      { id: 'daisy-herb', name: 'Daisy', category: 'herbaceous' },
      { id: 'poppy-herb', name: 'Poppy', category: 'herbaceous' },
      { id: 'pansy-herb', name: 'Pansy', category: 'herbaceous' },
      { id: 'petunia-herb', name: 'Petunia', category: 'herbaceous' },
      { id: 'zinnia-herb', name: 'Zinnia', category: 'herbaceous' },
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
        <div className="flex px-4 pb-4 flex-col items-start gap-4 flex-1 self-stretch overflow-y-auto" style={{ maxHeight: 280, paddingTop: '1.5rem' }}>
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
        type="default"
        icon={<FilterOutlined />}
        onClick={handleToggle}
        style={selectedFlowers.length > 0 ? {
          backgroundColor: 'white',
          borderColor: '#1677ff',
          color: '#1677ff'
        } : {}}
      >
        Filters {selectedFlowers.length > 0 && `(${selectedFlowers.length})`}
      </Button>

      {isOpen && (
        <div
          className="absolute top-full mt-3 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
          style={{ width: 440, paddingBottom: selectedFlowers.length === 0 ? '1rem' : 0 }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            tabPosition="left"
            items={tabItems}
            style={{ height: 280, maxHeight: 280 }}
          />

          {selectedFlowers.length > 0 && (
            <>
              <Divider style={{ margin: 0 }} />
              <div className="px-4 pt-4 pb-2">
                <div className="flex flex-wrap gap-1 mb-3">
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
                <div className="flex justify-end">
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
