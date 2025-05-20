// import { HfInference } from "@huggingface/inference";
import axios from "axios";

export async function getRecipeFromTogether(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // Change this to your desired model
        messages: [
          {
            role: "system",
            content:
              "You are a recipe assistant. Suggest a recipe  based on the ingredients provided. Format the recipe in Markdown.",
          },
          {
            role: "user",
            content: `I have ${ingredientsString}. What can I cook?`,
          },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data.choices?.[0]?.message?.content || "No recipe generated."
    );
  } catch (error) {
    console.error("Error fetching recipe from Together.ai:", error);
    return "Sorry, there was an error generating the recipe.";
  }
}

// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
// `;

// const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

// export async function getRecipeFromMistral(ingredientsArr) {
//   const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);
//   const ingredientsString = ingredientsArr.join(", ");
//   try {
//     const response = await hf.chatCompletion({
//       model: "openchat/openchat-3.5-0106",
//       messages: [
//         { role: "system", content: SYSTEM_PROMPT },
//         {
//           role: "user",
//           content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
//         },
//       ],
//       max_tokens: 1024,
//     });
//     return response.choices[0].message.content;
//   } catch (err) {
//     console.error("API error:", err);
//   }
// }
