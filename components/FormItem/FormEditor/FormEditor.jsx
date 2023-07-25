//import { useState } from 'react';m
import dynamic from 'next/dynamic';
import FormWrapper from '../FormWrapper';
import styles from './FormEditor.module.scss';
//import cn from 'classnames';

const QuillEditor = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const FormEditor = ({
    label,
    isRequired,
    placeholder,
    value,
    onChange,
    ...props
}) => {
    const modules = {
        toolbar: [
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };

    return (
        <FormWrapper
            label={label}
            isRequired={isRequired}
            className={styles.wrapper}
        >
            <QuillEditor
                theme="snow"
                modules={modules}
                placeholder={placeholder}
                className={styles.editor}
                value={value}
                onChange={onChange}
                {...props}
            />
        </FormWrapper>
    );
};

export default FormEditor;

FormEditor.defaultProps = {
    setValue: () => {},
};
