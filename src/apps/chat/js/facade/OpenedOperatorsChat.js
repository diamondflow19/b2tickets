import OpenedChat from './OpenedChat'
import { messageService } from '../services'

export default class OpenedOperatorsChat extends OpenedChat {
  #eventName = 'operators-message'

  constructor(options) {
    const { channelName, user } = options

    super({ channelName, user })

    this.chat = {
      active: 0
    }
  }

  sendMessage(message) {
    const data = this.prepareMessageData(message)

    messageService.whisperMessage(this.channelName, this.#eventName, data)

    this.messages.record([data.message])
  }

  prepareMessageData(message) {
    const createdAt = (new Date()).getTime()

    return {
      message: {
        id: parseInt(this.user.id.toString() + createdAt),
        text: message,
        user: this.user,
        timestamp: (new Date()).getTime()
      }
    }
  }

  setActive(value) {
    this.chat.active = value
  }
}