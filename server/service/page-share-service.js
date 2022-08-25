import TempPage from "../model/model.js";
import JsonResult from "../model/JsonResult.js";

export const getSharedPage = async (req) => {
    console.log(req.params)
    const {url} = req.params
    const page = await TempPage.findOne({
        attributes: ['content'],
        where: {shared_url: url}
    });

    return JsonResult.success(page)
}