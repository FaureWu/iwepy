import wepy from 'wepy'

export function noop() {}

export async function checkAuthSetting(scopeCode) {
  const { authSetting } = await wepy.getSetting()

  return authSetting[`scope.${scopeCode}`]
}
