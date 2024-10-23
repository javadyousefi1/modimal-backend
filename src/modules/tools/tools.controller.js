const sharp = require('sharp');
const Controller = require('../../common/controllers/controller')
// error handling
const createError = require("http-errors");
class ToolsController extends Controller {

    constructor() {
        super()
    }
    async decreaseImageResolution(req, res, next) {
        try {
            const file = req.file;
            const { persent } = req.body;

            if (!file) {
                return res.status(400).json({ message: "File is required.", statusCode: res.statusCode });
            }

            if (+persent < 20 || +persent > 80) {
                return res.status(400).json({ message: "The percentage should be between 20 and 80.", statusCode: res.statusCode });
            }

            // Process image with Sharp to compress it
            const compressedImageBuffer = await sharp(file.buffer)
                .jpeg({ quality: +persent }) // Use the correct percentage here
                .toBuffer();

            const fileExtention = file?.mimetype.split("/").at(-1)

            // Set the filename for the compressed image
            const compressedFileName = `compressed_image.${fileExtention}`;

            // Send the compressed image as a download
            res.set({
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename=${compressedFileName}`,
            });

            return res.send(compressedImageBuffer);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error processing the image.');
        }
    }
}


module.exports = { ToolsController: new ToolsController() }