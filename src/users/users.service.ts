import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  getUser() {}

  async join(email: string, nickname: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      // 이미 존재하는 유저 에러
      throw new UnauthorizedException('이미 존재하는 유저입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
