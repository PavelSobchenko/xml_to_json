<template>
    <div class="app-controls">
        <div class="app-controls__buttons">
            <button @click="setOriginSource('')">upload another file</button>
            <button @click="createNew">click for write live xml</button>
            <button @click="saveFile">save result</button>
        </div>
        <div class="app-controls__switchers">
            <label>
                <select @change="setSpaceMode($event.target.value)">
                    <option :selected="!isTab" value="space">Space</option>
                    <option :selected="isTab" value="tab">Tab</option>
                </select>
            </label>
            <label>
                <select @change="setSpacesSize($event.target.value)">
                    <option v-for="space in spacesVal"
                            :value="space"
                            :selected="space === spacesSize"
                    >{{space}}</option>
                </select>
                <span>{{isTab ? 'Tab size' : 'Space size'}}</span>
            </label>
            <label>
                <input :checked="compact"
                       @change="setCompact($event.target.checked)"
                       type="checkbox">
                <span>Compact</span>
            </label>
            <label>
                <input :checked="spacesSize === 0"
                       @change="compress($event.target.checked)"
                       type="checkbox">
                <span>Compress</span>
            </label>
        </div>
    </div>
</template>

<script>
    import fs from 'fs';
    import {mapState, mapMutations, mapGetters} from 'vuex';
    const {dialog} = require('electron').remote;

    export default {
        name: 'AppControls',

        data() {
            return {
                spacesVal: [0, 1, 2, 4, 8]
            };
        },

        computed: {
            ...mapState(['compact', 'spacesSize', 'isTab']),
            ...mapGetters(['convertedSource'])
        },

        methods: {
            createNew() {
                this.setOriginSource('<?xml version="1.1" encoding="UTF-8" ?>\n')
            },
            saveFile() {
                const path = dialog.showSaveDialog({
                    filters: [
                        {
                            name: 'JSON',
                            extensions: ['json']
                        }
                    ],
                });

                if (!path) {
                    return;
                }

                try {
                    fs.writeFile(path, this.convertedSource, err => {
                        if (err) {
                            throw err;
                        }
                        dialog.showErrorBox('success', 'The file has been saved!');
                    });
                } catch (e) {
                    dialog.showErrorBox(e.name, e.message);
                }
            },
            ...mapMutations(['setOriginSource', 'setCompact', 'setSpacesSize', 'setSpaceMode', 'compress'])
        }
    }
</script>

<style lang="stylus">
    .app-controls
        padding 0 20px
        height 50px
        display flex
        justify-content space-between
        align-items center
</style>