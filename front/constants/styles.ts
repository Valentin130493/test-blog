export const styles = {
    modal: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    header: {
        width: "100%",
        border: '2px solid #000',
        display: "flex",
        padding: "10px 5px",
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    post: {
        div: {
            width: '100%',
            display: 'flex',
            padding: "5px 0",
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        }
    }
}