import Vue from 'vue'

const scroll = {
    inserted(el, binding) {
        const f = function(evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    },
}

Vue.directive('scroll', scroll)
