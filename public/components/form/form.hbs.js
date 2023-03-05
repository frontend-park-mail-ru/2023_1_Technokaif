export const formTemplate =
`
<div class="{{content}}">
    <div class="header-placement"></div>
    <div {{#if divBeforeForm}}class="{{divBeforeForm}}" {{/if}}>
        <form class="{{formDiv}}">
            <div class="inputs-placement"></div>
            {{#if placementClass}}
                <div class="{{placementClass}}" id="{{placementId}}"></div>
            {{/if}}
            
            <div class="{{divButton}}">
                <button type="{{buttonType}}" class="buttonClass">{{textButton}}</button>
            </div>
        </form>
        <div {{#if divHrClass}} class="{{divHrClass}}" {{/if}}>
            <hr {{#if hrClass}} class="{{hrClass}}", align="center" {{/if}}">
        </div>
        <div class="bottom-placement"></div>
    </div>
</div>
`;
