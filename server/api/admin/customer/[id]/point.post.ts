import { prisma } from '../../../../utils/db'
import { requireAdmin } from '../../../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody(event)
    const amount = Number(body.amount)
    const reason = body.reason?.trim() || null

    if (!amount || isNaN(amount)) {
        throw createError({ statusCode: 400, statusMessage: '변동 포인트를 입력해주세요.' })
    }

    return await prisma.$transaction(async (tx) => {
        const customer = await tx.mt_customer.findUnique({ where: { id } })
        if (!customer) {
            throw createError({ statusCode: 404, statusMessage: '고객을 찾을 수 없습니다.' })
        }

        const newBalance = customer.point + amount
        if (newBalance < 0) {
            throw createError({ statusCode: 400, statusMessage: '포인트가 부족합니다.' })
        }

        // 1) 잔액 갱신
        const updated = await tx.mt_customer.update({
            where: { id },
            data: { point: newBalance, updatedAt: new Date() }
        })

        // 2) 이력 기록 (증가/감소 모두)
        await tx.mt_point_history.create({
            data: { customerId: id, amount, reason, balance: newBalance }
        })

        return updated
    })
})