// eslint-disable-next-line no-undef
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

export const menuTemplate =
`
<div class="logo">
    <div class="menu-title">
        <img src="/static/svg/whiteLogo.svg">
        <h1>Fluire</h1>
    </div>
</div>
<div>
    <hr align="center", class="menu-hr">
    {{#each items}} 
        <div class="{{this.key}}__{{../name}}__item">
            <img src="{{logoSrc}}" class="{{key}}__logo">
            <a href="{{this.href}}" data-section="{{key}}" {{#ifEquals @index 0}} class="active" {{/ifEquals}}>
                {{name}}
            </a>
        </div>
    {{/each}}
</div>
`;