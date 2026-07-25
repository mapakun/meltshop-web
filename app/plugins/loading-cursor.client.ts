export default defineNuxtPlugin((nuxtApp) => {
    const html = () => document.documentElement

    // 페이지 전환 시작
    nuxtApp.hook('page:start', () => {
        html().classList.add('is-loading')
    })

    // 페이지 전환 완료
    nuxtApp.hook('page:finish', () => {
        html().classList.remove('is-loading')
    })

    // 라우팅 에러 시에도 해제
    nuxtApp.hook('vue:error', () => {
        html().classList.remove('is-loading')
    })
})