<template>
<div class="profiles">
    <h1>Profiles</h1>
    <div v-for="profile in profiles" :key="profile.username" class="profile">
        <div class="identityp">
            <div class="namep">
                <p class="subtitle">Name</p>
                <p>{{ profile.name }}</p>
            </div>
            <div class="usernamep">
                <p class="subtitle">Username</p>
                <p>{{ profile.username }}</p>
            </div>
        </div>
        <div class="img">
            <p class="subtitle">Avatar</p>
            <img :src="profile.img">
        </div>
        <div class="biop">
            <p class="subtitle">Bio</p>
            <textarea v-model="profile.bio"></textarea>
        </div>
        <div class="buttons">
            <button @click="edit(profile)" class="edit">Edit</button>
            <button @click="remove(profile)" class="delete">Delete</button>
        </div>

        <hr v-if="profile.username != profiles[profiles.length - 1].username">
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'profiles',
    data() {
        return {
            profiles: [],
        }
    },
    created() {
        this.getProfiles();
    },
    methods: {
        async getProfiles() {
            let response = await axios.get("/api/profiles");
            this.profiles = response.data;
            return true;
        },
        async remove(profile) {
            await axios.delete("/api/profiles/" + profile._id);
            this.getProfiles();
            return true;
        },
        async edit(profile) {
            await axios.put("/api/profiles/" + profile._id, {
                bio: profile.bio,
            });
            this.getProfiles();
            return true;
        }
    },
}
</script>

<style>
.namep {
    display: flex;
    justify-content: space-between;
}

.namep p {
    margin: 10px;
}

.usernamep {
    display: flex;
    justify-content: space-between;
}

.usernamep p {
    margin: 10px;
}

.img {
    text-align: right;
}

.img p {
    text-align: left;
    margin-left: 10px;
}

.img img {
    max-width: 200px;
    max-height: 200px;
    margin-right: 10px;
}

.biop {
    display: flex;
    justify-content: space-between;
}

.biop textarea, p {
    margin: 10px;
    text-align: right;
}

.subtitle {
    font-weight: bold;
}

hr {
    margin-top: 40px;
    margin-bottom: 20px;
}

.buttons {
    display: flex;
    justify-content: flex-end;
}

.delete {
    margin-right: 10px;
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
    .profiles {
        max-width: 500px;
        margin: auto;
    }
}

@media only screen and (min-width: 961px) {
    .profiles {
        max-width: 600px;
        margin: auto;
    }

    .identityp {
        display: flex;
        justify-content: space-between;
    }

    .namep p, .usernamep p {
        margin: 10px;
    }

    .img img {
        max-width: 300px;
        max-height: 300px;
    }
}
</style>