import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#3f51b5',
                secondary: '#ffc107',
                accent: '#ff9800',
                error: '#f44336',
                warning: '#cddc39',
                info: '#00bcd4',
                success: '#4caf50'
            }
        }
    }
});
