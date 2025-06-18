import { Model } from "sequelize";
import type { UrlAttributes } from "../interfaces";

export class Url extends Model<UrlAttributes> implements UrlAttributes {
  declare id: number;
  declare longUrl: string;
  declare shortCode: string;
  declare expiresAt: Date;
}
