<template>
    <div class="text-center">
        <v-dialog
        value="true"
        width="500"
        persistent
        >
            <v-card>
                <v-card-title class="text-h5 red justify-center">
                    Deleting the dog
                </v-card-title>
                <v-card-text class="pt-5 text-h6 text-center">
                    Are you sure you want to delete the selected dog?
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-center ">
                        <v-btn
                            color="blue"
                            outlined
                            @click="accept"
                        >
                            Yes
                        </v-btn>
                        <v-btn
                            color="red"
                            outlined
                            @click="close"
                        >
                            No
                        </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'DeleteConfirmation',
    props: {
        id: Number
    },
    methods: {
        ...mapActions({
            deleteModalAction: 'modal/manageDeleteModal',
            deleteDog: 'dogs/deleteDog'
        }),
        accept() {
            this.deleteDog({
                index: this.id
            })
            this.close();
        },
        close() {
            this.deleteModalAction({
                show: false,
                index: null
            });
        }
    }
}
</script>