import { DataSource, Repository } from "typeorm";

import { UserEntity } from "../database/typeorm/entities/UserEntity";

import { UserRepository } from "@/domain/repositories/UserRepository";

export class TypeOrmUserRepository implements UserRepository{
    private respository: Repository<UserEntity>;

    constructor(dataSource: DataSource) {
        this.respository = dataSource.getRepository(UserEntity);
    }
    
    async findByEmail(email: string): Promise<UserEntity | null> {
        const userEntity = await this.respository.findOne({ where: { email } });

        if(!userEntity) {
            return null;
        }

        return userEntity;
    }
}