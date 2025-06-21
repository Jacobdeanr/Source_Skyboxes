export interface SkyboxDownload {
  file: string;
  format: string;
  size?: string;
}

export interface SkyboxMeta {
    author: string;
    description?: string;
    publishDate: string;
    license: string;
    timeOfDay?: string;
    weatherCondition?: string;
    steamMaps?: { name: string; url: string }[];
    sunParameters?: {
      sunAngle: string;
      pitch: string;
      brightness: number[];
      ambience: number[];
    };
    fogParameters?: {
      primaryFogColor?: number[];
      secondaryFogColor?: number[];
    };
    fileSize?: string;
    archived?: boolean;
    downloads?: Record<'source' | 'exr' | string, SkyboxDownload>;
}

export type SkyboxIndex = Record<string, SkyboxMeta>;