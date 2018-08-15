import request from '@/utils/request'

export const namespace = 'demo'

export default {
  namespace,

  state: {},

  effects: {
    async queryData(action, { put }) {
      const { data } = await request.get('/demo')
      put({ type: 'update', payload: data })
    },
    async queryHttpError() {
      await request.get('/http-error')
    },
    async queryError() {
      await request.get('/error')
    },
  },
}
