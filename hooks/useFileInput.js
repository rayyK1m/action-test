import { useEffect, useMemo, useState, useCallback } from 'react';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';

const getFileExtension = (fileName) => {
    const total = fileName?.match(/[^\\]*(\.\w+)$/);
    if (!total) {
        return { fullName: fileName };
    }
    const name = total[0].replace(/(\.\w+)$/, '');

    return { fullName: fileName, name, extension: total[1] };
};

const getFileMap = (files = [], isOrigin = false) =>
    files.reduce((prev, file) => {
        const { fullName, name, extension } = getFileExtension(file?.name);
        return {
            ...prev,
            [fullName]: { name, extension, isOrigin, file, src: file?.src },
        };
    }, {});

const getFileSize = (fileMap = {}) =>
    Object.entries(fileMap).reduce((prev, [, { file }]) => {
        if (!file?.size) {
            return prev;
        }
        return prev + file.size;
    }, 0);

/*
fileMap: {
    name: {
        extension,
        isDefault,
        file // type: file or object {name, size, ...}
    }
}
*/
/*
defaultFiles: [
	{
		name,	//file name with extension
		src,	//file download link
		size, 	//fileSize (byte)
	}
]
*/

const useFileInput = ({ defaultFiles = [], isMultiple }) => {
    const originFileMap = useMemo(() => {
        if (isEmpty(defaultFiles)) {
            return {};
        }
        const files = isMultiple ? defaultFiles : [...defaultFiles];
        return getFileMap(files, true);
    }, [isMultiple, defaultFiles]);

    const [fileMap, setFileMap] = useState({});
    const fileSize = useMemo(() => getFileSize(fileMap), [fileMap]);

    useEffect(() => {
        if (!isEmpty(originFileMap)) {
            setFileMap(originFileMap);
        }
    }, []);

    const addFile = useCallback(
        (files) => {
            const fileList = Array.from(files);
            if (!isMultiple) {
                // reset
                if (fileList.length > 0) {
                    console.log(fileList);
                    setFileMap(() => getFileMap(fileList));
                }
            } else {
                // add
                setFileMap((prev) => ({ ...prev, ...getFileMap(fileList) }));
            }
        },
        [isMultiple],
    );

    // used only multiple
    const deleteFile = useCallback((key) => {
        // delete
        setFileMap((prev) => {
            const cur = omit(prev, key);
            return cur;
        });
    }, []);

    const deleteFiles = () => {
        setFileMap([]);
    };

    const getFileInputProps = useCallback(
        () => ({
            fileMap,
            isMultiple,
            addFile,
            deleteFile,
            deleteFiles,
        }),
        [fileMap, isMultiple],
    );

    return {
        getFileInputProps,
        state: { originFileMap, fileMap, fileSize },
    };
};

export default useFileInput;
