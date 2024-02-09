import express from 'express';
import Contact from '../models/contactModels.js';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (_, res) => {
    const links = [
        "https://i.pinimg.com/originals/f8/06/cb/f806cb0c47d321dc8fa9021df644972f.jpg",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.imgflip.com%2F5q2zt0.png&f=1&nofb=1&ipt=0aabc7132376796b2e41d251543a0418944fd01ae3510847471842edb7295530&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fwww.sopitas.com%2Fwp-content%2Fuploads%2F2017%2F05%2Fpepe-rana-860x581.jpg&f=1&nofb=1&ipt=084d8e80a69100edcfa46dfd3ec0c2237085af7ca7f8eb2865c3898b92ee806e&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.vidoUiMp8vHQY4EmHtIK-gHaEW%26pid%3DApi&f=1&ipt=a6387eaddcb30259b9b93ce905e4a8071470f8328332abcf589f82b150567543&ipo=images",
        "https://vimladen.com/vimladen.gif",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe5%2Fa9%2F28%2Fe5a928161a8c88d9cde8f8f9500877ba.gif&f=1&nofb=1&ipt=94b0f50c72f12d260fe4f1610e8c6a2f28ea92d3b1781954c65677dbb0aaaad3&ipo=images",
    ]

    const contact = new Contact({
        first: "First",
        last: "Last",
        twitter: "@test",
        avatar: links[Math.floor(Math.random() * links.length)],
        notes: "test",
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    const update = req.body;

    try {
        let doc = await Contact.findOneAndUpdate(filter, update, { new: true });
        res.json(doc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;
