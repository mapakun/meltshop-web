import { prisma } from '../../utils/db'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const body = await readBody(event)

    if (!body.name || !body.phone) {
        throw createError({ statusCode: 400, statusMessage: '이름과 핸드폰 번호는 필수입니다.' })
    }

    try {
        return await prisma.mt_customer.create({
            data: {
                name: body.name,
                phone: body.phone,
                point: body.point ?? 0,
            }
        })
    } catch (e: any) {
        if (e.code === 'P2002') {
            throw createError({ statusCode: 409, statusMessage: '이미 등록된 핸드폰 번호입니다.' })
        }
        throw e
    }
})