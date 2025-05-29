<script setup lang="ts">
import { computed, ref } from "vue";
import MarkdownIt from "markdown-it";
import MarkdownItTocDoneRight from "markdown-it-toc-done-right";
import MarkdownItAnchor from "markdown-it-anchor";

const props = defineProps<{ content: string; title: string }>();
const tableOfContent = ref(null as null | string);

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(MarkdownItAnchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: "§",
  })
  .use(MarkdownItTocDoneRight, {
    callback: (tocCode: string) => {
      tableOfContent.value = tocCode;
    },
  });

const compiledMarkdown = computed(() => {
  return md.render(props.content);
});
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white">
    <div class="border-b border-gray-200 pb-4 mb-6">
      <h1 class="text-3xl font-serif mb-2">{{ props.title }}</h1>
      <div class="text-sm text-gray-600">
        <span>Wiki-gen, the absurd encyclopedia</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3">
        <div
          v-html="compiledMarkdown"
          class="markdown-content prose prose-lg max-w-none prose-headings:font-serif prose-headings:border-b prose-headings:border-gray-200 prose-headings:pb-1 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded"
        ></div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-gray-50 border border-gray-200 rounded p-4 sticky top-4">
          <h3 class="font-semibold text-lg mb-3 border-b border-gray-300 pb-2">
            {{ props.title }}
          </h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="font-medium">Type:</span>
              <span>Article</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Author:</span>
              <span class="text-blue-600 underline">Claude</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Latest edit:</span>
              <span>{{ new Date().toLocaleDateString("es-ES") }}</span>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded p-4 mt-4">
          <h4 class="font-semibold mb-3 text-center">Content</h4>
          <div class="markdown-content" v-html="tableOfContent"></div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 mt-8 pt-4 text-sm text-gray-600">
      <p class="mt-2">
        <a href="#" class="text-blue-600 underline">Privacy policy</a> ·
        <a href="#" class="text-blue-600 underline ml-2">About Wiki-gen</a>
        ·
      </p>
    </div>
  </div>
</template>
