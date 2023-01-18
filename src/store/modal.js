export default {
    namespaced: true,
    state: {
        deleteModal: {
            show: false,
            index: null,
        },
    },
    getters: {
        deleteModal (state) {
            return state.deleteModal;
        }
    },
    mutations: {
        manageDeleteModal (state, payload) {
            state.deleteModal.show  = payload.show;
            state.deleteModal.index = payload.index;
        }
    },
    actions: {
        manageDeleteModal ({commit}, payload) {
            commit('manageDeleteModal', payload)
        }
    }
}