export default {
    namespaced: true,
    state: {
        dogs: [
            {
                name: "Luke",
                breed: 'Poodle Standard',
                age: 5,
                description: 'Medium size dog, white color.',
                photoUrl: 'https://images.dog.ceo/breeds/poodle-standard/n02113799_489.jpg'
            }
        ]
    },
    getters: {
        getDogs (state) {
            return state.dogs;
        },
        getDog: (state) => (index) => {
            return state.dogs[index];
        }
    },
    mutations: {
        addDog (state, payload) {
            state.dogs.push(payload);
        },
        deleteDog (state, payload) {
            state.dogs.splice(payload.index, 1);
        },
        editDog (state, payload) {
            state.dogs[payload.index].name        = payload.name;
            state.dogs[payload.index].breed       = payload.breed;
            state.dogs[payload.index].age         = payload.age;
            state.dogs[payload.index].description = payload.description;
            state.dogs[payload.index].photoUrl    = payload.photoUrl;
        }
    },
    actions: {
        addDog ({commit}, payload) {
            commit('addDog', payload);
        },
        deleteDog ({commit}, payload) {
            commit('deleteDog', payload);
        },
        editDog ({commit}, payload) {
            commit('editDog', payload);
        }
    }
}