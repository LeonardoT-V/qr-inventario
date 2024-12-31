export interface DataResponse {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  nombre: string;
  habilitado: boolean;
  descripcion: string;
  aula: string;
  condicion: string;
  createdAt: string;
  updatedAt: string;
  mantenimientos: Mantenimiento[];
  registrado: Registrado;
  carrera: Carrera;
  cambios: Cambio[];
  image: Image;
}

export interface Mantenimiento {
  id: number;
  createdAt: string;
  comentario: string;
  tipo: string;
  detalle: string;
  updatedAt: string;
  encargado: Registrado;
}

export interface Cambio {
  id: number;
  createdAt: string;
  tipo: string;
  comentario: null;
  prev_value: string;
  llave: string;
  new_value: string;
  updatedAt: string;
  responsable: Registrado;
}

export interface Registrado {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Carrera {
  id: number;
  habilitado: boolean;
  nombre: string;
  descripcion: null;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface Meta {}
