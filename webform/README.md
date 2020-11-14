# Academic Mutual Aid Request Form

This directory produces a Javascript library which can be embedded into AMA Chapter websites in order to display a donation form.  The source code is written in Typescript and utilizes two dependencies: mithril, for DOM management and BSS for CSS style manipulation.  In order to avoid namespace conflicts with individual chapter websites all CSS used by the donation form is injected via BSS.

This is still under development.

## Development

You can start the server in development mode through NPM:

```bash
npm start
```

## Releasing

To create a release of the Javscript library run the `npm build` target.

```bash
npm run build
```

The resulting Javascript library will be in `dist/library.js`. 

## Embedding

The below code demonstrates how chapter websites can incorporate the request form onto their website:

```html
<html>
<head>
    <script src="/path/to/library.js"></script>
</head>
<body>
    <script>
        installAidForm(document.body, 'chapterIdGoesHere');
    </script>
</body>
</html>
```