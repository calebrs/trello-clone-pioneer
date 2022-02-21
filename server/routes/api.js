const SDK = require("pioneer-javascript-sdk");

// if the actual address has a path like localhost:3030/features, include that in the getServerAddress() method
const scoutAddress = "http://localhost:3030";

// the sdkKey that should match the sdkKey provided by Compass
const sdkKey = "37420b76-7f13-48fe-a647-e976b4273b55";
const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const {
  validateBoard,
  validateCard,
  validateList,
  validateEditList,
} = require("../validators/validators");

// makes an active sse connection
const blah = async () => {
  const config = await new SDK(scoutAddress, sdkKey).connect().withWaitForData();
  const sdkClient = config.client;

  router.get("/boards/:id", boardsController.getBoard);

  if (sdkClient.getFeature("LOGIN_MICROSERVICE")) {
    router.get("/boards", boardsController.getBoards);
  } else {
    router.get("/boards", () => console.log("here"));
  }

  router.post("/boards", validateBoard, boardsController.createBoard);

  router.post("/lists", validateList, listsController.createList, boardsController.addListToBoard, listsController.sendList);

  router.put("/lists/:id", validateEditList, listsController.editList, listsController.sendList);
}
blah();




// router.post("/cards", validateCard, cardsController.createCard);

module.exports = router;
