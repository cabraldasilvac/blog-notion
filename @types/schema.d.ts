export type Tag = {
    color: string
    id: string
    name: string
}

export type BloPost = {
    id: string
    slug: string
    cover: string
    title: string
    tags: Tag[]
    description: string
    date: string
}
