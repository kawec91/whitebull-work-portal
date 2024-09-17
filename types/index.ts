import exp from "constants";

export interface AnnoucmentData {
    title: string;
    salary: string;
    image: string;
    video : string;
    description: string;
    location: string;
  }

  export interface DocumentData {
    userEmail: string;
    createdAd: string | Date;
    updatedAt: string | Date;
    documentTitle:string;
    documentUrl: string;
    documentType: string;
  }

  export interface SessionData {
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
      role: string;
      expires: string;
    },
    expires: string;
  }

  export interface ImportantDocumentsData {
      createdAt: string | Date;
      updatedAt: string | Date;
      documentTitle: string;
      documentUrl: string;
      documentType: string;
  }

  export interface UserData {
    firstName: string | null;
    lastName: string | null;
    email: string;
    emailVerified: boolean | null;
    password: string | null;
    role: string;
    profileImageUrl: string;
  }