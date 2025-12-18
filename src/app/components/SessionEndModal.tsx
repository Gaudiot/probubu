import { Box, Modal, Typography } from "@mui/material";

interface SessionEndModalProps {
    modalData: {
        secondsElapsed: number;
        coinsEarned: number;
    };
    open: boolean;
    onClose: () => void;
}

function SessionEndModal({ modalData, open, onClose }: SessionEndModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Congratulations! You finished your session!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {`You earned ${modalData.coinsEarned} coins in ${modalData.secondsElapsed} seconds.`}
                </Typography>
            </Box>
        </Modal>
    );
}

export default SessionEndModal;
