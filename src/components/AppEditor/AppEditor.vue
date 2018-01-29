<template>
    <div class="app-editor">
        <div class="app-editor__wrap">
            <div class="app-editor__target" ref="target"/>
        </div>
    </div>
</template>

<script>
    import CodeMirror from 'codemirror';
    import 'codemirror/mode/xml/xml'
    import 'codemirror/mode/javascript/javascript'
    import {mapMutations} from 'vuex';

    export default {
        name: 'AppEditor',
        props: {
            source: String,
            readOnly: Boolean,
            mode: Object,
        },

        data() {
            return {
                codeMirror: null
            };
        },

        watch: {
            source(val) {
                if (this.readOnly) {
                    this.codeMirror.doc.setValue(val);
                }
            }
        },

        mounted() {
            this.codeMirror = CodeMirror(this.$refs.target, {
                value: this.source,
                mode: this.mode,
                readOnly: this.readOnly,
                lineNumbers: true,
                fixedGutter: false,
            });

            if (!this.readOnly) {
                this.codeMirror.on('change', ({doc}) => {
                    this.setOriginSource(doc.getValue());
                });
            }
        },

        methods: {
            ...mapMutations(['setOriginSource'])
        }
    }
</script>

<style lang="stylus">
    @import "~codemirror/lib/codemirror.css"

    .app-editor
        padding 0 10px
        width 50%
        flex-shrink 0
        &__wrap
            height 100%
            border 2px solid #ffb2a8
            padding 15px
            border-radius 15px
        &__target
            height 100%
    .CodeMirror
        height 100% !important
</style>