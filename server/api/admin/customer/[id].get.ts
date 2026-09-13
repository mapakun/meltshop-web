import { prisma } from '../../../utils/db'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const id = Number(getRouterParam(event, 'id'))

    const customer = await prisma.mt_customer.findUnique({
        where: { id },
        include: {
            mt_point_history: { orderBy: { createdAt: 'desc' } }
        }
    })

    if (!customer) {
        throw createError({ statusCode: 404, statusMessage: '고객을 찾을 수 없습니다.' })
    }

    return customer
})