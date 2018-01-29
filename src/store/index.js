import Vue from 'vue';
import Vuex from 'vuex';
import converter from 'xml-js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        originSource: '',
        compact: false,
        spacesSize: 1,
        prevSize: 1,
        isTab: true,
    },

    mutations: {
        setOriginSource(state, source) {
            state.originSource = source;
        },

        setCompact(state, compact) {
            state.compact = compact;
        },

        setSpacesSize(state, space) {
            const val = parseInt(space, 10);
            if (isNaN(val)) {
                return;
            }
            state.spacesSize = val;
        },

        setSpaceMode(state, mode) {
            state.isTab = mode === 'tab';
        },

        compress(state, compress) {
            if (compress) {
                state.prevSize = state.spacesSize;
            }
            state.spacesSize = compress ? 0 : state.prevSize;
        }
    },

    getters: {
        spaces(state) {
            return state.isTab ? '\t'.repeat(state.spacesSize) : state.spacesSize;
        },
        convertedSource(state, getters) {
            try {
                return converter.xml2json(state.originSource, {
                    compact: state.compact,
                    spaces: getters.spaces
                });
            } catch (e) {
                return `{\n\t"parsing_error": "${e.message.replace((/\n/g), ' ')}"\n}`;
            }
        }
    }
});

export default store;