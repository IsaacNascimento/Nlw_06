import { getCustomRepository } from "typeorm"
import { TagRepositories } from "../repositories/TagRepositories"
import { classToPlain }  from "class-transformer";


class ListTagsService {

    async execute() {
        const tagsRepositories = getCustomRepository(TagRepositories);

        const tags = await tagsRepositories.find();

        return classToPlain(tags);
        // tags = tags.map((tag) => ({ ...tag, nameCustom: '#${tag.name}' }));

        return tags;
    }
}

export { ListTagsService }