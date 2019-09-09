import { DirectiveOptions } from 'vue';

let indicator, dots, levels;

export let passwordStrengthDirective: DirectiveOptions = {
    inserted(element: HTMLInputElement) {
        indicator = document.createElement('span');
        indicator.className = 'password-strength-indicator';
        element.parentNode.insertBefore(indicator, element.nextSibling);

        dots = Array
            .from({length: 4})
            .map(() => {
                let dot = document.createElement('span');
                indicator.appendChild(dot);
                return dot;
            }, []);

        levels = [
            'weakest',
            'weak',
            'strong',
            'strongest'
        ].reduce((levels, key, index) => {
            levels[key] = dots.slice(++index * -1);
            return levels;
        }, {}) as any;
    },
    update(element: HTMLInputElement) {

        let matches: any = {
                positive: {},
                negative: {}
            },
            counts: any = {
                positive: {},
                negative: {}
            },
            tmp,
            strength = 0;

        dots
            .forEach((el) => {
                el.style.backgroundColor = '#ebeef1';
            });

        if (element.value) {
            // Increase strength level
            matches.positive.lower = element.value.match(/[a-z]/g);
            matches.positive.upper = element.value.match(/[A-Z]/g);
            matches.positive.numbers = element.value.match(/\d/g);
            matches.positive.symbols = element.value.match(/[$-/:-?{-~!^_`\[\]]/g);
            matches.positive.middleNumber = element.value.slice(1, -1).match(/\d/g);
            matches.positive.middleSymbol = element.value.slice(1, -1).match(/[$-/:-?{-~!^_`\[\]]/g);

            counts.positive.lower = matches.positive.lower ? matches.positive.lower.length : 0;
            counts.positive.upper = matches.positive.upper ? matches.positive.upper.length : 0;
            counts.positive.numbers = matches.positive.numbers ? matches.positive.numbers.length : 0;
            counts.positive.symbols = matches.positive.symbols ? matches.positive.symbols.length : 0;

            counts.positive.numChars = element.value.length;
            tmp += (counts.positive.numChars >= 8) ? 1 : 0;

            counts.positive.requirements = (tmp >= 3) ? tmp : 0;
            counts.positive.middleNumber = matches.positive.middleNumber ? matches.positive.middleNumber.length : 0;
            counts.positive.middleSymbol = matches.positive.middleSymbol ? matches.positive.middleSymbol.length : 0;

            // Decrease strength level
            matches.negative.consecLower = element.value.match(/(?=([a-z]{2}))/g);
            matches.negative.consecUpper = element.value.match(/(?=([A-Z]{2}))/g);
            matches.negative.consecNumbers = element.value.match(/(?=(\d{2}))/g);
            matches.negative.onlyNumbers = element.value.match(/^[0-9]*$/g);
            matches.negative.onlyLetters = element.value.match(/^([a-z]|[A-Z])*$/g);

            counts.negative.consecLower = matches.negative.consecLower ? matches.negative.consecLower.length : 0;
            counts.negative.consecUpper = matches.negative.consecUpper ? matches.negative.consecUpper.length : 0;
            counts.negative.consecNumbers = matches.negative.consecNumbers ? matches.negative.consecNumbers.length : 0;

            // Calculations
            strength += counts.positive.numChars * 4;
            if (counts.positive.upper) {
                strength += (counts.positive.numChars - counts.positive.upper) * 2;
            }
            if (counts.positive.lower) {
                strength += (counts.positive.numChars - counts.positive.lower) * 2;
            }
            if (counts.positive.upper || counts.positive.lower) {
                strength += counts.positive.numbers * 4;
            }
            strength += counts.positive.symbols * 6;
            strength += (counts.positive.middleSymbol + counts.positive.middleNumber) * 2;
            strength += counts.positive.requirements * 2;

            strength -= counts.negative.consecLower * 2;
            strength -= counts.negative.consecUpper * 2;
            strength -= counts.negative.consecNumbers * 2;

            if (matches.negative.onlyNumbers) {
                strength -= counts.positive.numChars;
            }
            if (matches.negative.onlyLetters) {
                strength -= counts.positive.numChars;
            }

            strength = Math.max(0, Math.min(100, Math.round(strength)));

            if (strength > 85) {
                levels['strongest']
                    .forEach((el) => {
                        el.style.backgroundColor = '#008cdd';
                    });
            } else if (strength > 65) {
                levels['strong']
                    .forEach((el) => {
                        el.style.backgroundColor = '#6ead09';
                    });
            } else if (strength > 30) {
                levels['weak']
                    .forEach((el) => {
                        el.style.backgroundColor = '#e09115';
                    });
            } else {
                levels['weakest'][0].style.backgroundColor = '#e01414';
            }
        }
    }
};
