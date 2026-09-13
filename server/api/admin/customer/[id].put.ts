import { prisma } from '../../../utils/db'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody(event)

    try {
        return await prisma.mt_customer.update({
            where: { id },
            data: {
                name: body.name,
                phone: body.phone,
                updatedAt: new Date(),
            }
        })
    } catch (e: any) {
        if (e.code === 'P2002') {
            throw createError({ statusCode: 409, statusMessage: '이미 등록된 핸드폰 번호입니다.' })
        }
        throw e
    }
})