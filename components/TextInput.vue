<script setup lang="ts">

const { inputText, placeholder, prediction } = usePrediction("Write some text to try the predictions...")

function appendPrediction() {

    const words = inputText.value.split(' ')

    const lastWord = words.at(-1)

    if (lastWord && prediction.value.includes(lastWord)) {
        words.pop()
    }

    words.push(prediction.value)

    inputText.value = words.join(' ')
}

function detectCtrlKey(e: KeyboardEvent) {
    if (e.ctrlKey) {
        appendPrediction()
    }
}

onMounted(() => {
    document.addEventListener('keydown', detectCtrlKey)
})

onUnmounted(() => {
    document.removeEventListener('keydown', detectCtrlKey)
})





</script>

<template>
    <textarea v-model="inputText" :placeholder="placeholder" spellcheck="true" />

    <span v-if="prediction !== placeholder">
        {{ prediction }}
    </span>
    <section>

        <button id="append" @click="appendPrediction">
            Auto-complete
            <kbd>Ctrl</kbd>
        </button>


    </section>
</template>

<style scoped>
span {
    display: block;
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
}

textarea {
    resize: vertical;
}

button#append {
    margin-left: auto;
    width: 25%;
}

@media (max-width: 768px) {
    button#append {
        width: 100%;
    }
}
</style>