import { create } from "zustand";

type ConverImageStore = {
  url?:string
  documentId?: string;
  isOpen:boolean
  onOpen:(documentId: string, url?: string) => void
  onClose:() => void
  onReplace:(documentId: string, url:string) => void
};

export const useConverImage = create<ConverImageStore>()((set) => ({
  url:undefined,
  documentId: undefined,
  isOpen:false,
  onOpen:(documentId: string, url?: string) =>
    set({ isOpen: true, url, documentId }),
  onClose:() => set({isOpen:false,url:undefined, documentId: undefined }),
  onReplace:(documentId: string, url:string) =>
    set({isOpen:true,url, documentId})
}));
