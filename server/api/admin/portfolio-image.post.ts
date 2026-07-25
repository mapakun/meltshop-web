import { prisma } from '../../utils/db'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const body = await readBody(event)

    return await prisma.mt_portfolio_image.create({
        data: {
            portfolioId: body.portfolioId,
            imageUrl: body.imageUrl,
            order: body.order ?? 0,
        }
    })
})