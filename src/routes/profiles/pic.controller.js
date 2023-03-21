const sharp = require('sharp');
const Patient = require('../../models/patient.model');


async function multerUpload(req, res) {
    // req.user.avatar = req.file.buffer
    // await req.user.save()
    // res.send()
    //     // console.log(req.user)
    try {
        // Get the buffer representing the uploaded image
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

        // Set the avatar property of the authenticated patient to the buffer
        req.user.avatar = buffer;

        // Save the updated patient document to the database
        await req.user.save();

        res.send("pic uploaded");
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
}

async function renderProfile(req, res) {
    try {
        // Retrieve the avatar buffer from the database
        const avatarBuffer = req.user.avatar;

        // Convert the buffer to a data URL that can be displayed in an img tag
        const avatarDataURL = `data:image/png;base64,${avatarBuffer.toString('base64')}`;

        res.render('profile', {
            user: req.user,
            avatar: avatarDataURL
        });
    } catch (e) {
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = {
    multerUpload,
    renderProfile
}





// Route handler for avatar upload
// router.post('/avatar', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
//   try {
//     // Get the buffer representing the uploaded image
//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

//     // Set the avatar property of the authenticated patient to the buffer
//     req.user.avatar = buffer;

//     // Save the updated patient document to the database
//     await req.user.save();

//     res.send();
//   } catch (e) {
//     res.status(400).send({ error: e.message });
//   }
// });

// Route handler for displaying patient profile
// router.get('/profile', ensureAuthenticated, (req, res) => {
//   try {
//     // Retrieve the avatar buffer from the database
//     const avatarBuffer = req.user.avatar;

//     // Convert the buffer to a data URL that can be displayed in an img tag
//     const avatarDataURL = `data:image/png;base64,${avatarBuffer.toString('base64')}`;

//     res.render('profile', {
//       user: req.user,
//       avatar: avatarDataURL
//     });
//   } catch (e) {
//     res.status(500).send({ error: 'Internal server error' });
//   }
// });