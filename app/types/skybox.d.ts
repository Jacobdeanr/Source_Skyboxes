export interface SkyboxDownload {
  file: string;
  format: string;
  size?: string;
}

export interface SteamMap {
    name: string;
    url: string;
}

export interface SunParameters {
    sunAngle: string;
    pitch: string;
    brightness: number[];
    ambience: number[];
}

export interface FogParameters {
    primaryFogColor?: number[];
    secondaryFogColor?: number[];
}

export interface SkyboxMeta {
    author: string;
    description?: string;
    publishDate: string;
    license: string;
    timeOfDay?: string;
    weatherCondition?: string;
    steamMaps?: SteamMap[];
    sunParameters?: SunParameters;
    fogParameters?: FogParameters;
    fileSize?: string;
    archived?: boolean;
    downloads?: Record<'source' | 'exr' | string, SkyboxDownload>;
}

export type SkyboxIndex = Record<string, SkyboxMeta>;