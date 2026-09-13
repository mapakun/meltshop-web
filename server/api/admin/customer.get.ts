import { prisma } from '../../utils/db'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const query = getQuery(event)
    const page = Number(query.page) || 1
    const pageSize = 10
    const search = (query.search as string)?.trim() || ''

    const where = search
        ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { phone: { contains: search } },
            ]
        }
        : {}

    const [items, total] = await Promise.all([
        prisma.mt_customer.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.mt_customer.count({ where })
    ])

    return { items, total, page, totalPages: Math.ceil(total / pageSize) }
})