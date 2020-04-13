<template>
    <div class="afp-custom-tab-content">
        <div v-html="content"></div>
        <loader />
    </div>
</template>

<script>
import axios from 'axios'
import Loader from '../components/Loader'

export default {
    data() {
        return {
            content: '',
        }
    },
    props: ['tab', 'url'],
    components: {
        Loader,
    },
    async mounted() {
        var response = await axios.get(this.url);
        console.log(response)
        this.content = response.data
    }
}
</script>