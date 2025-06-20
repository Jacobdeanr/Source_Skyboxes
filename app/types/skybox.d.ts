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
}

export type SkyboxIndex = Record<string, SkyboxMeta>;