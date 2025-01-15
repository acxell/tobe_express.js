import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { AppDataSource } from "../data-source";

class PostController {
    static postPost = async (req:Request, res:Response) => {
        const newPost = {
            title: req.body.title,
            content: req.body.content,
        };
        const post = AppDataSource.getRepository(Post).create(newPost);
        const result = await AppDataSource.getRepository(Post).save(post);
        return res.json(result);
    };

    static getPost = async (req:Request, res:Response) => {
        const result = await AppDataSource.getRepository(Post).find();
        return res.json(result);
    };
    
    static getOnePost = async (req:Request, res:Response) => {
        const post = await AppDataSource.getRepository(Post).findOne({
            where: {id: parseInt(req.params.id) }
        });
        return res.json(post);
    };

    static updatePost = async (req:Request, res:Response) => {
        const post = await AppDataSource.getRepository(Post).findOne({
            where: {id: parseInt(req.params.id)}
        });
        if (post) {
            AppDataSource.getRepository(Post).merge(post, req.body);
            const result = await AppDataSource.getRepository(Post).save(post);
            return res.json(result);
        }
        return res.json({ msg: "Post Not Found" });
    };

    static deletePost = async (req:Request, res:Response) => {
        const post = await AppDataSource.getRepository(Post).delete(req.params.id);
        return res.json(post);
    };
}

export default PostController;