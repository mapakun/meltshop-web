import { prisma } from '../../utils/db'

// 닉네임 마스킹: 홍길동 → 홍*동
function maskName(name: string) {
    if (name.length <= 1) return name
    if (name.length === 2) return name[0] + '*'
    return name[0] + '*'.repeat(name.length - 2) + name.slice(-1)
}

// 고객번호 마스킹: 앞2 + 뒤2만 노출
function maskCode(code: string) {
    if (code.length <= 2) return code
    if (code.length <= 4) return code[0] + '*'.repeat(code.length - 1)
    return code.slice(0, 2) + '*'.repeat(code.length - 4) + code.slice(-2)
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const name = body.name?.trim()
    const phone = body.phone?.trim()

    if (!name || !phone) {
        throw createError({ statusCode: 400, statusMessage: '닉네임과 고객번호를 입력해주세요.' })
    }

    const customer = await prisma.mt_customer.findFirst({
        where: { phone, name },
        include: {
            mt_point_history: { orderBy: { createdAt: 'desc' }, take: 20 }
        }
    })

    if (!customer) {
        throw createError({ statusCode: 404, statusMessage: '일치하는 고객 정보가 없습니다.' })
    }

    return {
        name: maskName(customer.name),
        phone: maskCode(customer.phone),
        point: customer.point,
        history: customer.mt_point_history.map(h => ({
            amount: h.amount,
            reason: h.reason,
            balance: h.balance,
            createdAt: h.createdAt,
        }))
    }
})