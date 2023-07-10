import NotionService from '@/services/notion-service'
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'

export async function getStaticPaths() {
    const notionService = new NotionService()

    const posts = await notionService.getPublishedBlogPosts()

    // because ew are generating static paths, you will have to redeploy
    //your site when  you make a change in Notion.
    const paths = posts.map((post) => {
        return `post/${post.slug}`
    })

    return {
        paths,
        fallback: false,
    }
}
export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
    const notionService = new NotionService()

    // @ts_ignore
    const p = await notionService.getSingleBlogPost(context.params?.slug)

    if (!p) {
        throw 'Error'
    }
    return {
        props: {
            markdown: p.markdown,
            post: p.post,
        },
    }
}

const Post = ({ markdown, post }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name={'description'} title={'description'} content={post.description} />
                <meta name={'og:description'} title={'og:description'} content={post.description} />
                <meta name={'og:image'} title={'og:title'} content={post.cover} />
            </Head>

            <main className="min-h-screen">
                <div className="flex items-center justify-center">
                    <article className="prose">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </article>
                </div>
            </main>
        </>
    )
}

export default Post
