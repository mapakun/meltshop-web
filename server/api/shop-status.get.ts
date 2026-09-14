import { prisma } from '../utils/db'

export default defineEventHandler(async () => {
    const s = await prisma.mt_shop_status.findFirst({ orderBy: { id: 'asc' } })
    return { status: s?.status ?? 'OPEN', memo: s?.memo ?? '' }
})