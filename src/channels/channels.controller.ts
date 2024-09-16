import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatRequestDto } from 'src/dms/dto/chat.request.dto';
import { ChannelsService } from './channels.service';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('CHANNEL')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get()
  getAllChannels(@Param('url') url: string, @User() user) {
    return this.channelsService.getWorkspaceChannels(url, user.id);
  }

  @Post()
  createChannel() {}

  @Get(':name')
  getSpecificChannel() {}

  @Get(':name/chats')
  getChats(@Query('perPage') perPage, @Query('page') page, @Param() param) {
    console.log(perPage, page);
    console.log(param.id, param.url);

    return this.channelsService.getWorkspaceChannelChats(
      param.url,
      param.name,
      perPage,
      page,
    );
  }

  @Post(':name/chats')
  postChat(@Body() body: ChatRequestDto) {
    console.log(body.content);
  }

  @Post(':name/images')
  postImages(@Body() body: ChatRequestDto) {
    console.log(body.content);
  }

  @Get(':name/unread')
  getUnreadMessages(
    @Param('url') url: string,
    @Param('name') name: string,
    @Query('after') after: number,
  ) {
    return this.channelsService.getChannelUnreadCount(url, name, after);
  }

  @Get(':name/members')
  getAllMembersOfChannel(
    @Param('url') url: string,
    @Param('name') name: string,
  ) {
    return this.channelsService.getWorkspaceChannelMembers(url, name);
  }

  @Post(':name/members')
  inviteMemberToChannel() {}
}
