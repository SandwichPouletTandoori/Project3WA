
const Home = (req, res) => {
    res.json({
        data: {
            message: 'Hello World !'
        }
    })
};

export { Home }