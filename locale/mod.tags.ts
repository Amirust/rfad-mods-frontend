import { ModTags } from '~/types/mod-tags.enum';

export interface ModTagsCategory {
  category: string;
  doNotHide?: boolean;
  values: ModTag[];
  parent?: ModTags;
}

export interface ModTag {
  value: ModTags;
  label: string;
}

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
        value: ModTags.Clothing,
        label: 'Одежда'
      },
      {
        value: ModTags.Environment,
        label: 'Окружение'
      },
      {
        value: ModTags.Characters,
        label: 'Персонажи'
      },
      {
        value: ModTags.Interface,
        label: 'Интерфейс'
      },
      {
        value: ModTags.Gameplay,
        label: 'Геймплей'
      },
      {
        value: ModTags.Audio,
        label: 'Звук'
      },
      {
        value: ModTags.QoL,
        label: 'Удобство'
      },
      {
        value: ModTags.Locations,
        label: 'Локации'
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
        value: ModTags.Reshade,
        label: 'ReShade'
      },
      {
        value: ModTags.GraphicsPack,
        label: 'Графпак'
      }
    ]
  },

  // Одежда
  {
    category: 'Одежда',
    parent: ModTags.Clothing,
    values: [
      {
        value: ModTags.Light,
        label: 'Лёгкая'
      },
      {
        value: ModTags.Heavy,
        label: 'Тяжёлая'
      },
      {
        value: ModTags.Pack,
        label: 'Пак'
      }
    ]
  },

  // Окружение
  {
    category: 'Окружение',
    parent: ModTags.Environment,
    values: [
      {
        value: ModTags.World,
        label: 'Мир'
      },
      {
        value: ModTags.City,
        label: 'Город'
      }
    ]
  },

  // Персонажи
  {
    category: 'Персонажи',
    parent: ModTags.Characters,
    values: [
      {
        value: ModTags.Appearance,
        label: 'Внешность'
      }
    ]
  },

  // Интерфейс
  {
    category: 'Интерфейс',
    parent: ModTags.Interface,
    values: [
      {
        value: ModTags.Extended,
        label: 'Расширение'
      },
      {
        value: ModTags.Fonts,
        label: 'Шрифты'
      },
      {
        value: ModTags.Reskin,
        label: 'Рескин'
      }
    ]
  },

  // Геймплей
  {
    category: 'Геймплей',
    parent: ModTags.Gameplay,
    values: [
      {
        value: ModTags.Animations,
        label: 'Анимации'
      }
    ]
  },

  // Звук
  {
    category: 'Звук',
    parent: ModTags.Audio,
    values: [
      {
        value: ModTags.Music,
        label: 'Музыка'
      },
      {
        value: ModTags.Voice,
        label: 'Голос'
      }
    ]
  },

  // Удобство
  {
    category: 'Удобство',
    parent: ModTags.QoL,
    values: []
  },

  // Локации
  {
    category: 'Локации',
    parent: ModTags.Locations,
    values: []
  }
] as ModTagsCategory[];