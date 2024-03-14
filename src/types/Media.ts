export interface MediaForm {
    files: File[];
    category: string;
}

export interface MediaObject {
    _id: string;
    name: string;
    category: string;
    url: string;
    fileType: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}
