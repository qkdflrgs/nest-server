import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatRequestDto } from './dto/chat.request.dto';

@Controller('api/workspaces/:url/dms')
export class DmsController {
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
