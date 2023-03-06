export const tracksTemplate =
`
<div class="{{artistsTitleDiv}}">
    <div class="{{artistsTitle}}">
        <h2>Artists</h2>
    </div>
    <div class="{{artistsFullList}}">
        <p>Show all</p>
    </div>
</div>

<div class="{{artistsDiv}}">
    {{#each content.artists}}
        <div class="{{../artistDiv}}">
            <div class="{{../artistImgDiv}}">
                <img class="{{../artistImg}}" src=
                    {{#if this.cover}}
                        "{{this.cover}}"
                    {{else}}
                        "{{../defaultArtistCover}}"
                    {{/if}}>
            </div>
        <div class="{{../artistNameDiv}}">
            <p>{{this.name}}</p>
        </div>
    </div>
    {{/each}}
</div>
`;
