<template>
  <div class="flex-grow-1">

    <div
      v-for="(role, inx) in user.userRoles"
      :key="inx"
      class="d-flex align-center font-weight-bold primary--text my-2"
    >

      <v-icon color="primary">{{ getIconByRoleName(role.name) }}</v-icon>
      <span class="ma-1"> {{ $t('b2tickets.user.role.' + role.name) }} </span>
    </div>

    <div class="mb-4">
      <div class="d-flex">
        <span class="font-weight-bold">{{ $t('b2tickets.user.fields.email') }}</span>
        <span class="mx-1">
          <copy-label :text="user.email" />
        </span>
      </div>
      <div class="d-flex">
        <span class="font-weight-bold">ID</span>
        <span class="mx-1">
          <copy-label :text="user.id + ''" />
        </span>
      </div>
    </div>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab to="#tabs-account">{{ $t('menu.account') }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tabs-account">

        <accountCard ref="tabs-account" :user="user" />

      </v-tab-item>

      <v-tab-item value="tabs-information">
        <information-tab ref="tabs-information" :user="user"></information-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CopyLabel from '../../components/common/CopyLabel'
import AccountCard from '@/components/user/AccountCard'

export default {
  name: 'ClientInfo',
  components: {
    CopyLabel,
    AccountCard
  },
  data() {
    return {
      user: '',
      userEnabled: true,
      userRoles: true,
      tab: null,
      getIconFromRoleName: true,
      breadcrumbs: [
        {
          text: 'Users',
          to: '/users/list',
          exact: true
        },
        {
          text: 'Edit User'
        }
      ]
    }
  },
  computed: {
    ...mapGetters ({ getUser: 'auth/getUser' })
  },
  mounted() {
    this.user = this.getUser
    this.user.role = this.role
  },
  methods: {
    getIconByRoleName (role) {
      switch (role) {
      case 'operator':
        return 'mdi-account'

      case 'ADMIN':
        return 'mdi-security'

      default:
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>