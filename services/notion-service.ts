import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

export default class NotionService {
    client: Client
    n2m: NotionToMarkdown

    constructor() {
        this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })
        this.n2m = new NotionToMarkdown({ notionClient: this.client })
    }

    async getPublishedBlogPosts(): Promise<BlogPost[]> {
        const database = process.env.NOTION_BLOG_DATABASE_ID ?? ''

        //list blog posts
        const response = await this.client.databases.query({
            database_id: database,
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: 'Created',
                    direction: 'descending',
                },
            ],
        })

        return response.results.map(res => {
          return NotionService.pageToPostTransformer(res);
          // transform this response to a blog post
          

        })

        private static pageToPostTransformer(page: any): BlogPost {
          let cover = page.cover;

          switch(cover.type){
            case 'file':
              cover = page.cover.file;
              break;
            case 'external':
              cover = page.cover.external.url;
              break;
            default:
              // add default cover image if you want...
              cover = ''
          }

          return {
            id: page.id,
            cover: cover,
            title: page.properties.Name.title[0].plain_text,
            tags: page.properties.Tags.multi_select,
            description: page.properties.Description.rich_text[0].plain_text,
            date: page.properties.Update.las_edited_time,
            slug: page.properties.Slug.formula.string


          }
      
        }
    }
}
