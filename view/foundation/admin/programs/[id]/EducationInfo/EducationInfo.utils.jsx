import { PdfIcon, ImageIcon, FileIcon } from '@goorm-dev/gds-icons';

export const getFileIcon = (filename) => {
    switch (true) {
        case /(.*?)\.(pdf)$/.test(filename):
            return PdfIcon;
        case /(.*?)\.(gif|png|jpg|jpeg)$/.test(filename):
            return ImageIcon;
        default:
            return FileIcon;
    }
};
