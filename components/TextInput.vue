<script setup lang="ts">

const { inputText, placeholder, prediction, appendPrediction } = usePrediction("Write some text to try the predictions...")

useCachedWords(inputText, prediction)

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
    min-height: 35vh;
}

button#append {
    margin-left: auto;
    width: 25%;
}

@media (max-width: 768px) {
    button#append {
        width: 100%;
    }

    textarea {
        min-height: 18vh;
    }
}
</style>