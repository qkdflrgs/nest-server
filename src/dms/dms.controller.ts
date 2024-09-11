import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatRequestDto } from './dto/chat.request.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('DM')
@Controller('api/workspaces/:url/dms')
export class DmsController {
  @ApiParam({
    name: 'url',
    description: '워크스페이스 url',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: '사용자 id',
    required: true,
  })
  @ApiQuery({
    name: 'perPage',
    description: '한 번에 가져오는 개수',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    description: '불러올 페이지',
    required: true,
  })
  @Get(':id/chats')
  getChat(@Query() query, @Param('id') id, @Param('url') url) {
    console.log(query.perPage, query.page, id, url);
  }

  @Get(':id/unread')
  getNumberOfUnreadChats() {}

  @Post(':id/chats')
  postChat(@Body() body: ChatRequestDto) {
    console.log(body.content);
  }

  @Post(':id/images')
  postImages() {}
}
