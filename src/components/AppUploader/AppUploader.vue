<template>
    <div class="app-uploader">
        <div>
            <button @click="openFile">click for upload xml file</button>
            <button @click="createNew">click for write live xml</button>
        </div>
    </div>
</template>

<script>
    import fs from 'fs';
    import {mapMutations} from 'vuex';
    const {dialog} = require('electron').remote;

    export default {
        name: 'AppUploader',

        data() {
            return {
                isDragNDrop: false
            };
        },

        methods: {
            createNew() {
                this.setOriginSource('<?xml version="1.1" encoding="UTF-8" ?>\n')
            },
            openFile() {
                const path = dialog.showOpenDialog({
                    filters: [
                        {
                            name: 'XML',
                            extensions: ['xml']
                        }
                    ],
                    properties: ['openFile']
                });

                if (!path) {
                    return;
                }

                try {
                    fs.readFile(path[0], 'utf8', (err, data) => {
                        if (err) {
                            throw err;
                        }
                        this.setOriginSource(data);
                    });
                } catch (e) {
                    dialog.showErrorBox(e.name, e.message);
                }
            },

            ...mapMutations(['setOriginSource'])
        },
    }
</script>

<style lang="stylus">
    .app-uploader
        height 100%
        border 2px dashed #919191
        border-radius 20px
        display flex
        flex-direction column
        justify-content center
        text-align center
        cursor pointer
        &__drop-zone
            color #fff
            height 100%
            border-radius 20px
            background-color #17d8ff
            opacity 0.8
        b, i
            margin-bottom 10px
</style>