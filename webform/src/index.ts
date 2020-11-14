import b from 'bss';
import m from 'mithril';

interface BaseConfig {
    name: string
    attrs?: object
    label?: string
    required?: boolean,
    validator?: (input: string) => string
}

interface TextConfig extends BaseConfig { }

interface InputConfig extends BaseConfig {
    type: string
}

interface SelectConfig extends BaseConfig {
    options: {
        [option: string]: string
    }
}

b.setDebug(true)

const styleInput = b
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

const Intro = (): m.Component => {
    return {
        view: () => {
            return m("div", [
                m("h1" + b.textAlign("center"), "Request Aid"),
                m("p", `
If you’re a graduate student, post-doc or other academic employee facing some
small fiscal challenge, fill in the form below and we’ll be in touch.
Requests are fulfilled in the order they are received, as long as we have
sufficient funds. We are a small, volunteer-run organization, so we will get
back to you to verify your identity within 24 hours and we will fulfill your
request within 48 hours.
                `),
                m("p", [
                    `
Provide as much or as little information about your reasons for requesting
aid as you are comfortable.
                    `,
                    m("strong", `
To maximize the number of people we can help, we can currently provide a
maximum of $50 in aid per request.
                `)
                ]),
                m("p", `
The contents of email accounts at state universities can be retrieved by the
public with a FOIA request. To preserve your privacy, we will send you an
email to verify your identity, but after the initial email all further
discussions will be via phone call.
                `),
                m("p", [
                    m("strong", "Before you fill out this form:"),
                    `
Our resources are limited, and we are ill equipped to solve chronic problems
like food insecurity. Please consult our overview of the state and federal
resources that may be able to help you on our Resources page. If those
resources can’t help you, we are happy to step in.
                `
                ])
            ])
        }
    }
}

const ValidationError = (): m.Component => {
    return {
        view: ({ children }) => {
            return m("div" + b.c("#e9322d"), children)
        }
    }
}

const SelectInput = (): m.Component<SelectConfig> => {
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

const TextInput = (): m.Component<TextConfig> => {
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

const FieldInput = (): m.Component<InputConfig> => {
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

const buildForm = (chapterId: string) => {
    return {
        view: () => {
            return m("div" + b
                .w('50%')
                .ml('auto')
                .mr('auto')
                , [
                    m(Intro),
                    m("form", [
                        m("input", { type: "hidden", name: "chapter_id", value: chapterId }),
                        m(FieldInput, {
                            name: "full_name",
                            label: "Full Name",
                            type: "text",
                            required: true,
                            attrs: {
                                placeholder: "Enter your name",
                            }
                        }),
                        m(FieldInput, {
                            label: "Email Address",
                            name: "email",
                            type: "email",
                            required: true,
                            attrs: {
                                placeholder: "Enter your edu email address",
                                pattern: ".+\\.edu$",
                            },
                        }),
                        m(FieldInput, {
                            name: "phone",
                            label: "Phone Number",
                            type: "tel",
                            required: true,
                            attrs: {
                                placeholder: "###-###-####",
                                pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            }
                        }),
                        m(FieldInput, {
                            name: "institution",
                            label: "Institution",
                            type: "text"
                        }),
                        m(FieldInput, {
                            name: "group",
                            label: "Research Group or Advisor",
                            type: "text"
                        }),
                        m(FieldInput, {
                            name: "zip",
                            label: "Zipcode",
                            type: "text",
                            attrs: {
                                pattern: "[0-9]{5}(-[0-9]{4})?",
                            }
                        }),
                        m(FieldInput, {
                            name: "amount",
                            label: "Amount",
                            type: "text",
                            required: true,
                            validator: (data) => {
                                const amount = parseFloat(data);
                                if(amount > 50.0) {
                                    return "We cannot offer assistance exceeding $50 at this time";
                                }
                                return ""
                            },
                            attrs: {
                                placeholder:  "Requested aid amount",
                            },
                        }),
                        m(SelectInput, {
                            name: "payment_method",
                            label: "Payment Method",
                            options: {
                                venmo: "Venmo",
                                cash_app: "Cash App",
                                paypal: "PayPal",
                                zelle: "Zelle",
                            },
                        }),
                        m(TextInput, {
                            name: "reason",
                            label: "Request Details"
                        }),
                        m(FieldInput, {
                            name: "referral",
                            label: "Where did you find us?",
                            type: "text"
                        }),
                        m("button", {
                            type: "submit",
                        }, "Send Request")
                    ])
                ])
        }
    }
}

const installAidForm = (element: HTMLElement, chapterId: string) => {
    m.mount(element, buildForm(chapterId));
}

installAidForm(document.body, "asdf1234");