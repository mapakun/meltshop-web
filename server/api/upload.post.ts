import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2Client } from '../utils/r2'
import { requireAdmin } from '../utils/auth'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const config = useRuntimeConfig()
    const formData = await readMultipartFormData(event)

    const file = formData?.find(f => f.name === 'file')
    const portfolioId = formData?.find(f => f.name === 'portfolioId')?.data.toString()

    if (!file || !portfolioId) {
        throw createError({ statusCode: 400, statusMessage: '파일과 portfolioId가 필요합니다.' })
    }

    const ext = file.filename?.split('.').pop() ?? 'jpg'
    const key = `meltshop/portfolio/${portfolioId}/${randomUUID()}.${ext}`

    await r2Client.send(new PutObjectCommand({
        Bucket: config.r2BucketName,
        Key: key,
        Body: file.data,
        ContentType: file.type,
    }))

    const url = `${config.public.r2PublicUrl}/${key}`

    return { url }
})