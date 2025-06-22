import { Swatch } from "./swatch";
import { ParamSection, ParamRow } from './parametersections';

type Fog = { primaryFogColor?: number[]; secondaryFogColor?: number[] };

export default function FogParams(f: Fog) {
  const { primaryFogColor, secondaryFogColor } = f ?? {};

  return (
    <ParamSection title="">
        <>
          <ParamRow label="Primary Fog Color">
            {primaryFogColor && <Swatch rgb={primaryFogColor} />}
          </ParamRow>
          <ParamRow label="Secondary Fog Color">
            {secondaryFogColor && <Swatch rgb={secondaryFogColor} />}
          </ParamRow>
        </>
    </ParamSection>
  );
}