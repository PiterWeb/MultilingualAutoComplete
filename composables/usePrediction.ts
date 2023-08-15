import { ref } from "vue";

function appendPrediction(
    inputText: globalThis.Ref<string>,
    prediction: globalThis.Ref<string>
) {

    if (inputText.value.trim() === "") return;

    const words = inputText.value.split(" ");

    const lastWord = words.at(-1);

    if (lastWord && prediction.value.includes(lastWord)) {
        words.pop();
    }

    words.push(prediction.value);

    inputText.value = words.join(" ");
}

function appendOnCtrlKey(
    e: KeyboardEvent,
    inputText: globalThis.Ref<string>,
    prediction: globalThis.Ref<string>
) {

    if (e.ctrlKey) appendPrediction(inputText, prediction);
}

export default function usePrediction(
    placeholder: string = "Enter text to predict..."
) {
    const inputText = ref("");
    const prediction = ref("");

    onMounted(() => {
        document.addEventListener("keydown", (e) =>
            appendOnCtrlKey(e, inputText, prediction)
        );
    });

    onUnmounted(() => {
        document.removeEventListener("keydown", (e) =>
            appendOnCtrlKey(e, inputText, prediction)
        );
    });

    useDebounce(inputText, async (newVal: string) => {
        const { actualLang } = useLang();

        if (newVal.trim() === "") {
            prediction.value = "";
            return;
        }

        const { data } = await useFetch(
            `/api/predict?lang=${actualLang.value}&q=${newVal}`
        );
        if (data.value.text?.length > 0) prediction.value = data.value.text[0];
    });

    return {
        inputText,
        prediction,
        placeholder,
        appendPrediction: () => appendPrediction(inputText, prediction),
    };
}
