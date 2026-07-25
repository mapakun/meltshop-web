export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&display=swap'
        }
      ]
    }
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    r2AccountId: process.env.R2_ACCOUNT_ID,
    r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,
    r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    r2BucketName: process.env.R2_BUCKET_NAME,
    adminId: process.env.ADMIN_ID,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET,
    public: {
      r2PublicUrl: process.env.R2_PUBLIC_URL,
    }
  }
})