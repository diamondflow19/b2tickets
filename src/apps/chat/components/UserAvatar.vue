<template>
  <v-avatar :size="size" class="elevation-1 grey lighten-3">
    <v-img v-if="user.userSettings && user.userSettings.avatar" :src="user.userSettings.avatar" />
    <span v-else class="text--primary">{{ initials }}</span>
  </v-avatar>
</template>

<script>
/*
|---------------------------------------------------------------------
| User Avatar Component
|---------------------------------------------------------------------
|
| User avatar for chat messages, display avatar if available or name
| initials
|
*/
export default {
  props: {
    // User to display
    user: {
      type: Object,
      default: () => {}
    },
    size: {
      type: Number,
      required: false,
      default: 40
    }
  },
  computed: {
    // Calculate user name initials
    initials() {
      if (!this.user) return ''

      const { name } = this.user

      if (!name) return ''

      const initials = name.match(/\b\w/g) || []

      return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    }
  }
}
</script>
