import { Router } from "express";
import viewHomePage from "../controllers/home.js";
import auth from "../controllers/auth.js";
import cards from "../controllers/cards.js";
import viewAboutPage from "../controllers/about-us.js";
import viewWalletPage from "../controllers/wallet.js";
import Authorization from "../middlewares/auth.js";

const { createAccount, Authentication } = auth;
const { viewCardsPage, createCard } = cards;

const router = Router();

// GET - Routes
router.get("/", viewHomePage);
router.get("/cards", Authorization, viewCardsPage);
router.get("/wallet", Authorization, viewWalletPage);
router.get("/about_us", Authorization, viewAboutPage);

// POST - Routes
router.post("/signup", createAccount);
router.post("/login", Authentication);
router.post("/create_card", Authorization, createCard);

export default router;