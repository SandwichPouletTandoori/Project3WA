
const Error404 = (req, res) => {
    res.json({
        data: {
            message: 'Hello World !'
        }
    })
};

export { Error404 }