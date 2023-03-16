import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  #users: UserEntity[] = [];

  async save(userEntity: UserEntity) {
    this.#users.push(userEntity);
  }

  async getAll() {
    return this.#users;
  }

  async existsByEmail(email: string) {
    return this.#users.find((x) => x.email === email) !== undefined;
  }

  async update(id: string, updateUserDto: Partial<UserEntity>) {
    const savedUser = await this.#findByIdOrElseThrow(id);

    Object.entries(updateUserDto).forEach(([key, value]) => {
      if (key != 'id') savedUser[key] = value;
    });

    this.#users = this.#users.map((it) => (it.id == id ? savedUser : it));
  }

  async getByEmail(email: string) {
    const savedUser = this.#users.find((it) => it.email === email);

    if (!savedUser) {
      throw new NotFoundException(`User not found for email:'${email}'`);
    }

    return savedUser;
  }

  async getById(id: string) {
    return this.#findByIdOrElseThrow(id);
  }

  async delete(id: string) {
    this.#users = this.#users.filter((it) => it.id !== id);
  }

  async #findByIdOrElseThrow(id: string) {
    const savedUser = this.#users.find((it) => it.id === id);

    if (!savedUser) {
      throw new NotFoundException(`User not found for id:'${id}'`);
    }

    return savedUser;
  }
}
