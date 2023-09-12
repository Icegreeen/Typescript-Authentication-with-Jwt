import { User } from "../entities/User";

// sobrescrevendo o dado user que não existe no express

declare global {
    namespace Express {
        export interface Request {
            user: Partial<User>
        }
    }
}