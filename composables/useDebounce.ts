import { ref, watch } from "vue";

export default function useDebounce(watchingRef: globalThis.Ref<any>, callback: Function, time: number = 500) {

    const timeout = ref<NodeJS.Timeout | null>(null);

    watch(watchingRef, (newVal) => {

            if (timeout.value) {
                clearTimeout(timeout.value);
            }
        
            timeout.value = setTimeout(async () => {

                callback(newVal);

            }, time)

    })

}