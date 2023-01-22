import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthRegisterDto) {
    const userExist: User = await this.getUserByEmail(dto.email);

    if (userExist) {
      throw new HttpException('Credentials taken', HttpStatus.CONFLICT);
    }
    const password: string = await argon.hash(dto.password);

    const user: User = await this.prisma.user.create({
      data: {
        ...dto,
        password,
      },
    });

    delete user.password;

    return { user };
  }

  async login(dto: AuthLoginDto) {
    const user: User = await this.getUserByEmail(dto.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const passwordCorrect = await argon.verify(user.password, dto.password);

    if (!passwordCorrect) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    }

    return this.signToken(user.id, user.email);
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const options = {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    };
    const token = await this.jwt.signAsync(payload, options);
    return { access_token: token };
  }
}
