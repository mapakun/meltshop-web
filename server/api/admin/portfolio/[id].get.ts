import { prisma } from '../../../utils/db'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const id = Number(getRouterParam(event, 'id'))

    return await prisma.mt_portfolio.findUnique({
        where: { id },
        include: {
            mt_portfolio_image: { orderBy: { order: 'asc' } }
        }
    })
})