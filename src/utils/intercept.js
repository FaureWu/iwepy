export default function(context, wepy) {
  context.intercept('request', {
    config(options) {
      const { server } = wepy.$appConfig
      if (typeof options === 'string') {
        return `${server}${options}`
      }

      return {
        ...options,
        url: `${server}${options.url}`,
      }
    },
  })
}
