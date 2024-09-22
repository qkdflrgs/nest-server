import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

class MockUsersRepository {
  #data = [{ id: 1, email: 'qkdflrgs@litae.com' }];

  findOne({ where: { email } }) {
    const data = this.#data.find((v) => v.email === email);

    if (data) {
      return data;
    }

    return null;
  }
}
class MockWorkspaceMembersRepository {}
class MockChannelMembersRepository {}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUsersRepository,
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockWorkspaceMembersRepository,
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockChannelMembersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByEmail은 이메일을 통해 유저 정보를 받아온다', () => {
    expect(service.findByEmail('qkdflrgs@litae.com')).resolves.toStrictEqual({
      email: 'qkdflrgs@litae.com',
      id: 1,
    });
  });

  it('findByEmail은 유저를 찾지 못할 경우 null을 반환', () => {
    expect(service.findByEmail('0000@litae.com')).resolves.toBe(null);
  });
});
