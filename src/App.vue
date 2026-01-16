<script setup lang="ts">
import { onMounted, ref } from "vue";
import Article from "./components/Article.vue";
import Loading from "./components/Loading.vue";
import ApiKeyInput from "./components/ApiKeyInput.vue";
import { callClaudeAPI } from "./lib/claude";
import { callGeminiAPI } from "./lib/gemini";
import { whenever } from "@vueuse/core";

const apiKey = ref("");
const provider = ref("claude");
const articleTitle = decodeURIComponent(
  window.location.pathname.slice(1)
).replace(/_/g, " ");
const articleContent = ref(null as null | string);

const q = new URLSearchParams(window.location.search);
const language = q.get("language") ?? q.get("lang") ?? q.get("l") ?? undefined;

function handleAPIError(error: any) {
  if (
    error.message.includes("invalid x-api-key") ||
    error.message.includes("API_KEY_INVALID")
  ) {
    apiKey.value = "";
  }
  return null;
}

whenever(
  apiKey,
  async () => {
    if (articleTitle === "") {
      window.location.replace("Wikigen");
      return;
    }

    const apiCall = provider.value === "claude" ? callClaudeAPI : callGeminiAPI;
    articleContent.value = await apiCall(
      apiKey.value,
      articleTitle,
      language
    ).catch(handleAPIError);
  },
  { immediate: true }
);

onMounted(async () => {
  document.title = `${articleTitle} - ${document.title}`;
});
</script>

<template>
  <div>
    <ApiKeyInput
      v-show="!apiKey"
      v-model:api-key="apiKey"
      v-model:provider="provider"
    />

    <div v-show="apiKey">
      <Loading v-if="articleContent === null" />
      <Article v-else :title="articleTitle" :content="articleContent" />
    </div>
  </div>
</template>
