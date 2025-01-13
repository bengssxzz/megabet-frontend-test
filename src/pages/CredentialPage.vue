<script setup>
import { ref } from 'vue';
import axios from 'axios';
import CryptoJS from "crypto-js";
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/userStore';

import Panel from '@/components/Panel.vue'
import CustomButton from '@/components/Button.vue'

const userStore = useUserStore();
const router = useRouter();
const buttonToggle = ref(false);

const username = ref('');
const phone = ref('');
const password = ref('');
const password2 = ref('');

const createUserJson = async () => {
    const userExists = await checkExistingUser(username.value);

    if (userExists) {
        alert("Username is already taken");
    } else {
        const passwordRaw = CryptoJS.SHA1(password.value);
        const passwordHash = passwordRaw.toString(CryptoJS.enc.Base64);

        const newUser = {
            username: username.value,
            phone: userStore.userNumber,
            password: passwordHash,
        };

        try {
            await axios.post('http://localhost:3000/users', newUser);
            router.push('/login');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }
};

const checkExistingUser = async (username) => {
    try {
        const response = await axios.get(`http://localhost:3000/users?username=${username}`);
        return response.data.length > 0;
    } catch (error) {
        console.error('Error checking user:', error);
        return false;
    }
};

const checkInputs = () => {
    buttonToggle.value = username.value !== '' && password.value !== '' && password2.value !== '' && (password.value >= 5 || password2.value >= 5) && password.value === password2.value;
}
</script>

<template>
    <div class="bg-gray-900 h-screen w-screen flex justify-center items-center">
        <Panel title="Credentials">
            <form @submit.prevent="createUserJson" class="w-full h-auto flex flex-col justify-center items-center">
                <p class="text-sm text-gray-400 italic mb-2">Number: {{ userStore.userNumber }}</p>

                <label class="block font-semibold" for="usernameField">User Name</label>
                <input id="usernameField" type="text" v-model="username" @input="checkInputs"
                    class="w-[80%] h-[45px] outline outline-1 outline-black rounded-md text-center" />

                <label class="block font-semibold" for="passwordField">Password</label>
                <input id="passwordField" type="password" v-model="password" @input="checkInputs"
                    class="w-[80%] h-[45px] outline outline-1 outline-black rounded-md text-center" />
                <p v-if="password.length < 5" class="text-sm italic text-red-500">Weak Password!</p>

                <label class="block font-semibold" for="rePasswordField">Re-Password</label>
                <input id="rePasswordField" type="password" v-model="password2" @input="checkInputs"
                    class="w-[80%] h-[45px] outline outline-1 outline-black rounded-md text-center" />

                <div class="w-full flex flex-row gap-3">
                    <CustomButton title="Cancel" :toggle="true" validButton="bg-red-100"
                        :onClick="() => router.push('/')" />
                    <CustomButton title="Register" :toggle="buttonToggle" />
                </div>
            </form>
        </Panel>
    </div>
</template>