export interface VegetableInterface {
  vegetable_manager_id: string;
  name: string;
  removeDate: string | null;
}

export interface AreaInterface {
  area_id: string;
  name: string;
  surface: number;
  created_at: string;
  updated_at: string;
  environnement: string;
  vegetables?: VegetableInterface[];
}

export interface SeedlingInterface {
  seedling_id: string;
  name: string;
  variety: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}
