<template>
    <div class="app">
        <div class="app__wrap" v-if="originSource">
            <app-controls/>
            <div class="app__editors">
                <app-editor :source="originSource"
                            :read-only="false"
                            :mode="{name: 'xml', htmlMode: false}"/>
                <app-editor :source="convertedSource"
                            :read-only="true"
                            :mode="{name: 'javascript', json: true}"/>
            </div>
        </div>
        <app-uploader v-if="!originSource" />
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import AppEditor from '@/components/AppEditor/AppEditor';
    import AppControls from '@/components/AppControls/AppControls';
    import AppUploader from '@/components/AppUploader/AppUploader';

    export default {
        name: 'App',

        components: {
            AppUploader,
            AppEditor,
            AppControls
        },

        computed: {
            ...mapState(['originSource']),
            ...mapGetters(['convertedSource'])
        }
    };
</script>

<style lang="stylus">
    @import "~@/css/main.styl";
    .app
        height: 100%
        padding 20px
        &__wrap
            display flex
            height 100%
            flex-direction column
            justify-content space-between
        &__editors
            display flex
            justify-content space-between
            flex-grow 2

</style>