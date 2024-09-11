import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'example@slack.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'litae',
    description: '닉네임',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: 'exlitae123',
    description: '비밀번호',
    required: true,
  })
  public password: string;
}
