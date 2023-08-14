<script setup lang="ts">

const { inputText, prediction, placeholder } = usePrediction("Introduce texto para predecir...", "es")

</script>

<template>
    <input type="text" v-model="inputText" :placeholder="prediction" />

    <span v-if="prediction !== placeholder">
        {{ prediction }}
    </span>
</template>

<style scoped>
input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1.2rem;
}

input:focus {
    outline: none;
}

span {
    display: block;
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
}

input::placeholder {
    font-size: 1.2rem;
    font-weight: bold;
}


</style>