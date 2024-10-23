const router = require("express").Router();
// controllers
const { SuggestionsController } = require("./suggestions.controller");
// guard
const { checkIsAdmin } = require("../../common/guards/auth.guard")

router.post("/create-suggestion", SuggestionsController.addNewSuggestions)
router.get("/get-all-suggestions", SuggestionsController.getAllSuggestionss)
router.delete("/delete-suggestion", SuggestionsController.deleteSuggestions)

module.exports = {
    suggestionRoutes: router
}