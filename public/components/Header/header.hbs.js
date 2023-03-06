/**
 * Contains template string for header
 */
export const headerTemplate =
`
<div class="{{header}}">
    <a class="{{title}}">
        <img src="{{logoSrc}}">
        <p class="{{titleClass}}">{{titleName}}</p>
    </a>
    {{#if errorTop}}
        <div class="{{errorTop}}" {{#if topID}} id="{{topID}}" {{/if}}></div>
    {{/if}}
    <div class="{{descriptionClass}}">
        <p class="{{descriptionLabelClass}}">{{descriptionName}}</p>
    </div>
</div>
`;
