import type {
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    PreviewData,
} from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { BlogPost } from '../@types/schema'
import BlogCard from '@/components/BlogCard'
import NotionService from '@/services/notion-service'

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

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const title = 'Notion  Blog'
    const description = 'Welcome to my Notion Blog'

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name={'description'} title={'description'} content={description} />
                <meta name={'og:title'} title={'og:title'} content={title} />
                <meta name={'og:description'} title={'og:description'} content={title} />
            </Head>

            <div className="min-h-screen">
                <main className="max-w-5xl mx-auto relative">
                    <div className="h-full pt-4 pb-16 mx-auto">
                        <div className="flex items-center justify-center">
                            <h1 className="font-extrabold text-xl md:text-4xl text-black text-center">
                                {title}
                            </h1>
                        </div>
                        <div className="flex items-center justify-center">
                            <h2 className="font-semibold text-xl md:text-2xl text-black text-center">
                                {description}
                            </h2>
                        </div>
                        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
                            {posts.map((post: BlogPost) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Home
