import { User } from "@/domain/models/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async insert(user: User) {
    this.users.push(user);
  }
}