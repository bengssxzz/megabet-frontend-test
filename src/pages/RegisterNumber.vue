<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/userStore';

import Panel from '@/components/Panel.vue';
import CustomButton from '@/components/Button.vue'

const userStore = useUserStore();
const router = useRouter();

const userNumber = ref('');
const enteredOTP = ref('');
const generatedOTP = ref('');

const limitNumber = (e) => {
    let value = e.target.value;
    if (value.length > 10) {
        alert("Max LIMIT");
        userNumber.value = value.slice(0, 10);
    } else {
        userNumber.value = value;
    }
};

const validateNumber = () => {
    if (!userNumber.value.startsWith('63')) {
        userNumber.value = '63' + userNumber.value;
    }
};
const resetNumber = () => {
    userNumber.value = '';
}

const insertOTP = (e) => {
    enteredOTP.value = e.target.value;
}

const makeOTP = async () => {
    // generatedOTP.value = Math.floor(100000 + Math.random() * 900000).toString();
    // alert(`Your OTP is ${generatedOTP.value}`);

    try {
        // const response = await axios.get('http://www.randomnumberapi.com/api/v1.0/random?min=100000&max=999999');
        const response = await axios.get('/api/api/v1.0/random?min=100000&max=999999');

        if (response.data && response.data.length > 0) {
            generatedOTP.value = response.data[0];

            console.log("OTP: " + response.data[0]);
            alert(`Your OTP is ${generatedOTP.value}`);
        }
    } catch (error) {
        console.error('Error generating OTP:', error);
    }
};

const confirmOTP = () => {
    console.log("InputOTP:", enteredOTP.value, "Type:", typeof enteredOTP.value);
    console.log("GenOTP:", generatedOTP.value, "Type:", typeof generatedOTP.value);
    if (String(enteredOTP.value) === String(generatedOTP.value)) {
        userStore.setUser('', userNumber.value);
        router.push('/set-credential');
    } else {
        alert('Invalid OTP');
    }
};
</script>

<template>
    <div class="bg-gray-900 h-screen w-screen flex justify-center items-center">
        <Panel title="REGISTER">
            <div class="h-full w-full flex flex-col justify-center items-center gap-2">
                <div class="w-full flex flex-col justify-center items-center gap-1">
                    <h1 class="font-semibold">Contact Number</h1>
                    <input class="w-[80%] h-[45px] outline outline-1 outline-black rounded-md text-center" type="number"
                        v-model="userNumber" maxlength="10" placeholder="63 9123456789" @input="limitNumber"
                        @focusout="validateNumber" @click="resetNumber" />
                    <CustomButton title="Send OTP" :toggle="userNumber.length >= 12" :onClick="makeOTP" />
                </div>

                <br />
                <div class="w-full flex flex-col justify-center items-center gap-1">
                    <h1 class="font-semibold">Enter OTP Code</h1>
                    <input class="w-[80%] h-[45px] outline outline-1 outline-black rounded-md text-center" type="number"
                        @input="insertOTP" placeholder="123456" />
                    <CustomButton title="NEXT" :toggle="enteredOTP.length >= 6 && userNumber.length >= 12"
                        validButton="bg-green-100" invalidButton="bg-gray-200" :onClick="confirmOTP" />

                </div>

            </div>

        </Panel>
    </div>
</template>
