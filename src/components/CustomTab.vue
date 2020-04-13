<template>
    <div class="afp-custom-tab-content afp-mb-3">
        <div v-html="content"></div>
        <loader :show="!loaded" />
    </div>
</template>

<script>
import axios from 'axios'
import Loader from '../components/Loader'

export default {
    data() {
        return {
            content: '',
            loaded: false
        }
    },
    props: ['tab', 'url'],
    components: {
        Loader,
    },
    async mounted() {
        try {
            var response = await axios.get(this.url);
            this.content = response.data
            this.loaded = true
        } catch (e) {
            this.content = "<p class='afp-html-p afp-mb-3'>The content could not be loaded.</p>"
            this.loaded = true
        }
    }
}
</script>