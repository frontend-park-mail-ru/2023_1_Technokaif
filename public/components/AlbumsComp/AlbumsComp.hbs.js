export const albumsTemplate =
`
    <div class="{{albumsTitleDiv}}">
        <div class="{{albumsTitle}}">
            <h2>Albums</h2>
        </div>
        <div class="{{albumsFullList}}">
            <p>Show all</p>
        </div>
    </div>
    
<div class="{{albumsDiv}}">        
    {{#each content.albums}}
        <div class="{{../albumDiv}}">
            <div class="{{../albumImgDiv}}">
                <img class="{{../albumImg}}" src=
                    {{#if this.cover}}
                        "{{#convert}}{{this.cover}}{{/convert}}"
                    {{else}}
                        "{{../defaultAlbumCover}}"
                    {{/if}}>
            </div>
            
            <div class="{{../albumNameDiv}}">
                <p>{{this.name}}</p>
            </div>
            <div class="{{../albumDescriptionDiv}}">
                    <p>{{this.description}}</p>
            </div>

            <div class="{{innerArtistsDiv}}">
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
