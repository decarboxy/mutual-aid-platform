import b from 'bss'
import m from 'mithril'

import { BaseConfig, styleInput } from './base';
import { ValidationError } from './validation-error';

interface SelectConfig extends BaseConfig {
    options: {
        [option: string]: string
    }
}

export const SelectInput = (): m.Component<SelectConfig> => {
    let value: string | undefined = undefined;
    return {
        view: ({ attrs }) => {
            return m("div" + b
                .mb("1em")
                , [
                    attrs.label ? m("label", { for: attrs.name }, `${attrs.label}${attrs.required ? '*' : ''}`) : null,
                    m("select" + styleInput, {
                        oninput: (evt: InputEvent) => {
                            value = (<HTMLInputElement>evt.target)?.value;
                            if (attrs.validator) {
                                (<HTMLInputElement>evt.target)?.setCustomValidity(attrs.validator(value));
                            }
                        },
                        name: attrs.name,
                        required: attrs.required === true ? true : false,
                    }, [
                        m("option", { disabled: true, selected: value === undefined }, "Select one..."),
                        Object.entries(attrs.options).map(([option, description]) => {
                            return m("option", { value: option, selected: value === option }, description);
                        }),
                    ]),
                ])
        }
    }
}