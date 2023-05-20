import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params}) => {
    try {
        await connectToDb();

        const Prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');
        return new Response(JSON.stringify(Prompts), { staus: 200})
        
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500})
        
    }

}