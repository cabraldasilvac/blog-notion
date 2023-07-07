import NotionService from '@/services/notion-service'
import type { GetStaticProps, NextPage } from 'next'
import { Head } from 'next/document'

export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
    const notionService = new NotionService()

    const post = await notionService.getPublishedBlogPosts()

    return {
        props: {
            posts,
        },
    }
}
const Home: NextPage = ({ posts }: InterGetStaticPropsType<typeof getStaticProps>) => {
    const title = 'Teste blog'
    const description = 'Welcome oto my Notion Blog'

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name={'description'} title={'description'} content={description} />
            </Head>

            <main className="minh-h-screen">
                <div className="max-w-5xl mx-auto"></div>
            </main>
        </>
    )
}

export default Home
