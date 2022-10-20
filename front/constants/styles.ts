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
    postItemUser: {
        div: {
            width: '100%',
            display: 'flex',
            padding: "5px 0",
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        },
        img: {
            borderRadius: "20px"
        },
        info: {
            display: "flex",
            flexDirection: 'column',
            width: "100%",
            padding: '5px'
        },
        title: {
            textAlign: 'center',
            fontSize: "36px"
        },
        content: {
            fontSize: "26px",
            textAlign: 'center',
            padding: '5px'
        },
        publishDate: {
            textAlign: "end",
            fontStyle: "italic",
            fontSize: "20px"
        },
        comment: {
            fontSize: "36px"
        },
        form: {
            display: "flex",
            justifyContent: 'space-between'
        },
        textField: {
            width: "70%"
        },
        btn: {
            marginLeft: "10px"
        }
    },
    authPage: {
        display: 'flex',
        height: '100vh',
    },
    authForm: {
        width: '50vw',
        height: '100vh',
        backgroundColor: '#fff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    authFormSubtitle: {
        color: 'rgb(180,184,193)'
    },

    authFormForm: {
        maxWidth: '360px'

    },
    adminPage: {
        main: {
            borderBottom: 1,
            borderColor: 'divider',
            width: '100%',
            bgcolor: 'grey'
        },
        tabPanelBox: {
            display: "flex",
            flexDirection: 'column'
        },
        tabPanelButton: {
            margin: "0 10px",
            width: "200px",
            height: "40px"
        }
    },
    postItemAdmin: {
        div: {
            display: "flex",
            width: "100%",
            border: "1px solid",
            borderRadius: "10px",
            justifyContent: "space-around",
            padding: "10px",
            alignItems: "center",
            margin: '10px'
        },
        img: {
            width: "150px",
            height: "150px",
            borderRadius: '20px'
        },
        title: {
            fontSize: "24px",
            width: "250px"
        },
        content: {
            fontSize: "20px",
            width: "250px"
        },
        btn: {
            marginRight: "10px"
        }
    },
    postUser: {
        box: {
            width: 250,
            marginRight: 1,
            my: 5
        },
        img: {
            width: 250,
            height: 150
        },
        title: {
            textAlign: 'center',
            fontSize: '24px'
        },
        content:{
            textAlign: 'center'
        }
    }
}