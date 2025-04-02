

const sampleController = (req,res) => {
    res.status(200).json({
        message: 'Sample Controller'
    });
}

export {sampleController};