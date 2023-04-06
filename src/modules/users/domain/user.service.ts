import { IUserRepository } from './user-repository.interface';
import { IUserService } from './user-service.interface';
import { User } from './user.model';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(user: User) {
    return await this.userRepository.create(user);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async update(id: number, user: User) {
    this.userRepository.update(id, user);
  }

  async remove(id: number) {
    this.userRepository.remove(id);
  }
}
