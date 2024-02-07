import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { generateJwtToken } from 'src/utils/jwt';
import { Public } from 'src/auth/decorators/public';
import { UserRole } from './entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation('signUp')
  async signup(
    @Args('signUpInput') createUserInput: CreateUserInput,
    @Context() context: { res: Response },
  ) {
    try {
      const { res } = context;
      const user = await this.userService.findOne({
        email: createUserInput.email,
      });

      if (user) {
        throw new Error('User already exist');
      }

      const isUsernameExist = await this.userService.findOne({
        username: createUserInput.username,
      });

      if (isUsernameExist) {
        throw new Error('Username already exist');
      }

      const hashPassword = await hash(
        createUserInput.password,
        await genSalt(),
      );

      const payload = {
        name: createUserInput.name,
        username: createUserInput.username,
        email: createUserInput.email,
        password: hashPassword,
        role: createUserInput.role || UserRole.RETAIL_USER,
      };

      const createUser = await this.userService.create(payload);

      const jwtToken = await generateJwtToken({
        id: createUser.id,
        email: createUser.email,
      });

      res.cookie('access_token', jwtToken.token, {
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: 'localhost',
      });

      return {
        user: createUser,
        token: jwtToken.token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('res') res: Response,
  ) {
    try {
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new Error('User does not exist');
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const jwtToken = await generateJwtToken({
        id: user.id,
        email: user.email,
      });

      res.cookie('access_token', jwtToken.token, {
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: 'localhost',
      });

      return {
        user,
        token: jwtToken.token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }
}
