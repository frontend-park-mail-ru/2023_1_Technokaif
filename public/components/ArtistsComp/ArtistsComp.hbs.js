export const artistsTemplate =
`
<div class="{{tracksTitleDiv}}">
    <div class="{{tracksTitle}}">
        <h2>Tracks</h2>
    </div>
    <div class="{{tracksFullList}}">
        <p>Show all</p>
    </div>
</div>

<div class="{{tracksDiv}}">
    {{#each content.tracks}}
        <div class="{{../trackDiv}}">
            <div class="{{../trackImgDiv}}">
                <img class="{{../trackImg}}"
                    src=
                    {{#if this.cover}}
                        "{{this.cover}}"
                    {{else}}
                        "{{../defaultTrackCover}}"
                    {{/if}}
                    >
            </div>
            <div class="{{../trackNameDiv}}">
                <p>{{this.name}}</p>
            </div>

            <div class="{{../innerArtistsDiv}}">
                {{#each this.artists}}
                    <div class="{{../../innerArtistNameDiv}}">
                        <p>{{this.name}}</p>
                    </div>
                {{/each}}
            </div>
        </div>
    {{/each}}
</div>
`;
