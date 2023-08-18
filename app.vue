<template>
  <NuxtPage />

  <footer>
    <a id="yandex" href="https://tech.yandex.com/predictor/">
      Powered by Yandex Predictor
    </a>
  </footer>
</template>

<style>
a#yandex {
  color: #fff;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
  padding: 4rem;
}

/* generate a custom modern scrollbar with the colors of picocss (blue, black) */

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}



</style>
