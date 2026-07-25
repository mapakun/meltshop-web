import { prisma } from '../../utils/db'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const query = getQuery(event)
    const page = Number(query.page) || 1
    const pageSize = 6

    const [items, total] = await Promise.all([
        prisma.mt_portfolio.findMany({
            orderBy: { order: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.mt_portfolio.count()
    ])

    return {
        items,
        total,
        page,
        totalPages: Math.ceil(total / pageSize)
    }
})