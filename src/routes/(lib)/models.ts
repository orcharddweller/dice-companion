import { nanoid } from "nanoid";
import { z } from "zod";

export const StanceSchema = z
  .enum(["d", "n", "a"])
  .transform((v) =>
    v === "d" ? "disadvantage" : v === "n" ? "neutral" : "advantage"
  );

export type Stance = z.infer<typeof StanceSchema>;

export const TargetSchema = z.coerce.number().int();

export type Target = z.infer<typeof TargetSchema>;

const IndexSchema = z.number().int().min(0);

export const BonusSchema = z
  .object({
    m: IndexSchema,
    r: IndexSchema,
  })
  .transform((v) => ({
    id: nanoid(),
    modifierId: v.m,
    reasonId: v.r,
  }));

export type Bonus = z.infer<typeof BonusSchema>;

export const BonusesSchema = z.array(BonusSchema);

export type Bonuses = z.infer<typeof BonusesSchema>;
