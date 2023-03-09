/**
 * Contains template string for sex picker
 */
export const sexTempate = `
<div class="{{mainSexDiv}}">
    <div class="{{labelSex}}">
        <p class="{{labelClass}}">{{labelText}}</p>
    </div>
    <div class="{{divSexChoose}}">
        {{#each sexes}}
            <div class="{{this.insideDivSex}}">
                <input type="{{this.typeInput}}" name="{{this.nameInput}}" class="{{this.classSexInput}}" id={{this.id}}>
                <label for="{{this.id}}" class="{{this.classLabel}}">{{this.textLabel}}</label>
            </div>
        {{/each}}
    </div>
    <div class="{{errorSex}}"></div>
</div>
`;
