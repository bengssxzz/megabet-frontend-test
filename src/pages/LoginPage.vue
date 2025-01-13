<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import CryptoJS from "crypto-js";

import { useUserStore } from '@/stores/userStore';
import Panel from '@/components/Panel.vue';
import CustomButton from '@/components/Button.vue'

const userStore = useUserStore();
const router = useRouter();
const buttonToggle = ref(false);
const username = ref('');
const password = ref('');

const validInput = () => {
    buttonToggle.value = username.value !== '' && password.value !== '';
}

const validEnterLogin = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/users?username=${username.value}`);
        if (response.data.length > 0) {
            const user = response.data[0];
            const hashedPassword = CryptoJS.SHA1(password.value).toString(CryptoJS.enc.Base64);

            if (user.password === hashedPassword) {
                userStore.setUser(user.username, user.phone)
                router.push('/home');
            } else {
                alert('Incorrect password.');
            }
        } else {
            alert('Incorrect!');
        }
    } catch (error) {
        console.error('Error checking user:', error);
    } finally {
        username.value = '';
        password.value = '';
    }
}

</script>

<template>
    <div class="bg-gray-900 h-screen w-screen flex justify-center items-center">
        <Panel title="LOGIN">
            <form @submit.prevent="validEnterLogin"
                class="h-full w-full flex flex-col justify-center items-center gap-2">
                <label class="font-semibold" for="usernameField">Username</label>
                <input id="usernameField" type="text" v-model="username" @input="validInput"
                    class="w-[80%] h-[45px] outline outline-1 outline-black rounded-md text-center"
                    placeholder="Enter username" @focusout="validateNumber" />
                <label class="font-semibold" for="passwordField">Password</label>
                <input id="passwordField" type="password" v-model="password" @input="validInput"
                    class="w-[80%] h-[45px] outline outline-1 outline-black rounded-md text-center"
                    placeholder="Enter password" />

                <CustomButton title="Enter" :toggle="buttonToggle" invalid-button="bg-gray-500"
                    valid-button="bg-green-100" />
            </form>
            <CustomButton title="Register" :toggle="true" valid-button="bg-red-100"
                :onClick="() => router.push('/register')" />

        </Panel>
    </div>
</template>
