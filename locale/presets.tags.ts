import { PresetTags } from '~/types/preset-tags.enum';

export interface PresetTagsCategory {
  category: string;
  doNotHide?: boolean;
  values: PresetTag[];
}

export interface PresetTag {
  value: PresetTags;
  label: string;
}

export const PresetTagList = [
  // Категории
  {
    category: 'Раса',
    doNotHide: true,
    values: [
      {
        value: PresetTags.Nord,
        label: 'Норд'
      },
      {
        value: PresetTags.Imperial,
        label: 'Имперец'
      },
      {
        value: PresetTags.Breton,
        label: 'Бретон'
      },
      {
        value: PresetTags.Redguard,
        label: 'Редгард'
      },
      {
        value: PresetTags.DarkElf,
        label: 'Данмер'
      },
      {
        value: PresetTags.HighElf,
        label: 'Альтмер'
      },
      {
        value: PresetTags.WoodElf,
        label: 'Босмер'
      },
      {
        value: PresetTags.SnowElf,
        label: 'Фалмер'
      },
      {
        value: PresetTags.Orc,
        label: 'Орк'
      },
      {
        value: PresetTags.Khajiit,
        label: 'Каджит'
      },
      {
        value: PresetTags.Argonian,
        label: 'Аргонианин'
      }
    ]
  },

  // Пол
  {
    category: 'Пол',
    doNotHide: true,
    values: [
      {
        value: PresetTags.Female,
        label: 'Женский'
      },
      {
        value: PresetTags.Male,
        label: 'Мужской'
      }
    ]
  },

  // Дополнительно
  {
    category: 'Дополнительно',
    values: [
      {
        value: PresetTags.HighPoly,
        label: 'High Poly'
      },
      {
        value: PresetTags.Vanilla,
        label: 'Ванильный'
      },
      {
        value: PresetTags.AdditionalModsRequired,
        label: 'Доп. Моды'
      }
    ]
  }
] as PresetTagsCategory[];