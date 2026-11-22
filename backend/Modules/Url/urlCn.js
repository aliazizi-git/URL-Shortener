import { catchAsync, HandleERROR } from "vanta-api";
import { generateCode } from "../../Utils/generateCode.js";
import Url from "./urlMd.js";

export const create = catchAsync(async (req, res, next) => {
  const { originalUrl, shortCode } = req.body;
  let code;
  if (shortCode) {
    const isExist = await Url.findOne({ shortCode });
    if (isExist) {
      return next(
        new HandleERROR("This custom short code is already taken", 400),
      );
    }
    code = shortCode;
  } else {
    code = generateCode();
    while (await Url.findOne({ shortCode: code })) {
      code = generateCode();
    }
  }
  await Url.create({
    originalUrl,
    shortCode: code || shortCode,
    userId: req.userId || null,
  });
  return res.status(201).json({
    success: true,
    message: "Url created successfully",
    data: {
      url: `${process.env.BASE_URL}/${code}`,
    },
  });
});

export const redirect = catchAsync(async (req, res, next) => {
  const { shortCode } = req.params;
  const isExist = await Url.findOneAndUpdate(
    { shortCode },
    { $inc: { clicks: 1 } },
  );
  if (!isExist) {
    return next(new HandleERROR("URL not found or expired", 404));
  }

  return res.redirect(isExist.originalUrl);
});

export const getUrlStats = catchAsync(async (req, res, next) => {
  const { shortCode } = req.params;
  const urlDoc = await Url.findOne({ shortCode });
  if (!urlDoc) {
    return next(new HandleERROR("URL not found or expired", 404));
  }
  return res.status(200).json({
    success: true,
    data: {
      originalUrl: urlDoc.originalUrl,
      shortCode,
      clicks: urlDoc.clicks,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt || "",
    },
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { shortCode } = req.params;
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return next(new HandleERROR("URL not set", 400));
  }
  const urlDoc = await Url.findOne({ shortCode });
  if (!urlDoc) {
    return next(new HandleERROR("URL not found or expired", 404));
  }
  if (urlDoc.userId && urlDoc.userId.toString() != req.userId) {
    return next(
      new HandleERROR(
        "you don't have permission to access at this end point ",
        403,
      ),
    );
  }
  urlDoc.originalUrl = originalUrl;
  await urlDoc.save();
  return res.status(200).json({
    success: true,
    message: "URL updated successfully",
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { shortCode } = req.params;
  const urlDoc = await Url.findOne({ shortCode });
  if (!urlDoc) {
    return next(new HandleERROR("URL not found or expired", 404));
  }
  if(urlDoc.userId && urlDoc.userId.toString() != req.userId ){
    return next (new HandleERROR("you don't have permission to access at this end point",403))
  }
  await urlDoc.deleteOne()
  return res.status(200).json({
    success:true,
    message:"URL deleted successfully"
  })
});
