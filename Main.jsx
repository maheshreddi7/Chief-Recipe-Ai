import React from "react";
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromTogether } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "chicken",
    "all the main spices",
    "corn",
    "heavy cream",
    "pasta",
  ]);
  const [recipe, setRecipe] = React.useState("");

  async function getRecipe() {
    try {
      const recipeMarkdown = await getRecipeFromTogether(ingredients); // Make sure `ingredients` is defined in the scope
      setRecipe(recipeMarkdown); // Update state with the fetched recipe
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
      // Optionally add error handling UI or fallback behavior here
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    e.target.reset();
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
