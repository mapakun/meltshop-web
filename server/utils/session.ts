import { randomUUID } from 'crypto'

// 토큰 → 만료시각(ms) 저장 (메모리)
const sessions = new Map<string, number>()

const MAX_AGE = 1000 * 60 * 60 * 8 // 8시간

export function createSession(): string {
    const token = randomUUID()
    sessions.set(token, Date.now() + MAX_AGE)
    return token
}

export function isValidSession(token: string | undefined): boolean {
    if (!token) return false

    const expiresAt = sessions.get(token)
    if (!expiresAt) return false

    // 만료됐으면 제거하고 무효 처리
    if (Date.now() > expiresAt) {
        sessions.delete(token)
        return false
    }
    return true
}

export function destroySession(token: string | undefined) {
    if (token) sessions.delete(token)
}