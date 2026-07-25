import { destroySession } from '../../utils/session'

export default defineEventHandler((event) => {
    const token = getCookie(event, 'admin_session')
    destroySession(token)

    deleteCookie(event, 'admin_session', { path: '/' })
    return { ok: true }
})