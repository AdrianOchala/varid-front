<template>
    <v-app-bar app>
            <router-link v-for="item in menuItems" :key="item.routeName" :to="{name: item.routeName}">
                {{ item.name }}
            </router-link>
    </v-app-bar>
</template>

<script>
export default {
    name: 'NavigationComponent',
    data() {
        return {
            menuItems: [
                {name: 'List', routeName: 'list'},
                {name: 'Add dog', routeName: 'addDog'}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    header {
        display: flex;   
        justify-content: center;
    }
    a {
        position: relative;
        display: inline-block;
        min-width: 3rem;
        text-decoration: none;
        color: black;
        padding: 5px 15px;

        &.router-link-exact-active::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            width: 100%;
            height: 5px;
            background-color: rgb(193, 188, 188);
            border-radius: 50%;                
        }
    }
</style>
