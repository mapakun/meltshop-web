import { prisma } from '../../../utils/db'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const id = Number(getRouterParam(event, 'id'))

    await prisma.mt_portfolio_image.delete({ where: { id } })

    return { ok: true }
})