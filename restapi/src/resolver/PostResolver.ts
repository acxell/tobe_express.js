import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { Post } from "../entity/Post";
import { AppDataSource } from "../data-source";

@Resolver(() => Post)
export class PostResolver {
    @Query(() => [Post])
    async getPosts() {
        return await AppDataSource.getRepository(Post).find();
    }

    @Query(() => Post, { nullable: true })
    async getPost(@Arg("id", () => ID) id: number) {
        return await AppDataSource.getRepository(Post).findOneBy({ id });
    }

    @Mutation(() => Post)
    async createPost(
        @Arg("title") title: string,
        @Arg("content") content: string
    ) {
        const newPost = AppDataSource.getRepository(Post).create({ title, content });
        return await AppDataSource.getRepository(Post).save(newPost);
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id", () => ID) id: number,
        @Arg("title", { nullable: true }) title?: string,
        @Arg("content", { nullable: true }) content?: string
    ) {
        const post = await AppDataSource.getRepository(Post).findOneBy({ id });
        if (!post) throw new Error("Post not found");

        if (title) post.title = title;
        if (content) post.content = content;

        return await AppDataSource.getRepository(Post).save(post);
    }

    @Mutation(() => Boolean)
    async deletePost(@Arg("id", () => ID) id: number) {
        const result = await AppDataSource.getRepository(Post).delete(id);
        return result.affected !== 0;
    }
}
