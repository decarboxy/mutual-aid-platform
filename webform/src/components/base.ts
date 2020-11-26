import b from 'bss';
import m from 'mithril';
import stream from 'mithril/stream';

b.setDebug(true)

export interface InputAttributes {
    name: string
    label: string
    required?: boolean

    // Used to provide custom validation.
    validator?: (input: string) => string

    // Used to provide feedback on errors.
    validMsg?: string
    invalidMsg?: string

    value?: string
}

export const styleInput = b
    .d("block")
    .border("1px solid #ccc")
    .bs("inset 0 1px 3px #ddd")
    .boxSizing('border-box')
    .br("4px")
    .p("0.5em")
    .w('100%')
    .fontFamily('inherit')
    .$focus(
        b.outline('0')
    )
    .$invalid(
        b.$not(":placeholder-shown",
            b
                .borderColor("#e9322d")
        )
    )

export const InputComponentFactory = <T extends InputAttributes>(innerComponent: m.Component<any>) => {
    const component: m.ClosureComponent<T> = vnode => {
        const value = stream<string>('');
        const isValid = stream<boolean>(true);

        return {
            view: ({ attrs: {
                name,
                label,
                validator,
                invalidMsg,
                validMsg,
                required,
                ...attrs
            } }) => {
                return m("div" + b
                    .mb("1em")
                    ,
                    label ? m("label", { for: name }, `${label}${required ? '*' : ''}`) : null,
                    m(innerComponent, {
                        name: name,
                        value: value(),
                        required: required === true,
                        onchange: (evt: InputEvent) => {
                            const target = evt.target as HTMLInputElement
                            if (target) {
                                value(target.value);
                                if (validator) {
                                    target.setCustomValidity(validator(value()))
                                }
                                isValid(target.checkValidity())
                            }
                        },
                        ...attrs,
                    }),
                    isValid()
                        ? (validMsg ? m('div' + b.c("green"), validMsg) : null)
                        : (invalidMsg ? m('div' + b.c("red"), invalidMsg) : null),
                )
            }
        }
    }
    return component;
}
