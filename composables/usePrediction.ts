import { ref, watch } from "vue";

type lang = "ru"| "en"|"pl"|"uk"|"de"|"fr"|"es"|"it"|"tr"

export default function usePrediction(placeholder: string = "Enter text to predict...", lang: lang = "en") {

    const inputText = ref("");
    const prediction = ref(placeholder);
    const timeout = ref<NodeJS.Timeout>();

    watch(inputText, (newVal) => {

        if (newVal.trim() === "") {
            prediction.value = placeholder;
            return
        };

        if (timeout.value) {
            clearTimeout(timeout.value);
        }

        timeout.value = setTimeout(async () => {
            const { data } = await useFetch(`/api/predict?lang=${lang}&q=${newVal}`);
            if (data.value.text?.length > 0)
                prediction.value = data.value.text[0];
            
            console.log(data.value.text);
        }, 500);
    });

    return {
        inputText,
        prediction,
        placeholder,
    };
}
