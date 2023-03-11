Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => ((arg1 === arg2) ? options.fn(this) : options.inverse(this)));

export const navbarTemplate = `
{{#each items}}
    <div>
        <p> {{this.type}}</p>
        <{{this.type}} href="{{this.href}}" data-section="{{this.key}}" {{#ifEquals @index 0}} class="active" {{/ifEquals}}>
            {{this.textContent}}
        </{{this.type}}>
        {{#ifEquals key 'registration'}} 
            <div class="border-left"></div>
        {{/ifEquals}}
    </div>
{{/each}}
`;
