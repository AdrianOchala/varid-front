<template>
	<v-container class="form__wrapper">
		<h2 class='d-flex justify-center'>{{ mode == 'edit' ? "Edit" : "Add" }} dog</h2>
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
                v-if="dog.breed != null && mode == 'add' || mode == 'edit' && changeDogPhoto" 
                :items-category="dog.breed"
                @assign-photo="assignPhoto"
                @final-breed-name="saveFinalBreed"
            ></image-carousel-picker>
            <div v-else-if="mode == 'edit'" class="d-flex flex-column align-center">
                <v-img
                    width="250"
                    :src="dog.photoUrl"
                ></v-img>
                <div class="mt-2 text-h6">
                    Selected breed: {{ dog.finalBreed }}
                </div>
                <v-btn
                    class="my-4"
                    width="250"
                    @click="changePhoto"
                >
                    Change Photo / Breed
                </v-btn>
            </div>
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
                {{ mode == 'edit' ? "Edit" : "Add" }} dog
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
import { mapActions, mapGetters } from 'vuex';


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
            changeDogPhoto: false,
            dog: this.initializeDog(),
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 15) || 'Name must be less than 15 characters'
            ],
            breedRules: [
                v => !!v || 'Breed is required'
            ]
        }
    },
    watch: {
        'dog.breed': function(val, oldVal) {
            if (val != oldVal && oldVal != null && this.mode == 'edit') {
                this.changePhoto();
            }
        },
        '$route': function(to, from) {
            if (from.name == 'editDog' && to.name == 'addDog') {
                this.dog = this.initializeDog();
                this.$refs.form.resetValidation();
            }
        }
    },
    computed: {
        ...mapGetters({
            getStoredDog: 'dogs/getDog'
        }),
        mode() {
            return this.$route.params.dogID !== undefined ? 'edit' : 'add';
        }
    },
    created() {
        this.getBreeds();
        if (this.$route.params.dogID !== undefined) this.getDog(this.$route.params.dogID);
    },
    methods: {
        ...mapActions({
            addDog: 'dogs/addDog',
            editDog: 'dogs/editDog'
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
                if (this.mode == 'add') {
                    this.addDog({
                        name: this.dog.name,
                        breed: this.dog.finalBreed,
                        age: this.dog.age,
                        description: this.dog.description,
                        photoUrl: this.dog.photoUrl
                    });
                } else {
                    this.editDog({
                        index: this.$route.params.dogID,
                        name: this.dog.name,
                        breed: this.dog.finalBreed,
                        age: this.dog.age,
                        description: this.dog.description,
                        photoUrl: this.dog.photoUrl
                    })
                }
                this.cancel();
            }
        },
        cancel() {
            this.$router.push({name: 'list'});
        },
        saveFinalBreed(breed) {
            this.dog.finalBreed = breed;
        },
        changePhoto() {
            this.dog.photoUrl = null;
            this.changeDogPhoto = true;
        },
        assignPhoto(url) {
            this.dog.photoUrl = url; 
        },
        getDog(index) {
            const dog = this.getStoredDog(index);
            this.dog.breed       = dog.breed.split(' ')[0].toLowerCase();
            this.dog.finalBreed  = dog.breed;
            this.dog.name        = dog.name;
            this.dog.age         = dog.age;
            this.dog.description = dog.description;
            this.dog.photoUrl    = dog.photoUrl;
        },
        initializeDog() {
            return {
                name: null,
                breed: null,
                finalBreed: null,
                age: null,
                description: null,
                photoUrl: null
            };
        }
    }
}
</script>

<style>
    .form__wrapper {
        max-width: 800px;
    }
</style>