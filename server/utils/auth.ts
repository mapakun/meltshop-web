import type { H3Event } from 'h3'
import { isValidSession } from './session'

export function requireAdmin(event: H3Event) {
    const token = getCookie(event, 'admin_session')

    if (!isValidSession(token)) {
        throw createError({ statusCode: 401, statusMessage: '로그인이 필요합니다.' })
    }
}