<script setup lang="ts">
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

const inputValue = ref("");
const showKey = ref(false);
const isSubmitting = ref(false);
const validationError = ref("");

const apiKeyModel = defineModel("apiKey", { default: "" });
const providerModel = defineModel("provider", { default: "claude" });

const savedApiKey = useLocalStorage("ai-api-key", apiKeyModel);
const savedProvider = useLocalStorage("ai-provider", providerModel);

inputValue.value = savedApiKey.value;
const selectedProvider = ref(savedProvider.value);

const CLAUDE_API_KEY_REGEX = /^sk-ant-api03-.+$/;
const GEMINI_API_KEY_REGEX = /^AIza[0-9A-Za-z\-_]{35}$/;

const hasValidKey = computed(() => {
  const regex =
    selectedProvider.value === "claude"
      ? CLAUDE_API_KEY_REGEX
      : GEMINI_API_KEY_REGEX;
  return regex.test(inputValue.value);
});

const validateApiKey = (): boolean => {
  validationError.value = "";

  if (!inputValue.value.trim()) {
    validationError.value = "API Key is required";
    return false;
  }

  if (!hasValidKey.value) {
    if (selectedProvider.value === "claude") {
      validationError.value =
        'Invalid API Key format. Must start with "sk-ant-api03-" and be at least 100 characters long.';
    } else {
      validationError.value =
        'Invalid API Key format. Must start with "AIza" followed by 35 characters.';
    }
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateApiKey()) {
    return;
  }

  isSubmitting.value = true;

  try {
    savedApiKey.value = inputValue.value.trim();
    savedProvider.value = selectedProvider.value;

    emit("apiKeySubmitted", inputValue.value.trim());

    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    validationError.value = "Error saving API Key";
  } finally {
    isSubmitting.value = false;
  }
};

const clearInput = () => {
  inputValue.value = "";
  validationError.value = "";
  showKey.value = false;
};

const emit = defineEmits<{
  apiKeySubmitted: [apiKey: string];
}>();
</script>

<template>
  <div
    class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200"
  >
    <div class="mb-6">
      <h2 class="text-2xl font-serif font-bold text-gray-900 mb-2">
        API Key Configuration
      </h2>
      <p class="text-gray-600">
        Select your AI provider and enter your API key to generate personalized
        articles.
      </p>
    </div>

    <div class="mb-4">
      <div
        v-if="hasValidKey"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
      >
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        API Key format is valid
      </div>
      <div
        v-else
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
      >
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Valid API Key required
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label
          for="provider"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          AI Provider *
        </label>
        <select
          id="provider"
          v-model="selectedProvider"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          required
        >
          <option value="claude">Claude (Anthropic)</option>
          <option value="gemini">Gemini (Google)</option>
        </select>
      </div>

      <div>
        <label
          for="apiKey"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          {{ selectedProvider === "claude" ? "Claude" : "Gemini" }} API Key *
        </label>
        <div class="relative">
          <input
            id="apiKey"
            v-model="inputValue"
            :type="showKey ? 'text' : 'password'"
            :placeholder="
              selectedProvider === 'claude' ? 'sk-ant-api03-...' : 'AIza...'
            "
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 pr-12"
            :class="{
              'border-green-500 bg-green-50': hasValidKey,
              'border-red-500 bg-red-50': inputValue && !hasValidKey,
            }"
          />
          <button
            @click="showKey = !showKey"
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Toggle password visibility"
          >
            <svg
              v-if="showKey"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m3.121-3.121l4.243-4.243M12 12l6.121 6.121"
              ></path>
            </svg>
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-500">
          Your API key is stored locally in your browser and never sent to our
          servers.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          :disabled="!hasValidKey || isSubmitting"
          class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <svg
            v-if="isSubmitting"
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isSubmitting ? "Saving..." : "Save & Continue" }}
        </button>

        <button
          @click="clearInput"
          v-if="inputValue"
          type="button"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Clear
        </button>
      </div>

      <div class="text-xs text-gray-400 text-center">
        Press Enter to save and continue
      </div>
    </form>

    <div
      v-if="validationError"
      class="mt-4 p-3 rounded-lg bg-red-100 border border-red-200"
    >
      <div class="flex items-start">
        <svg
          class="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div class="text-sm text-red-800">
          <p class="font-medium">{{ validationError }}</p>
        </div>
      </div>
    </div>

    <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-start">
        <svg
          class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div class="text-sm text-blue-800">
          <p class="font-medium mb-1">How to get your API Key?</p>
          <p v-if="selectedProvider === 'claude'">
            Visit
            <a
              href="https://console.anthropic.com/"
              target="_blank"
              class="underline hover:no-underline"
              >console.anthropic.com</a
            >, create an account and generate a new API key in the settings
            section.
          </p>
          <p v-else>
            Visit
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              class="underline hover:no-underline"
              >aistudio.google.com</a
            >, sign in with your Google account and create a new API key.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
