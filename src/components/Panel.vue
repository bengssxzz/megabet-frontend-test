<script setup>

defineProps({
    class_bg: {
        type: String,
        default: 'bg-white'
    },
    title: {
        type: String
    }
})
</script>

<template>
    <div :class="`min-w-[400px] h-auto rounded-md p-9 flex flex-col items-center ${class_bg}`">
        <h1 class="text-4xl font-bold mb-8">{{ title }}</h1>
        <slot></slot>
    </div>
</template>