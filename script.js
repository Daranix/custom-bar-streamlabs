/**
 * @typedef {{label: string; type: 'colorpicker', value: string;}} ColorPicker
 * @typedef {{label: string; type: 'slider', value: string; max: number; min: number; steps: number; }} Slider
 * @typedef {{label: string; type: 'textfield', value: string; }} TextField
 * @typedef {{label: string; type: 'fontpicker', value: string; }} FontPicker
 * @typedef {{label: string; type: 'dropdown'; options: { [key: string]: string; }; value: string; }} Dropdown
 * @typedef {{label: string; type: 'image-input', value: string | null; }} ImageInput
 * @typedef {{label: string; type: 'sound-input', value: string | null; }} SoundInput
*/

// Example configuration
const config = {

    detail: {
        title: 'Test',
        currency: '€',
        start: 0,
        // Amount data
        amount: {
            start: 0,
            current: 35,
            target: 125,
        },
        // End date of donationg oal
        to_go: {
            ends_at: '2022-05-20 22:05:21',
        },
        // Last donator info ??
        data: {
            amount: "",
            from: "",
            message: ""
        },
        // Settings 
        settings: {
            background_color: "#F9F9F9",
            bar_bg_color: "#DDDDDD",
            bar_color: "#46E65A",
            bar_text_color: "#000000",
            bar_thickness: 48,
            custom_css: null,
            custom_enabled: true,
            custom_html: null,
            custom_js: null,
            // Custom fields ...
            custom_json: {
                "borderRadiusMultiplier": {
                    "label": "Border Radius",
                    "type": "slider",
                    "value": 2,
                    "max": 100,
                    "min": 2,
                    "steps": 1
                },
                "borderWidth": {
                    "label": "Border Width",
                    "type": "slider",
                    "name": "px",
                    "value": 3,
                    "max": 100,
                    "min": 0,
                    "steps": 1
                },
                "showCurrency": {
                    "label": "Show currency simbol",
                    "type": "dropdown",
                    "options": {
                        "yes": "Yes",
                        "no": "No"
                    },
                    "value": "yes"
                },
                "showPercentage": {
                    "label": "Show percentage on condensed layout",
                    "type": "dropdown",
                    "options": {
                        "yes": "Yes",
                        "no": "No"
                    },
                    "value": "no"
                },
                "borderColor": {
                    "label": "Border Color",
                    "type": "colorpicker",
                    "value": "#a559ac"
                },
                "barBackgroundColor1": {
                    "label": "Background Color 1",
                    "type": "colorpicker",
                    "value": "#a559ac"
                },
                "barBackgroundColor2": {
                    "label": "Background Color 2",
                    "type": "colorpicker",
                    "value": "#b22cff"
                },
                "barBackgroundColor3": {
                    "label": "Background Color 3",
                    "type": "colorpicker",
                    "value": "#911c8b"
                },
                "barBackgroundColorInterval": {
                    "label": "Background Change Interval",
                    "type": "slider",
                    "name": "s",
                    "value": 3,
                    "max": 60,
                    "min": 1,
                    "steps": 1
                }
            },
            font: "Open Sans",
            layout: "standard",
            mobile: null,
            text_color: "white",
            /** @type {Array<string>} */
            whitelist: []
        }
    }
}

document.addEventListener('goalLoad', function (obj) {
    // obj.detail will contain information about the current goal
    // this will fire only once when the widget loads
    /** @type baseConfig */
    const details = obj;
    console.log(obj.detail);
    Object.assign(config.detail, obj.detail);
    updateCssVars(obj);
});

// Streamlabs events

// Load vue


function addStylesheetURL(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}

// Load Tangerine & Cantarell

function getPercent(current, target) {
    return Math.round((100 * current) / target);
}

function whenloadscript() {
    const app = new Vue({
        el: '#bar-content',
        data() {
            return {
                test: 'hola',
                layoutdata: config
            }
        },
        methods: {
            getPercent: getPercent,
            calculateDiffDays(endDay) {

                const oneDay = 24 * 60 * 60 * 1000;
                const startDate = new Date()
                const endDate = new Date(endDay);

                const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));

                return diffDays;
            }
        }
    });



    document.addEventListener('goalEvent', function (obj) {
        // obj.detail will contain information about the goal
        Object.assign(config.detail, obj.detail);
        console.log(app);
        updateCssVars(obj);
    });

    console.log(app);

}

function updateCssVars(/** @type config */ obj) {

    const details = obj.detail;
    const root = document.documentElement;
    addStylesheetURL('https://fonts.googleapis.com/css?family=' + details.settings.font);
    root.style.setProperty('--bar-thickness', details.settings.bar_thickness + 'px');
    root.style.setProperty('--st-font', details.settings.font);
    root.style.setProperty('--text-color', details.settings.text_color);
    root.style.setProperty('--bar-text-color', details.settings.bar_text_color);
    root.style.setProperty('--bar-fill-color', details.settings.bar_color);
    root.style.setProperty('--bar-bg-color', details.settings.bar_bg_color);
    root.style.setProperty('--radius-multiplier', details.settings.custom_json.borderRadiusMultiplier.value);
    root.style.setProperty('--border-width', details.settings.custom_json.borderWidth.value + 'px');
    root.style.setProperty('--text-color', details.settings.text_color);
    console.log("Percent is: ", getPercent(details.amount.current, details.amount.target));
    root.style.setProperty('--progress-percent', getPercent(details.amount.current, details.amount.target) + '%');
    root.style.setProperty('--bar-bg-color-1', details.settings.custom_json.barBackgroundColor1.value);
    root.style.setProperty('--bar-bg-color-2', details.settings.custom_json.barBackgroundColor2.value);
    root.style.setProperty('--bar-bg-color-3', details.settings.custom_json.barBackgroundColor3.value);
    root.style.setProperty('--bar-bg-interval', details.settings.custom_json.barBackgroundColorInterval.value + 's');

}


var script = document.createElement('script');
script.onload = whenloadscript;

script.src = 'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js';

document.body.appendChild(script); //or something of the likes