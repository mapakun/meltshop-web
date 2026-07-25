import { requireAdmin } from '../../utils/auth'

export default defineEventHandler((event) => {
    requireAdmin(event)
    return { ok: true }
})