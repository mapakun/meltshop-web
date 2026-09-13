import { prisma } from '../utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    // 전체 조회 (히어로 배경 등에서 사용)
    if (query.all === '1' || query.all === 'true') {
        const items = await prisma.mt_portfolio.findMany({
            where: { published: true },
            orderBy: { order: 'desc' },
        })
        return { items, total: items.length, page: 1, totalPages: 1 }
    }

    // 페이지네이션 (갤러리용)
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