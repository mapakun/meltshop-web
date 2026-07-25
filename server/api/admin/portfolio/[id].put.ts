import { prisma } from '../../../utils/db'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody(event)

    return await prisma.mt_portfolio.update({
        where: { id },
        data: {
            characterName: body.characterName,
            workTitle: body.workTitle,
            description: body.description,
            imageUrl: body.imageUrl,
            order: body.order,
            published: body.published,
            updatedAt: new Date(),
        }
    })
})