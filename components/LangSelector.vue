<script setup lang="ts">

import capitalizeWord from '@/utils/capitalize'

const langs = ref<string[]>([])

const { data } = await useFetch('/api/langs')
langs.value = data.value

const { actualLang, setActualLang } = useLang()

const languagesNames = computed(() => {
    return new Intl.DisplayNames(actualLang.value, { type: 'language' })
})

const langSelected = computed({
    get: () => actualLang.value,
    set: (value) => setActualLang(value)
})

</script>

<template>
    <label for="langs">Language</label>
    <select id="langs" v-model="langSelected">
        <option v-if="langs !== null" v-for="lang, i in langs" :value="lang" :selected="actualLang === lang">
            {{ capitalizeWord(languagesNames.of(lang)!) }}
        </option>
        <option v-else>Loading...</option>
    </select>
</template>