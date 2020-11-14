import b from 'bss'
import m from 'mithril'

import { BaseConfig, styleInput } from './base';
import { ValidationError } from './validation-error';

interface TextConfig extends BaseConfig { }

export const TextInput = (): m.Component<TextConfig> => {
    let value = "";
    return {
        view: ({ attrs }) => {
            return m("div" + b
                .mb("1em")
                , [
                    attrs.label ? m("label", { for: attrs.name }, `${attrs.label}${attrs.required ? '*' : ''}`) : null,
                    m("textarea" + styleInput, {
                        value: value,
                        oninput: (evt: InputEvent) => {
                            value = (<HTMLInputElement>evt.target)?.value;
                            if (attrs.validator) {
                                (<HTMLInputElement>evt.target)?.setCustomValidity(attrs.validator(value));
                            }
                        },
                        name: attrs.name,
                        required: attrs.required === true ? true : false,
                        ...attrs.attrs
                    }),
                ])
        }
    }
}