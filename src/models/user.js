import wepy from 'wepy'
export const namespace = 'user'

export default {
  namespace,

  setup({ put }) {
    put({ type: 'getUserInfo' })
  },

  state: {},

  effects: {
    async getUserInfo(action, { put }) {
      const { userInfo } = await wepy.getUserInfo({
        lang: 'zh_CN',
      })
      put({ type: 'save', payload: userInfo })
    },
  },

  reducers: {
    save({ payload }) {
      return payload
    },
  },
}
