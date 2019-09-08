<template>
    <div>
        <h4>Today's Danger:</h4>
        <danger-elevation :danger="currentDanger"></danger-elevation>
        <danger-scale/>
    </div>
</template>

<script>
import DangerElevation from '../components/DangerElevation'
import DangerScale from '../components/DangerScale'

export default {
    data() {
        return {
        }
    },
    components: {
        DangerElevation,
        DangerScale
    },
    props: ['danger'],
    computed: {
        currentDanger: function () {
            let current = this.danger.find(current => current.valid_day == "current");
            return current
        },
        outlookDanger: function () {
            if(this.danger.length > 1) {
                let outlook = this.danger.find(outlook => outlook.valid_day == "tomorrow");
                return current
            } else {
                return false
            }
        }
    }
}

</script>

