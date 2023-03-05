export const inputTemplate =
`
<div class="{{divBeforeInput}}">
    {{#if labelClass}}<label for="{{id}}" class="{{labelClass}}">{{labelText}}</label> {{/if}}
    <input type="{{typeOfInput}}" {{#if autocompleteOff}} autocomplete="x7pv66b" {{/if}} name="{{nameOfField}}" placeholder="{{placeholder}}" class="{{classInp}}" id="{{id}}">
    {{#if errorDiv}} <div class="{{errorDiv}}" {{#if errorId}} id="{{errorId}}" {{/if}}></div> {{/if}}
</div>
`;
