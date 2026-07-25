import { prisma } from '../../utils/db'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const body = await readBody(event)

    // 1. 먼저 생성 (id 확보)
    const created = await prisma.mt_portfolio.create({
        data: {
            characterName: body.characterName,
            workTitle: body.workTitle,
            imageUrl: body.imageUrl ?? '',
            order: 0,
            published: body.published ?? true,
        }
    })

    // 2. order를 id와 동일하게 업데이트
    return await prisma.mt_portfolio.update({
        where: { id: created.id },
        data: { order: created.id }
    })
})