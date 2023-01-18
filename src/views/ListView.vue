<template>
	<v-container>
		<h1 class='d-flex justify-center'>List of dogs</h1>
        <div class="d-flex justify-center flex-wrap" v-if="dogs.length > 0">
            <list-item v-for="(dog, index) in dogs" 
                :key="'dog-'+index" 
                :item="dog" 
                v-on:deleteDog="deleteDog(index)"
                v-on:editDog="editDog(index)"
            ></list-item>
        </div>
        <div class="d-flex justify-center flex-wrap" v-else>
            <span>Animal sheler is empty</span>
        </div>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'ListView',
    components:{
        listItem: () => import('@/components/ListItem.vue')
    },
    computed: {
        ...mapGetters({
            dogs: 'dogs/getDogs'
        })
    },
    methods: {
        ...mapActions({
            deleteModal: 'modal/manageDeleteModal'
        }),
        deleteDog(index) {
            this.deleteModal({
                show: true,
                index: index
            })
        },
        editDog(index) {
            console.log("Edit dog with id: ", index)
        }
    }
}
</script>