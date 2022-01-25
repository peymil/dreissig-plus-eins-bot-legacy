import { getRepository } from "typeorm";
import ChannelEvent from "../entity/ChannelEvent";
class BasicEvent {
  private repo = getRepository(ChannelEvent);
  create(eventName: string, channelId: string) {
    const channelEvent = new ChannelEvent();
    channelEvent.channel_id = channelId;
    channelEvent.event_name = eventName;
    return channelEvent.save();
  }
  find(eventName: string, channelId: string) {
    return this.repo.findOne({
      channel_id: channelId,
      event_name: eventName,
    });
  }
  delete(eventName: string, channelId: string) {
    return this.repo.delete({
      channel_id: channelId,
      event_name: eventName,
    });
  }
}
export default new BasicEvent();
