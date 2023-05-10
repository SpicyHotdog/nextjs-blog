import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postDirectory = path.join(process.cwd(),'posts')

export function getSortedPostsData(){
    const fileNames = fs.readdirSync(postDirectory);
    const allPostData = fileNames.map(
        (fileName) => {
            //remove .md from the file name
            const id = fileName.replace(/\.md$/,'');
            //read markdown file as string
            const fullPath = path.join(postDirectory,fileName);
            const fileContent = fs.readFileSync(fullPath,'utf-8');
            //use grey-matter to parse the post content
            const matterResult = matter(fileContent);
            //combine the data with id
            return {
                id,
                ...matterResult.data
            }
        }
    );
    //sort post by date
    return allPostData.sort(
        (a,b) => {
            if(a.date<b.date) return 1;
            else return -1;
        }
    );
}

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postDirectory);
    return fileNames.map(
        (fileName) =>{
            return {
                params:{
                    id:fileName.replace(/\.md$/,'')
                },
            }
        }
    )
}

export async function getPostData(id){
    const fullpath = path.join(postDirectory,`${id}.md`);
    const fileContent = fs.readFileSync(fullpath,'utf-8');
    const matterResult = matter(fileContent);
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}