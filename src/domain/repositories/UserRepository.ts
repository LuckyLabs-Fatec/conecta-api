import { User } from "@/domain/models/User";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
}