<template>
    <v-app>
        <navigation></navigation>
        <delete-modal-confirmation v-if="deleteModal.show" :id="deleteModal.index"></delete-modal-confirmation>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'App',
    components: {
        navigation: () => import('./components/NavigationComponent.vue'),
        deleteModalConfirmation: () => import('./components/modals/DeleteConfirmation.vue')
    },
    computed: {
        ...mapGetters({
            deleteModal: 'modal/deleteModal'
        })
    },
    data() {
        return {

        }
    }  
};
</script>
