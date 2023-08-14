export default defineEventHandler(async event => {

    const {apiKey} = useRuntimeConfig()

    const query = getQuery(event)

    const res = await fetch(`https://predictor.yandex.net/api/v1/predict.json/complete?key=${apiKey}&lang=${query.lang}&q=${query.q}`)

    return await res.json()

})