<script setup lang="ts">

const { inputText, placeholder, prediction, appendPrediction } = usePrediction("Write some text to try the predictions...")

const { cachedWord, appendCachedWord } = useCachedWords(inputText)

const buttonsDisabled = computed(() => {
    return !prediction || !cachedWord || inputText.value.trim() === ''
})

</script>

<template>
    <textarea v-model="inputText" :placeholder="placeholder" spellcheck="true" />

    <article>

        <span class="prediction" v-if="prediction">
            Prediction:
            {{ prediction }}
        </span>

        <hr />

        <span class="prediction" v-if="cachedWord">
            Cached Word:
            {{ cachedWord }}
        </span>
    </article>

    <section id="buttons">

        <button class="append" :aria-busy="!prediction && !buttonsDisabled" :disabled="buttonsDisabled"
            @click="appendPrediction">
            Auto-complete
            <kbd>⇾</kbd>
        </button>

        <button class="append" :aria-busy="!cachedWord && !buttonsDisabled" :disabled="buttonsDisabled"
            @click="appendCachedWord">
            Cached Word
            <kbd>Ctrl</kbd> <span id="kbd">+</span> <kbd>*</kbd>
        </button>

    </section>
</template>

<style scoped>
kbd {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

article {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

textarea {
    resize: vertical;
    min-height: 25vh;
    position: relative;
    margin: 0 auto;
}

#buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 4rem;
    margin-bottom: 1rem;
}

.prediction {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    height: 2rem;
}

button.append {
    width: fit-content;
}

@media (max-width: 768px) {
    button.append {
        width: 100%;
    }

    kbd {
        display: none;
    }

    #kbd {
        display: none;
    }

    #buttons {
        gap: 1rem;
    }

    textarea {
        min-height: 18vh;
    }
}
</style>