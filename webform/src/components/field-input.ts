import b from 'bss'
import m from 'mithril'

import { BaseConfig, styleInput } from './base';
import { ValidationError } from './validation-error';

interface InputConfig extends BaseConfig {
    type: string
}

export const FieldInput = (): m.Component<InputConfig> => {
    let value = "";
    return {
        view: ({ attrs }) => {
            let validationError = '';
            if(value && attrs.validator) {
                validationError = attrs.validator(value);
            }
            return m("div" + b
                .mb("1em")
                , [
                    attrs.label ? m("label", { for: attrs.name }, `${attrs.label}${attrs.required ? '*' : ''}`) : null,
                    m("input" + styleInput, {
                        value: value,
                        oninput: (evt: InputEvent) => {
                            value = (<HTMLInputElement>evt.target)?.value;
                            if (attrs.validator) {
                                (<HTMLInputElement>evt.target)?.setCustomValidity(attrs.validator(value));
                            }
                        },
                        type: attrs.type,
                        name: attrs.name,
                        required: attrs.required === true ? true : false,
                        ...attrs.attrs
                    }),
                    validationError ? m(ValidationError, validationError) : null,
                ])
        }
    }
}