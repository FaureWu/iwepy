import wepy from 'wepy'
import { checkAuthSetting } from '@/utils/util'

export const namespace = 'user'

export default {
  namespace,

  setup({ put }) {
    put({ type: 'getUserInfo' })
  },

  state: {
    userInfo: {},
    authorize: false,
  },

  effects: {
    async getUserInfo(action, { put }) {
      const canGetUserInfo = await checkAuthSetting('userInfo')
      if (canGetUserInfo) {
        const { userInfo } = await wepy.getUserInfo({
          lang: 'zh_CN',
        })
        put({
          type: 'update',
          payload: { userInfo: userInfo, authorize: canGetUserInfo },
        })
      } else {
        put({ type: 'update', payload: { authorize: canGetUserInfo } })
      }
    },
  },
}
