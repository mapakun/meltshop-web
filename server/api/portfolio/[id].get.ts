import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))

    const portfolio = await prisma.mt_portfolio.findFirst({
        where: { id, published: true },
        include: {
            mt_portfolio_image: {
                orderBy: { order: 'asc' }
            }
        }
    })

    if (!portfolio) {
        throw createError({ statusCode: 404, statusMessage: '작업물을 찾을 수 없습니다.' })
    }

    return portfolio
})