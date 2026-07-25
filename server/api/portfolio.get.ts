import { prisma } from '../utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const pageSize = 6

    const [items, total] = await Promise.all([
        prisma.mt_portfolio.findMany({
            where: { published: true },
            orderBy: { order: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.mt_portfolio.count({ where: { published: true } })
    ])

    return {
        items,
        total,
        page,
        totalPages: Math.ceil(total / pageSize)
    }
})