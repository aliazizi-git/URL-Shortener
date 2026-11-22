import { Router } from "express";
import { remove, update,create,getUrlStats } from "./urlCn.js";
import { validateCreateUrl, validateUpdateUrl } from "./urlValidator.js";

const urlRouter = Router()

urlRouter.route('/').post(validateCreateUrl,create)
urlRouter.route('/:shortCode').patch(validateUpdateUrl,update).delete(remove).get(getUrlStats)


export default urlRouter