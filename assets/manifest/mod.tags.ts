import { ModTags } from '~/types/mod-tags.enum';

export const ModTagList = [
  // Категории
  {
    category: 'Категории',
    doNotHide: true,
    values: [
      {
        value: ModTags.Graphics,
        label: 'Графика'
      },
      {
        value: ModTags.Utils,
        label: 'Утилиты'
      },
      {
        value: ModTags.Clothes,
        label: 'Одежда'
      },
      {
        value: ModTags.Optimization,
        label: 'Оптимизация'
      },
      {
        value: ModTags.Appearance,
        label: 'Внешность'
      },
      {
        value: ModTags.Interface,
        label: 'Интерфейс'
      }
    ]
  },
  // Графика
  {
    category: 'Графика',
    parent: ModTags.Graphics,
    values: [
      {
        value: ModTags.ENB,
        label: 'ENB'
      },
      {
        value: ModTags.ReShade,
        label: 'ReShade'
      },
      {
        value: ModTags.Textures,
        label: 'Текстуры'
      }
    ]
  },

  // Одежда
  {
    category: 'Одежда',
    parent: ModTags.Clothes,
    values: [
      {
        value: ModTags.LightClothes,
        label: 'Легкая'
      },
      {
        value: ModTags.HeavyClothes,
        label: 'Тяжелая'
      },
      {
        value: ModTags.Pack,
        label: 'Пак'
      },
      {
        value: ModTags.Standalone,
        label: 'Одинарные'
      }
    ]
  },

  // Внешность
  {
    category: 'Внешность',
    parent: ModTags.Appearance,
    values: [
      {
        value: ModTags.Character,
        label: 'Персонаж'
      },
      {
        value: ModTags.City,
        label: 'Город'
      }
    ]
  },

  // Интерфейс
  {
    category: 'Интерфейс',
    parent: ModTags.Interface,
    values: [
      {
        value: ModTags.HUD,
        label: 'HUD'
      },
      {
        value: ModTags.Information,
        label: 'Информация'
      },
      {
        value: ModTags.Fonts,
        label: 'Шрифты'
      }
    ]
  }
]