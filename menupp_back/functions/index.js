const functions = require('firebase-functions')
const {Storage} = require("@google-cloud/storage")
const gcs = new Storage
const sharp = require("sharp")
const fs = require("fs-extra")
const os = require("os")
const path = require("path")
const uuid = require("uuid")
const UUID = require("uuid-v4");
const formidable = require("formidable-serverless");

exports.resizeImages = functions.storage.object().onFinalize(async object=> {
    try{
const uniqueName = uuid.v1()
const bucket = gcs.bucket(object.bucket)
const filePath = object.name;
const fileName = filePath.split('/').pop()
const bucketDir = path.dirname(filePath)
const workingDir = path.join(os.tmpdir(),`images_${uniqueName}`)
const tmpFilePath = path.join(workingDir, `source_${uniqueName}.png`)
if(fileName.includes("image@") || !object.contentType.includes("image") ){
return false;
}
await fs.ensureDir(workingDir)
await bucket.file(filePath).download({
    destination:tmpFilePath
})
const sizes = [720]
const uploadPromises = sizes.map(async size => {
    const thumbName = `image@${size}_${fileName}.png`;
    const thumbPath = path.join(workingDir,thumbName)
    if(size < 300){
        await sharp(tmpFilePath).resize(size,size).toFile(thumbPath)
    }else {
        let height = Math.floor(size * 0.5625 );
        await sharp(tmpFilePath).resize(size,height).toFile(thumbPath)
    }
    return bucket.upload(thumbPath, {
        destination: path.join(bucketDir,thumbName)
    })
})
  await Promise.all(uploadPromises)
  await fs.remove(workingDir)
  await fs.remove(bucketDir)
    } catch (error) {
console.log(error)
return Promise.reject(error)
    }
})
exports.uploadFile = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    var form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        var file = files.file;
        if (!file) {
          reject(new Error("no file to upload, please choose a file."));
          return;
        }
        var filePath = file.path;
        console.log("File path: " + filePath);
  
        const storage = new Storage({
          keyFilename: "service-account.json",
        });

        let uuid = UUID();
        const response = await storage.bucket("menupp-final.appspot.com").upload(filePath, {
          contentType: file.type,
          metadata: {
            metadata: {
              firebaseStorageDownloadTokens: uuid,
            },
          },
        });
        const fullMediaLink = response[0].metadata.mediaLink + "";
        const mediaLinkPath = fullMediaLink.substring(
          0,
          fullMediaLink.lastIndexOf("/") + 1
        );
        const downloadUrl =
          mediaLinkPath +
          encodeURIComponent(response[0].name) +
          "?alt=media&token=" +
          uuid;
        console.log("downloadUrl", downloadUrl);
        resolve({ fileInfo: response[0].metadata, downloadUrl }); // Whole thing completed successfully.
      });
    })
      .then((response) => {
        res.status(200).json({ response });
        return null;
      })
      .catch((err) => {
        console.error("Error while parsing form: " + err);
        res.status(500).json({ error: err });
      });
  });