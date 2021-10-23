import { ChatroomDto, MessageDto } from 'src/app/shared/client';

export class MessageListModel {
  chatRoom?: ChatroomDto;
  messages?: MessageDto[];
}
