import { Modal, Upload, UploadProps } from "antd"
import { FC, useState } from "react"
import { PlusOutlined, InboxOutlined  } from '@ant-design/icons';
import { ItemRender, RcFile, UploadFile } from "antd/lib/upload/interface";
import { loadImage , addImagesToPost } from "../../service";
import Dragger from "antd/lib/upload/Dragger";
import { AddImagesToPostModel, ImageSrcIdModel } from "../../types";

const ImageSelector: FC = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageList, setImageList] = useState<ImageSrcIdModel[]>([]);
    //const [imageIdList, setImageIdList] = useState<number[]>([]);

    
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
        console.log("file preview", file.preview);
        
        setPreviewImage(file.url || (file.preview as string));
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        
        setFileList(newFileList);
    }

    const handleRemove: UploadProps['onRemove'] = (file: UploadFile) => {

        console.log("image list handle change", imageList);
        
    }

    const handleBeforeUpload: UploadProps["beforeUpload"] = async (file: RcFile) => {
        const foto = await (await getBase64(file)).split(',')[1];

        const idFoto: number = await loadImage(foto);

        const imageIdSrc: ImageSrcIdModel = { imageId: idFoto, imageSrc: file.uid}

        const tmpIdArr = imageList.slice();

        tmpIdArr.push(imageIdSrc);

        setImageList(tmpIdArr);

        console.log("image list", imageList);
        

        return false;
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
                //onRemove={handleRemove}
                beforeUpload={handleBeforeUpload}
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