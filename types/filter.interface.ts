export interface FilterValueProps {
  active: boolean;
  value: number;
  label: string;
}

export interface FilterValueEvents {
  (e: 'active:update',
    value: number,
    active: boolean
  ): void;
}

export interface FilterSelectorProps {
  active: number[];
}

export interface FilterSelectorEvents {
  (e: 'active:update',
    value: number[]
  ): void;
}