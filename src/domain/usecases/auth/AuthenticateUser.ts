import { UserNotFoundError } from "@/domain/errors/UserNotFoundError";
import { UserRepository } from "@/domain/src/domain/repositories/UserRepository";

export class AuthenticateUser {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UserNotFoundError();
        }
        return user;
    }
}