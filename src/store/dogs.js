export default {
    namespaced: true,
    state: {
        dogs: [
            {
                name: "Luke",
                breed: 'Poodle Standard',
                age: 5,
                description: 'Medium size dog, white color.',
                photoLink: 'https://images.dog.ceo/breeds/poodle-standard/n02113799_489.jpg'
            }
        ]
    },
    getters: {
        getDogs (state) {
            return state.dogs;
        }
    },
    mutations: {
        addDog (state, payload) {
            state.dogs.push(payload);
        },
        deleteDog (state, payload) {
            state.dogs.splice(payload.index, 1);
        }
    },
    actions: {
        addDog ({commit}, payload) {
            commit('addDog', payload)
        },
        deleteDog ({commit}, payload) {
            commit('deleteDog', payload)
        }
    }
}