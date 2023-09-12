import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User)

// fazer todas as operações no banco atraǘes da entidade user;