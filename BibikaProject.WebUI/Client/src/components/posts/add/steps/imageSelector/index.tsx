import { Modal, Upload, UploadProps } from "antd"
import { FC, useState } from "react"
import { PlusOutlined, InboxOutlined  } from '@ant-design/icons';
import { ItemRender, RcFile, UploadFile } from "antd/lib/upload/interface";
import Dragger from "antd/lib/upload/Dragger";

const ImageSelector: FC = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const getBase64 = (file: RcFile): Promise<string> => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
    });

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }

    const handleBeforeUpload: UploadProps["beforeUpload"] = (file: RcFile) => {
        return false;
    }

    const itemRender: ItemRender<RcFile> = (originNode: React.ReactElement, file: UploadFile, fileList: Array<UploadFile<RcFile>>, actions: {
        download: () => void;
        preview: () => void;
        remove: () => void;
    }) => {
        return(
            <div className="imageSelector-image-container">
                <img className="imageSelector-image" src={file.thumbUrl}/>
            </div>
        )
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    if (fileList.length == 0 )
    {
        return(
            <div className="imageSelector-container">
                <Dragger
                    multiple
                    className="imageSelector-dragger"
                    onChange={handleChange}
                    beforeUpload={handleBeforeUpload}
                >
                    <p className="ant-upload-drag-icon">
                        <PlusOutlined />
                    </p>
                    <p className="imageSelector-upload-text">
                        Click or drag file to this area to upload
                    </p>
                </Dragger>
            </div>
        )
    }

    return(
        <div className="imageSelector-container">
            <Upload
                multiple
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={handleBeforeUpload}
                //itemRender={itemRender}
                >
                {uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default ImageSelector;