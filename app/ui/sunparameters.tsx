import { Swatch } from "./swatch";
import { ParamSection, ParamRow } from './parametersections';

export type Sun = {
    sunAngle?: string;
    pitch?: string | number;
    brightness?: number[];
    ambience?: number[];
  };

  export default function SunParams(s: Sun) {
    const { sunAngle, pitch, brightness, ambience } = s ?? {};
  
    return (
      <ParamSection title="">
        <>
            <ParamRow label="Sun Angle">{sunAngle}</ParamRow>
            <ParamRow label="Pitch">{pitch}</ParamRow>
            <ParamRow label="Brightness">
              {brightness && <Swatch rgb={brightness} />}
            </ParamRow>
            <ParamRow label="Ambient">
              {ambience && <Swatch rgb={ambience} />}
            </ParamRow>
          </>
      </ParamSection>
    );
  }