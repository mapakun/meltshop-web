import { createSession } from '../../utils/session'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { id, password } = await readBody(event)

    if (id !== config.adminId || password !== config.adminPassword) {
        throw createError({ statusCode: 401, statusMessage: '아이디 또는 비밀번호가 올바르지 않습니다.' })
    }

    const token = createSession()

    setCookie(event, 'admin_session', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 8,
        path: '/',
    })

    return { ok: true }
})