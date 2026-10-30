import { CreateWatchDto } from "../dto";

export interface CreateWatchParams{
  createWatchDto: CreateWatchDto;
  images: Express.Multer.File[];
  folder: string;
}