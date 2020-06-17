<template>
    <div>
        <div v-if="expired && !preview" class="afp-expired afp-alert afp-alert-danger">
            <h2 class="afp-html-h2">
                <i class="mdi mdi-clock-alert"></i> This product is expired
            </h2>
        </div>
        <div class="afp-header afp-row afp-mb-3">
            <div v-if="published != ''" class="afp-col-12 afp-col-md">
                <div class="afp-header-meta">
                    <h6 class="afp-html-h6">Issued</h6>
                    {{ published | publicDate }}
                </div>
            </div>
            <div v-if="expires && showExpires" class="afp-col-12 afp-col-md">
                <div class="afp-header-meta">
                    <h6 class="afp-html-h6">Expires</h6>
                    {{ expires | publicDate }}
                </div>
            </div>
            <div v-if="author != ''" class="afp-col-12 afp-col-md">
                <div class="afp-header-meta">
                    <h6 class="afp-html-h6">Author</h6>
                    {{ author }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        preview: Boolean,
        published: String,
        expires: [String,Boolean],
        showExpires: {
            type: Boolean,
            default: true
        },
        author: String
    },
    computed: {
        expired: function () {
            if (this.expires) {
                return moment(this.expires).isBefore()
            } else {
                return false
            }
        },
    },
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-expired {
    -webkit-print-color-adjust: exact;
    h2 {
        color: #fff !important;
        margin-bottom: 0 !important;
        margin-left: 50px;
    }
    i {
        color: #fff !important;
        font-size: 3rem;
        line-height: 1;
        position: absolute;
        left: 15px;
        transform: translate(0, -50%);
        top: 50%;
    }
}

.afp-header {
    .afp-header-meta {
        border-left: 1.5px solid $gray-200;
        padding: 0.5rem 0 0.5rem 2rem;
    }
}
</style>