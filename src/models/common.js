export default {
  state: {},
  reducers: {
    update(action, state) {
      return { ...state, ...action.payload }
    },
  },
}
