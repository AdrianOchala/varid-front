<template>
    <v-card
        class="mx-2 my-12 d-flex flex-column"
        max-width="300"
    >
        <v-img 
            max-height="250"
            min-height="250"
            :src="item.photoUrl"
        ></v-img>
        <v-card-title class="pb-0">{{ item.name }} {{ item.age ? '('+item.age+' yo)' : ''}}</v-card-title>
        <v-card-text>
            <div class="pt-0 text-subtitle-1">
                {{ item.breed }}
            </div>
            <v-divider class="mx-4"></v-divider>
            <div class="mt-2">{{ item.description }}</div>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex justify-center">
            <v-btn
                color="blue"
                outlined
                @click="$emit('editDog')"
            >
                Edit
            </v-btn>
            <v-btn
                color="red"
                outlined
                @click="$emit('deleteDog')"
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
        }
    }
}
</script>

