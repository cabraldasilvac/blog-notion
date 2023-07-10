import type {
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
    PreviewData,
} from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { BlogPost } from '../@types/schema'
import NotionService from '@/services/notion-service'
import BlogCard from '@/components/BlogCard'

export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
    const notionService = new NotionService()
    const posts = await notionService.getPublishedBlogPosts()

    return {
        props: {
            posts,
        },
    }
}

const Home: NextPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const title = 'Test blog'
    const description = 'Welcome to my Notion Blog'

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name={'description'} title={'description'} content={description} />
                <meta name={'og:title'} title={'og:title'} content={title} />
                <meta name={'og:description'} title={'og:description'} content={title} />
            </Head>

            <main className="min-h-screen">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-center">
                        <h1 className="font-extrabold text-xl md:text-4xl text-black text-center">
                            NotionBlog
                        </h1>
                    </div>
                    <div className="mt-12 max-wlg mx-auto grid gap-6 lg:grid-cols-2 lg:max-w-none">
                        {posts.map((post: BlogPost) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home
