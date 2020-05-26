import Vue from 'vue'

Vue.mixin({
    methods: {
        addPswp(content) {
            var element = document.createElement('div')
            element.insertAdjacentHTML('beforeend', content)
            var figures = element.querySelectorAll('.afp-tinymce-figure')
            figures.forEach((figure) => {
                var caption = figure.getElementsByTagName('figcaption')
                var image = figure.getElementsByTagName('img')
                caption = caption[0].innerHTML
                image[0].setAttribute('data-pswp-title', caption)
                image[0].setAttribute('data-pswp-src', image[0].src)
            })
            return element.innerHTML
        }
    }
})
