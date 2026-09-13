import { prisma } from '../../utils/db'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const body = await readBody(event)
    const status = ['OPEN', 'BUSY', 'CLOSED'].includes(body.status) ? body.status : 'OPEN'
    const memo = body.memo?.trim() || null

    return await prisma.mt_shop_status.upsert({
        where: { id: 1 },
        update: { status, memo, updatedAt: new Date() },
        create: { id: 1, status, memo },
    })
})