<script setup>
import Panel from '@/components/Panel.vue'
import CustomButton from '@/components/Button.vue'

import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();

const userStore = useUserStore();

const logout = () => {
    alert("Logging out!")
    router.push('/')
}

</script>

<template>
    <div class="bg-gray-900 h-screen w-screen flex justify-center items-center">
        <Panel title="HOME">
            <h1>
                HELLO <span class="font-bold">
                    {{ userStore.username }}</span>!!
            </h1>
            <p class="text-sm text-gray-500 italic">({{ userStore.userNumber }})</p>
            <CustomButton title="LOGOUT" :toggle="true" validButton="bg-red-200" :onClick="logout" />
        </Panel>
    </div>
</template>