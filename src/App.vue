<template>
    <v-app>
        <navigation></navigation>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    components: {
        navigation: () => import('./components/NavigationComponent.vue')
    },
    data() {
        return {

        }
    }  
};
</script>
