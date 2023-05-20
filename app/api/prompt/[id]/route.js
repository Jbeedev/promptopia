import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";


// GET (read one specific prompt)
export const GET = async (request, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 200 });
  }
};

// PATCH (updating a single prompt)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
         await connectToDb();
         const existingPrompt = await Prompt.findById(params.id);

         if(!existingPrompt) return new Response("Prompt does not exist", { staus: 404})

         //Update the prompt with new data
         existingPrompt.prompt = prompt;
         existingPrompt.tag = tag;

         await existingPrompt.save();

         return new Response(JSON.stringify(existingPrompt), { staus: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500})
        
    }
}


//DELETE
export const DELETE = async (response, { params }) => {
    try {
        await connectToDb();

        const deletePrompt = await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted succesfully", { status: 200 })

    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
        
    }
}