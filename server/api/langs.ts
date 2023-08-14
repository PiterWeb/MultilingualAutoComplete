export default defineEventHandler(async () => {

    const {apiKey} = useRuntimeConfig()

    const res = await fetch(`https://predictor.yandex.net/api/v1/predict.json/getLangs?key=${apiKey}`)

    return await res.json()

})