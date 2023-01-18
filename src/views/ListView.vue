<template>
	<v-container>
		<h2 class='d-flex justify-center'>List of dogs</h2>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'ListView',
    computed: {
        ...mapGetters({
            dogs: 'dogs/getDogs'
        })
    },
    created() {
        console.log("Created ListView Dogs:", this.dogs)
    }
}
</script>

<style>

</style>