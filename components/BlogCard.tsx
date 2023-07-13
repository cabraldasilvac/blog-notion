import { FunctionComponent } from 'react'
import { BlogPost } from '../@types/schema'
import dayjs from 'dayjs'
import Link from 'next/link'
import Image from 'next/image'

type BlogCardProps = {
    post: BlogPost
}

const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
    return (
        <Link className="transition duration-300 hover:scale-105" href={`/post/${post.slug}`}>
            <div key={post.title} className="flex flex-col rounded-xl shadow-lg overflow-hidden">
                {/*Image */}
                <div className="flex-shrink-0">
                    <Image className="h-64 w-full object-fit" src={post.cover} alt="" />
                </div>
                {/*Text */}
                <div className="flex-1 bg-gray-50 pt-2 pb-6 px-4 flex flex-col justify-between">
                    <div className="flex-1">
                        {/*Date */}
                        <span className="block mt-2">
                            <h4 className="text-xs font-medium text-gray-600">
                                {/* Thursday, August 16, 2018 8:02 PM */}
                                {dayjs(post.date).format('LLL')}
                            </h4>
                        </span>
                        {/*Title */}
                        <span className="block mt-2">
                            <h4 className="text-xl font-semibold text-gray-900">{post.title}</h4>
                        </span>
                        {/*Description */}
                        <span className="block mt-2">
                            <p className="text-sm text-gray-600">{post.description}</p>
                        </span>
                        <span className="block mt-2 space-x-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="bg-green-300 text-green-800 px-2 py-1 text-xs rounded-lg"
                                >
                                    #{tag.name}
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
