import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        userNumber: '',
    }),
    actions: {
        setUser(username, userNumber) {
            this.username = username;
            this.userNumber = userNumber;
        },
        clearUser() {
            this.username = '';
            this.userNumber = '';
        }
    },
});