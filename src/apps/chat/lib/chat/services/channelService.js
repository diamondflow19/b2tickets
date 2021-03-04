import Echo from '@/plugins/echo'
import Chat from '../classes/Chat'

export default {
  unsubscribeChannel(chat) {
    if (!(chat instanceof Chat)) return

    Echo.leave('App.User.' + chat.channelName)
  },
  watchParticipants(chat) {
    Echo.join('App.User.' + chat.channelName)
      .here((users) => {
        chat.participants = users
      })
      .joining((user) => {
        if (!(chat.participants.some((us) => us.email === user.email))) chat.addParticipant(user)
      })
      .leaving((user) => {
        chat.participants.some((us) => {
          if (us.email === user.email) {
            chat.participants.splice(chat.participants.indexOf(us), 1)

            return true
          } else return false
        })
      })
  },
  unwatchParticipants(chat) {
    Echo.leave('App.User.' + chat.channelName)
  },
  subscribeChannel(chat) {
    if (!(chat instanceof Chat)) return

    Echo.private('App.User.' + chat.channelName)
      .listen('MessageSent', (event) => {
        console.log(event)
        chat.addMessage(event.message)
        chat.setTyping({
          user: event.message.user,
          message: event.message,
          typing: false
        })
      })
      .listenForWhisper('operators-message', (event) => {
        chat.addMessage(event.message)
        chat.setTyping({
          user: event.message.user,
          typing: false
        })
      })
      .listenForWhisper('typing', (data) => {
        const { typing } = data

        if (typing === undefined) data.typing = true

        chat.setTyping(data)
      })
  }
}