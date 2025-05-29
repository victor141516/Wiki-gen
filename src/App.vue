<script setup lang="ts">
import { onMounted, ref } from "vue";
import Article from "./components/Article.vue";
import Loading from "./components/Loading.vue";
import ApiKeyInput from "./components/ApiKeyInput.vue";
import { callClaudeAPI } from "./lib/claude";
import { whenever } from "@vueuse/core";

const apiKey = ref("");
const articleTitle = decodeURIComponent(
  window.location.pathname.slice(1)
).replace(/_/g, " ");
const articleContent = ref(null as null | string);

function handleClaudeError(error: any) {
  if (error.message.includes("invalid x-api-key")) {
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

    articleContent.value = await callClaudeAPI(
      apiKey.value,
      articleTitle
    ).catch(handleClaudeError);
  },
  { immediate: true }
);

onMounted(async () => {
  document.title = `${articleTitle} - ${document.title}`;
});
</script>

<template>
  <div>
    <ApiKeyInput v-show="!apiKey" v-model:api-key="apiKey" />

    <div v-show="apiKey">
      <Loading v-if="articleContent === null" />
      <Article v-else :title="articleTitle" :content="articleContent" />
    </div>
  </div>
</template>
