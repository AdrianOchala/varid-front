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
            v-if="!dataLoading"
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
                v-if="selectedItem != null && !dataLoading"
                height="60"
                tile
            >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <h3 class="text-h6">
                        Selected breed: {{ dogFinalBreed(selectedItem) }}
                    </h3>
                </v-row>
            </v-sheet>
        </v-expand-transition>
    </v-sheet>
</template>

<script>
export default {
    name: 'ImageCarouselPicker',
    props: {
        selected: {
            type: String,
            default: ''
        },
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
        // selected: {
        //     handler(val) {
        //         this.selectedItem = val || null;
        //     },
        //     immediate: true
        // },
        itemsCategory: {
            handler(val) {
                if (val) this.getPhotos();
            },
            immediate: true
        } 
    },
    methods: {
        getPhotos() {
            this.dataLoading = true;
            this.selectedItem = null;
            this.axios.get(`https://dog.ceo/api/breed/${this.itemsCategory}/images/random/8`)
                .then((res) => {
                    this.items = res.data.message;
                    this.dataLoading = false;
                })
        },
        dogFinalBreed(index) {
            this.$emit('change-selected', this.items[index]);
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