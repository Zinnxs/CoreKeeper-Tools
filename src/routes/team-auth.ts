const TEAM_AUTH_KEY = 'ck_team_auth'

export function isTeamAuthenticated() {
  return window.localStorage.getItem(TEAM_AUTH_KEY) === '1'
}

export function setTeamAuthentication(value: boolean) {
  window.localStorage.setItem(TEAM_AUTH_KEY, value ? '1' : '0')
}
