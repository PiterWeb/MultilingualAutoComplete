import { appendPrediction } from "./usePrediction";
import { WatchStopHandle } from "vue";

function useLoadCachedWords(
    cachedWordsByLanguage: TLangMap,
    actualLang: globalThis.Ref<TLang>
) {

    const cachedWords = localStorage.getItem(actualLang.value);

    if (!cachedWords) return;

    cachedWordsByLanguage.set(actualLang.value, JSON.parse(cachedWords));

    const words = cachedWordsByLanguage.get(actualLang.value)!;

    return words;
}

function appendOnCtrlPlusAsterisk(
    e: KeyboardEvent,
    inputText: globalThis.Ref<string>,
    prediction: globalThis.Ref<string>
) {
    if (e.key === "*" && e.ctrlKey) appendPrediction(inputText, prediction);
}

export default function useCachedWords(inputRef: globalThis.Ref<string>) {
    const cachedWordsByLanguage: TLangMap = new Map();
    const cachedWord = ref("");

    let watchStopHandler: WatchStopHandle;

    onMounted(() => {
        document.addEventListener("keydown", (e) =>
            appendOnCtrlPlusAsterisk(e, inputRef, cachedWord)
        );

        watchStopHandler = watchEffect(() => {

            if (inputRef.value.trim() === "") return;

            if (inputRef.value.at(-1) !== " ") return;

            console.log(inputRef.value);

            const { actualLang } = useLang();

            console.log(actualLang.value, "actualLang");

            const cachedWords = useLoadCachedWords(
                cachedWordsByLanguage,
                actualLang
            );

            console.log(cachedWords, "cachedWords");

        
            const words = inputRef.value.split(" ");

            console.log(words, "words");

            const lastWord = words.at(-2);

            if (!lastWord) return;

            console.log(lastWord, "lastWord");

            if (!cachedWords) {
                cachedWordsByLanguage.set(actualLang.value, [lastWord]);
                localStorage.setItem(actualLang.value, JSON.stringify([lastWord]))
                return;
            }

            if (!cachedWords.includes(lastWord)) {
                cachedWords.push(lastWord);
                cachedWordsByLanguage.set(
                    actualLang.value,
                    cachedWords
                );
                localStorage.setItem(actualLang.value, JSON.stringify(cachedWords))   
            }

        })

    });

    onUnmounted(() => {
        document.removeEventListener("keydown", (e) =>
            appendOnCtrlPlusAsterisk(e, inputRef, cachedWord)
        );

        watchStopHandler();
    });

    useDebounce(inputRef, async (newVal: string) => {
        const { actualLang } = useLang();

        if (newVal.trim() === "") {
            cachedWord.value = "";
            return;
        }

        const lastWord = newVal.split(" ").at(-1);

        if (!lastWord) return;

        const validWords = useLoadCachedWords(
            cachedWordsByLanguage,
            actualLang
        )?.filter((word) => word.includes(lastWord));

        console.log(validWords, "validWords");

        if (!validWords || validWords?.length < 1) {
            cachedWord.value = "";
            return;
        }

        cachedWord.value = validWords[0];
    });

    return {
        cachedWord,
        appendCachedWord: () => appendPrediction(inputRef, cachedWord),
    };
}
