import { Injectable } from '@nestjs/common';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userModel.create({ ...createUserInput });
  }

  findOne(payload = {}, options = {}) {
    return this.userModel.findOne({
      where: payload,
      ...options,
    });
  }

  find(payload = {}, options = {}) {
    return this.userModel.findAll({
      where: payload,
      ...options,
    });
  }
}
