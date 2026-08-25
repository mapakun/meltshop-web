export default defineEventHandler((event) => {
    // 개발 환경에서는 검증 건너뜀
    if (process.env.NODE_ENV !== 'production') return

    const config = useRuntimeConfig()
    const guard = config.originGuard

    // 비밀값이 설정 안 됐으면 검증 안 함 (안전장치)
    if (!guard) return

    const headerValue = getHeader(event, 'x-origin-guard')

    if (headerValue !== guard) {
        throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }
})