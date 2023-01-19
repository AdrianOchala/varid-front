<template>
	<v-container class="form__wrapper">
		<h2 class='d-flex justify-center'>Add dog</h2>
        <v-form
            ref="form"
            lazy-validation
        >
            <v-select
                v-model="dog.breed"
                :items="filteredBreeds"
                width="200"
                label="Breed"
                :rules="breedRules"
                required
            ></v-select>
            <image-carousel-picker 
                v-if="dog.breed != null" 
                :items-category="dog.breed"
                @change-selected="changePhoto"
                @final-breed-name="saveFinalBreed"
            ></image-carousel-picker>
            <v-text-field
                v-model="dog.name"
                :counter="15"
                :rules="nameRules"
                label="Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="dog.age"
                label="Age"
                type="number"
                required
            ></v-text-field>
            <v-textarea
                v-model="dog.description"
                clearable
                clear-icon="mdi-close-circle"
                label="Description"
            ></v-textarea>
            <v-btn
                color="success"
                class="mr-4"
                @click="validate"
            >
                Add dog
            </v-btn>
            <v-btn
                color="error"
                class="mr-4"
                @click="cancel"
            >
                Cancel
            </v-btn>
        </v-form>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'FormView',
    components: {
        imageCarouselPicker: () => import('@/components/ImageCarouselPicker.vue')
    },
    data() {
        return {
            breeds: null,
            filteredBreeds: [],
            selectedBreed: null,
            dog: {
                name: null,
                breed: null,
                finalBreed: null,
                age: null,
                description: null,
                photoUrl: null
            },
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 15) || 'Name must be less than 15 characters'
            ],
            breedRules: [
                v => !!v || 'Breed is required'
            ]
        }
    },
    created() {
        this.getBreeds();
    },
    methods: {
        ...mapActions({
            addDog: 'dogs/addDog'
        }),
        getBreeds() {
            this.axios.get('https://dog.ceo/api/breeds/list/all')
                .then((res) => {
                    if (res.data.status == 'success'){
                        this.breeds = res.data.message;
                        Object.keys(res.data.message).forEach(breed => {
                            this.filteredBreeds.push(breed);
                        });
                    } else {
                        console.error("Error in fetching breeds");
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        },
        validate() {
            const result = this.$refs.form.validate();
            if (result) {
                this.addDog({
                    name: this.dog.name,
                    breed: this.dog.finalBreed,
                    age: this.dog.age,
                    description: this.dog.description,
                    photoUrl: this.dog.photoUrl
                });
                this.cancel();
            }
        },
        cancel() {
            this.$router.push({name: 'list'});
        },
        changePhoto(url) {
            this.dog.photoUrl = url;
        },
        saveFinalBreed(breed) {
            this.dog.finalBreed = breed;
        }
    }
}
</script>

<style>
    .form__wrapper {
        max-width: 800px;
    }
</style>