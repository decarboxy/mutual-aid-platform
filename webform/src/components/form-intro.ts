import b from 'bss';
import m from 'mithril';

export const FormIntro = (): m.Component => {
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