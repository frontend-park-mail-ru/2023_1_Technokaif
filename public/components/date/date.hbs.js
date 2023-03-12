/**
 * Contains template string for date picker.
 */
export const dateTemplate = `
<div class="{{dateMainDiv}}">
    <label for="{{divChooseId}}" class="{{labelClass}}">{{labelText}}</label>
    <div id="{{divChooseId}}" class="{{dateChooseDiv}}">
        <div {{#if divDayClass}} class="{{divDayClass}} {{/if}}">
            <input type="{{typeOfDayInput}}" class="{{dayClass}}" name="{{nameOfDayInput}}" placeholder="{{placeholderOfDay}}" id="{{idOfDay}}">
        </div>

        <div {{#if divMonthClass}} class="{{divMonthClass}} {{/if}}">
            <select name="{{nameOfMonthInput}}" id="{{idOfMonth}}" class="{{selectClass}}">
                {{#each optionsDate}}
                    <option value="{{this.option}}" {{#if this.class}} class="{{this.class}}" {{/if}}>{{this.text}}</option>
                {{/each}}
            </select>
        </div>

        <div {{#if divYearClass}} class="{{divYearClass}} {{/if}}">
            <input type="{{typeOfDayInput}}" class="{{yearClass}}" name="{{nameOfYearInput}}" placeholder="{{placeholderOfYear}}" id="{{idOfYear}}">
        </div>
    </div>
    <div class="{{errorDate}}" {{#if errorID}} id="{{errorID}}" {{/if}}></div>
    <div class="{{errorMonth}}" {{#if errorMonthID}} id="{{errorMonthID}}" {{/if}}></div>
    <div class="{{errorYear}}" {{#if errorYearID}} id="{{errorYearID}}" {{/if}}></div>
</div>
`;
