const Recipe = require("../models/Recipe");

exports.getAllRecipes = async (req, res) => {
  try {
    const { search, category, page = 1 } = req.query;
    const filters = {};

    if (category) filters.category = category;

    if (search) {
      filters.$or = [ // side note: the $or and $regex is just for mongoDB for the filtering functionality, nothing relating to JS.
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination configuration
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    
    // Get total count for pagination
    const totalRecipes = await Recipe.countDocuments(filters);
    
    // Fetch recipes with filters, pagination and sorting
    const recipes = await Recipe.find(filters)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 }); // Show newest recipes first

    const totalPages = Math.ceil(totalRecipes / pageSize);

    res.render("layout.ejs", {
      recipes,
      totalPages,
      page,
      searchQuery: search,
      categoryFilter: category,
      currentPage: "pages/recipes.ejs",
    });
  } catch (error) {
    res.status(500).send("Error fetching recipes");
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .populate({
        path: "likes",
      });
    if (!recipe) return res.status(404).send("Recipe not found");
    res.render("layout.ejs", { currentPage: "pages/recipe.ejs", recipe });
  } catch (error) {
    res.status(500).send(`Error fetching recipe ${error}`);
  }
};

exports.getNewRecipeForm = (req, res) => {
  res.render("layout.ejs", { currentPage: "pages/new-recipe.ejs", recipe: {} });
};

exports.createRecipe = async (req, res) => {
  try {
    const { title, category, description, cook_time, ingredientsJson, instructions, image } = req.body;
    
    // Parse ingredients from JSON string
    let ingredients = [];
    try {
      ingredients = JSON.parse(ingredientsJson || '[]');
    } catch (e) {
      console.error('Error parsing ingredients JSON:', e);
    }

    const newRecipe = new Recipe({
      title,
      category,
      description,
      cook_time,
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients].filter(Boolean),
      instructions,
      image,
      author: req.session.user.id
    });
    await newRecipe.save();
    res.redirect(`/recipes/${newRecipe._id}`);
  } catch (error) {
    res.status(400).send("Error creating recipe");
  }
};

exports.getEditRecipeForm = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe || recipe.author.toString() !== req.session.user.id.toString()) {
      return res.status(403).send("Unauthorized");
    }
    res.render(`layout.ejs`, { currentPage: "pages/edit.ejs", recipe });
  } catch (error) {
    res.status(500).send(`Error fetching recipe ${error}`);
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { title, category, description, cook_time, ingredientsJson, instructions, image } = req.body;
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe || recipe.author.toString() !== userId) {
      return res.status(403).send("Unauthorized");
    }

    // * * I really hate this approach for getting ingredients (from both .ejs and here), 
    // * * but I had to do it this way because it's the only way I can pass ingridients, 
    // * * also had time constraint.
    let ingredients = []; 
    try {
      ingredients = JSON.parse(ingredientsJson || '[]');
    } catch (e) {
      console.error('Error parsing ingredients JSON:', e);
    }

    recipe.title = title;
    recipe.category = category;
    recipe.description = description;
    recipe.cook_time = cook_time;
    recipe.ingredients = Array.isArray(ingredients) ? ingredients : [ingredients].filter(Boolean);
    recipe.instructions = instructions;
    recipe.image = image || recipe.image;

    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    res.status(400).send(`Error updating recipe ${error}`);
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe || recipe.author.toString() !== req.session.user.id) {
      return res.status(403).send("Unauthorized");
    }
    await recipe.deleteOne();
    res.redirect("/recipes");
  } catch (error) {
    res.status(500).send(`Error deleting recipe: ${error}`);
  }
};
