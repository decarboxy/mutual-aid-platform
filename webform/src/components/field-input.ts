import m from 'mithril'

import { InputComponentFactory, InputAttributes, styleInput } from './base';

interface FieldInputAttributes extends InputAttributes {
    type: string
    placeholder?: string
    pattern?: string
}

export const FieldInput = InputComponentFactory<FieldInputAttributes>({
    view: ({ attrs: { type, ...attrs } }) => {
        return m("input" + styleInput, {
            type: type,
            ...attrs,
        })
    }
})