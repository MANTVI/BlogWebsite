import Config from "../Config/Config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class dataBaseService {
    client = new Client()
    database;
    storage;
    constructor() {
        this.client
            .setEndpoint(Config.appWriteUrl)
            .setProject(Config.appWriteProjecttId);

        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }
    // async createPost({ title, content, image, slug, status, userId }) {
    //     try {
    //         return await this.database.createDocument(
    //             Config.appWriteCollectionId,
    //             Config.appWriteDatabaseId,
    //             slug,  // Document ID
    //             {
    //                 title,
    //                 content,
    //                 image,
    //                 status,
    //                 userId

    //             }
    //         )
    //     } catch (error) {
    //         console.log("Appwrite service :: createPost :: error", error)

    //     }
    // }


    async createPost({ title, content, image, slug, status, userId }) {
        try {
            // Validate input parameters
            if (!title || !content || !slug || !userId) {
                throw new Error("Missing required fields");
            }
    
            // Ensure the configuration values are present
            if (!Config.appWriteCollectionId || !Config.appWriteDatabaseId) {
                throw new Error("Appwrite configuration is missing");
            }
    
            // Log parameters for debugging
            console.log("Creating document with the following details:");
            console.log("Collection ID:", Config.appWriteCollectionId);
            console.log("Database ID:", Config.appWriteDatabaseId);
            console.log("Document ID (slug):", slug);
            console.log("Data:", { title, content, image, status, userId });
    
            // Create the document
            const document = await this.database.createDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
               
                slug,  // Document ID
                {
                    title,
                    content,
                    image,
                    status,
                    userId
                }
            );
    
            // Return the created document
            return document;
    
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw new Error(`Failed to create post: ${error.message}`);
        }
    }
    
    async updatePost(slug, { title, content, image, status }) {
        try {
            return await this.database.updateDocumentDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
               
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    // userId

                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)

        }
    }

    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                
                slug,
                // {
                //     title,
                //     content,
                //     image,
                //     status,
                //     // userId

                // }
            )
            return true;

        } catch (error) {
            console.log("Appwrite service ::  deletePost:: error", error)

        }

    }

    // async getPost(slug) {
    //     try {
    //         return await this.database.getDocument(
    //             Config.appWriteCollectionId,
    //             Config.appWriteDatabaseId,
    //             slug

    //         )
    //     } catch (error) {
    //         console.log("Appwrite service ::  getPost:: error", error);
    //         return false;

    //     }

    // }
    async getPost(slug) {
        try {
            console.log("Received slug:", slug);
            slug = String(slug);
            // Validate the slug
            if ( typeof slug !== 'string') {
                throw new Error("Invalid slug provided");
            }

            // Ensure the configuration values are present
            if (!Config.appWriteCollectionId || !Config.appWriteDatabaseId) {
                throw new Error("Appwrite configuration is missing");
            }
            // Log configuration and slug for debugging
            console.log("Fetching document with the following details:");
            console.log("Collection ID:", Config.appWriteCollectionId);
            console.log("Database ID:", Config.appWriteDatabaseId);
            console.log("Document ID (slug):", slug);

            // Fetch the document
            const document = await this.database.getDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                
                slug
            );

            // Return the document if found
            return document;

        } catch (error) {
            console.error("Appwrite service :: getPost:: error", error);
            throw new Error(`Failed to get post: ${error.message}`);
        }
    }


    async getAllPost(quries = [Query.equal("status", "active")]) { //queries use within square bracket
        try {
            return await this.database.listDocuments(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                
                quries,
                // [ also use query like instead of using in parameter
                //     Query.equal("status","active")
                // ]

                100,  //pagination
                0       // result



            )
        } catch (error) {
            console.log("Appwrite service ::  getAllPost:: error", error);
            return false;

        }

    }


    // file uploading service
    async uploadFile(file) {

        try {
            return await this.storage.createFile(
                Config.appWriteBucketId,
                ID.unique(),
                file,
            )

        } catch (error) {
            console.log("Appwrite service ::  upLoadFile:: error", error);

        }

    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile()
            return true

        } catch (error) {
            console.log("Appwrite service ::  deleteFile:: error", error);
            return false;


        }
    }


    //file preview

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            Config.appWriteBucketId,
            fileId,
        )
    }
}
const service = new dataBaseService();
export default service;