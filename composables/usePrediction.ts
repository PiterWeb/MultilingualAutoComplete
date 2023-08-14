import { ref } from "vue";

export default function usePrediction(placeholder: string = "Enter text to predict...") {

    const inputText = ref("");
    const prediction = ref(placeholder);
    
    useDebounce(inputText, async (newVal: string) => {
        const { actualLang } = useLang();

        if (newVal.trim() === "") {
            prediction.value = placeholder;
            return
        };

        const { data } = await useFetch(`/api/predict?lang=${actualLang.value}&q=${newVal}`);
        if (data.value.text?.length > 0)
            prediction.value = data.value.text[0];
    
    })

    return {
        inputText,
        prediction,
        placeholder,
    };
}
