export default [{
  path: '',
  redirect: 'request'
},{
  path: 'request',
  name: 'apps-chat-request',
  component: () => import(/* webpackChunkName: "apps-chat-channel" */ '@/apps/chat/pages/ChatRequestPage.vue')
}, {
  path: 'channel/:id',
  name: 'apps-chat-channel',
  component: () => import(/* webpackChunkName: "apps-chat-channel" */ '@/apps/chat/pages/ChannelPage.vue')
},{
  path: 'channel/:id/create-ticket',
  name: 'apps-chat-channel-create-ticket',
  redirect: 'channel/:id'
}]
