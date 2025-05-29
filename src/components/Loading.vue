<script setup lang="ts">
const waitPhrase = [
  "The hamsters are running extra fast on their wheels",
  "Teaching robots how to count to 100",
  "Convincing the servers to wake up from their nap",
  "Our digital minions are fetching your data",
  "Untangling the cables in our server room",
  "Bribing the internet with cookies",
  "The wizards are casting a loading spell",
  "Feeding coffee to our tired processors",
  "Our data is stuck in traffic, please wait",
  "The penguins are sliding your files across the ice",
  "Negotiating with the cloud to release your information",
  "Our intern is pedaling the generator bike",
  "The unicorns are delivering your pixels",
  "Debugging the bugs that are debugging the bugs",
  "Our servers are doing yoga to become more flexible",
  "The digital librarian is organizing your data alphabetically",
  "Converting caffeine into code",
  "Our AI is having an existential crisis, please stand by",
  "The data gnomes are working overtime",
  "Asking the internet politely for your information",
].sort(() => Math.random() - 0.5)[0];
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white min-h-screen">
    <div class="border-b border-gray-200 pb-4 mb-6">
      <div class="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div class="h-4 bg-gray-100 rounded animate-pulse w-64"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3">
        <div class="flex flex-col items-center justify-center py-16">
          <div class="relative mb-6">
            <div
              class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"
            ></div>
          </div>

          <div class="text-center">
            <h2
              class="text-xl font-serif text-gray-700 mb-2 flex items-center justify-center gap-2"
            >
              {{ waitPhrase }}
              <div class="flex space-x-1">
                <div
                  class="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                  style="animation-delay: 0ms"
                ></div>
                <div
                  class="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                  style="animation-delay: 150ms"
                ></div>
                <div
                  class="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                  style="animation-delay: 300ms"
                ></div>
              </div>
            </h2>
          </div>
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
          </div>

          <div class="mt-8">
            <div class="h-6 bg-gray-300 rounded animate-pulse w-48 mb-4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            </div>
          </div>

          <div class="mt-8">
            <div class="h-6 bg-gray-300 rounded animate-pulse w-56 mb-4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div
          class="bg-gray-50 border border-gray-200 rounded p-4 animate-pulse"
        >
          <div class="h-5 bg-gray-300 rounded mb-3"></div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <div class="h-4 bg-gray-200 rounded w-16"></div>
              <div class="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div class="flex justify-between">
              <div class="h-4 bg-gray-200 rounded w-20"></div>
              <div class="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div class="flex justify-between">
              <div class="h-4 bg-gray-200 rounded w-24"></div>
              <div class="h-4 bg-gray-200 rounded w-18"></div>
            </div>
          </div>
        </div>

        <div
          class="bg-gray-50 border border-gray-200 rounded p-4 mt-4 animate-pulse"
        >
          <div class="h-4 bg-gray-300 rounded w-24 mx-auto mb-3"></div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-200 rounded w-32"></div>
            <div class="h-3 bg-gray-200 rounded w-28"></div>
            <div class="h-3 bg-gray-200 rounded w-36"></div>
            <div class="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 mt-8 pt-4 animate-pulse">
      <div class="h-3 bg-gray-200 rounded w-80 mb-2"></div>
      <div class="flex space-x-4">
        <div class="h-3 bg-gray-200 rounded w-24"></div>
        <div class="h-3 bg-gray-200 rounded w-32"></div>
        <div class="h-3 bg-gray-200 rounded w-28"></div>
      </div>
    </div>
  </div>
</template>
