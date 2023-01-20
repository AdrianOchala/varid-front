<template>
    <v-sheet
        class="mx-auto mb-4"
        elevation="8"
        max-width="800"
    >
        <v-slide-group
            v-model="selectedItem"
            class="pa-4"
            show-arrows
            mandatory
            @click="dogFinalBreed"
            v-if="dataLoaded"
        >
            <v-slide-item
                v-for="(item, index) in items"
                :key="index"
                v-slot="{ active, toggle }"
            >
                <v-card
                    :color="active ? 'primary' : 'grey lighten-1'"
                    class="ma-4"
                    height="200"
                    width="200"
                    @click="toggle"
                >
                    <v-img
                        :class="active ? 'selected' : ''"
                        height="200"
                        width="200"
                        :src="item"
                    ></v-img>
                </v-card>
            </v-slide-item>
        </v-slide-group>
        <v-expand-transition>
            <v-sheet
                v-if="selectedItem != null && dataLoaded"
                height="60"
                tile
            >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <di class="text-h6">
                        Selected breed: {{ dogFinalBreed(selectedItem) }}
                    </di>
                </v-row>
            </v-sheet>
        </v-expand-transition>
    </v-sheet>
</template>

<script>
export default {
    name: 'ImageCarouselPicker',
    props: {
        itemsCategory: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            selectedItem: null,
            items: [],
            dataLoading: false
        }
    },
    watch: {
        itemsCategory: {
            handler(val) {
                if (val) this.getPhotos();
            },
            immediate: true
        } 
    },
    computed: {
        dataLoaded() {
            return this.items.length > 0 && !this.dataLoading ? true : false;
        }
    },
    methods: {
        getPhotos() {
            this.dataLoading  = true;
            this.selectedItem = null;
            this.axios.get(`https://dog.ceo/api/breed/${this.itemsCategory}/images/random/8`)
                .then((res) => {
                    this.items = res.data.message;
                    this.dataLoading = false;
                })
        },
        dogFinalBreed(index) {
            this.$emit('assign-photo', this.items[index]);
            var finalBreed = '';
            const existSubBreed = this.items[index].search(`/breeds/${this.itemsCategory}-`);
            if ( existSubBreed != -1) {
                var splittedString = this.items[index].split("/");
                var subBreed = splittedString[4].replace(`${this.itemsCategory}-`, '');
                finalBreed = this.$helpers.capitalize(this.itemsCategory)+' '+this.$helpers.capitalize(subBreed);
                this.$emit('final-breed-name', finalBreed);
                return finalBreed;
            }
            finalBreed = this.$helpers.capitalize(this.itemsCategory);
            this.$emit('final-breed-name', finalBreed);
            return finalBreed;
        }
    }
}
</script>

<style>
    .selected {
        border: 5px solid red;
    }
</style>