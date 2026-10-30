import { CreateWatchDto, UpdateWatchDto } from "../dto";

export interface UpdateWatchParams{
  id: number;
  updateWatchDto: UpdateWatchDto;
  images: Express.Multer.File[];
  folder: string;
}