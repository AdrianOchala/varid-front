<template>
    <v-card
        class="mx-2 my-12"
        max-width="300"
    >
        <v-img 
            height="250"
            :src="item.photoLink"
        ></v-img>
        <v-card-title class="pb-0">{{ item.name }}</v-card-title>
        <v-card-text>
            <div class="pt-0 text-subtitle-1">
                {{ item.breed }}
            </div>
            <v-divider class="mx-4"></v-divider>
            <div class="mt-2">{{ item.description }}</div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
            <v-btn
                color="blue"
                outlined
                @click="editDog"
            >
                Edit
            </v-btn>
            <v-btn
                color="red"
                outlined
                @click="deleteDog"
            >
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'ListItem',
    props:{
        item: {
            type: Object,
            default: null
        },
        index: {
            type: Number,
            default: null
        }
    },
    methods: {
        deleteDog() {
            console.log("Deleting dog of index: " + this.index)
        },
        editDog() {
            console.log("Editing dog of index: " + this.index)
        },
    }
}
</script>

