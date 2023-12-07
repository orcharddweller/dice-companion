import type { Bonuses, Stance, Target } from "./models";
import lzString from "lz-string";

export const zipTarget = (target: Target) => target.toString();

export const zipStance = (stance: Stance) =>
  stance === "neutral" ? "n" : stance === "advantage" ? "a" : "d";

export const zipBonuses = (bonuses: Bonuses) =>
  lzString.compressToEncodedURIComponent(
    JSON.stringify(
      bonuses.map((bonus) => ({
        m: bonus.modifierId,
        r: bonus.reasonId,
      }))
    )
  );
