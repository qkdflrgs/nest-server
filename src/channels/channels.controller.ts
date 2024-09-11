import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatRequestDto } from 'src/dms/dto/chat.request.dto';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getAllChannels() {}

  @Post()
  createChannel() {}

  @Get(':name')
  getSpecificChannel() {}

  @Get(':name/chats')
  getChats(@Query('perPage') perPage, @Query('page') page, @Param() param) {
    console.log(perPage, page);
    console.log(param.id, param.url);
  }

  @Post(':name/chats')
  postChat(@Body() body: ChatRequestDto) {
    console.log(body.content);
  }

  @Get(':name/unread')
  getNumberOfUnreadChats() {}

  @Get(':name/members')
  getAllMembersOfChannel() {}

  @Post(':name/members')
  inviteMemberToChannel() {}
}
