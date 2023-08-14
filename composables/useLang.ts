const defaultLang = "en";

export default function useLang () {

    const actualLang = useState<TLang>("lang", () => defaultLang);

    const setActualLang = (newLang: TLang) => {
        actualLang.value = newLang;
    }

    return {
        actualLang,
        setActualLang,
    }

}

