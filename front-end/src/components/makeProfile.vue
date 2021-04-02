<template>
<form v-if="making" @submit.prevent="addProfile" class="form">
    <div class="identity">
        <div class="name">
            <p>Name</p>
            <input v-model="name" placeholder="Name">
        </div>
        <div class="username">
            <p>Username</p>
            <input v-model="username" placeholder="Username">
        </div>
    </div>
    <p>Choose an Avatar</p>
    <div class="picture">
        <div v-for="picture in this.pictures" :key="picture">
            <img :src="picture" :class="{selected: img == picture}" @click="img = picture">
        </div>
    </div>
    <div>
        <p>Bio</p>
        <textarea v-model="bio" placeholder="Bio"></textarea>
    </div>
    <div v-if="this.errors.length" class="errors">
        <p>Error:</p>
        <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
    </div>
    <button type="submit">Submit</button>
</form>
<div v-else class="returnpage">
    <p>Click below to create another profile</p>
    <p><a @click="toggle" href="#">Make another profile</a></p>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'make',
    data() {
        return {
            errors: [],
            making: true,
            name: '',
            username: '',
            img: '',
            bio: '',
            profiles: [],
        }
    },
    computed: {
        pictures() {
            return this.$root.$data.pictures;
        },
        usernames() {
            let temp = [];
            for (let i =0; i < this.profiles.length; i++) {
                temp.push(this.profiles[i].username);
            }
            return temp;
        }
    },
    created() {
        this.getProfiles();
    },
    methods: {
        toggle() {
            this.making = !this.making;
        },
        async addProfile() {
            let check = true;
            this.errors = [];

            if (!this.name) {
                this.errors.push('Name required');
                check = false;
            }

            if (!this.username) {
                this.errors.push('Username required');
                check = false;
            }

            if (!this.img) {
                this.errors.push('Avatar required');
                check = false;
            }

            if (!this.bio) {
                this.errors.push('Bio required');
                check = false;
            }

            for (let i = 0; i < this.usernames.length; i++) {
                if (this.username == this.usernames[i]) {
                    this.errors.push('Username already taken');
                    check = false;
                }
            }

            if (check) {
                await axios.post("/api/profiles", {
                    name: this.name,
                    username: this.username,
                    img: this.img,
                    bio: this.bio
                });
                this.name = '';
                this.username = '';
                this.img = '';
                this.bio = '';
                this.making = false;
            }
        },
        getSelectedImg() {
            return this.img;
        },
        async getProfiles() {
            let response = await axios.get("/api/profiles");
            this.profiles = response.data;
            return true;
        }
    }
}
</script>

<style>
.selected {
    border: 5px solid red;
    border-radius: 10px;
}

li {
    color: red;
    list-style-type: none;
    margin-right: 40px;
}

.errors p {
    color: red;
}

img {
    max-width: 80px;
    max-height: 80px;
}

.picture {
    margin: auto;
    max-width: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

textarea {
    width: calc(100vw - 20px);
    height: 50px;
    resize: none;
}

.identity div {
    margin: 30px;
}

.returnpage {
    height: 100vh;
    margin-bottom: -50px;
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
    .identity {
        display: flex;
        justify-content: center;
    }

    textarea {
        width: 380px;
        height: 100px;
    }
}

@media only screen and (min-width: 961px) {
    .identity {
        display: flex;
        justify-content: center;
    }

    .identity div {
        margin: 30px 90px;
    }

    img {
        max-width: 120px;
        max-height: 120px;
    }

    .picture {
        max-width: 600px;
    }

    textarea {
        width: 500px;
    }
}
</style>