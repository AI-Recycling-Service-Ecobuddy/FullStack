import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CategoryProps {
  title: string;
  imgUrl: string;
  setTitle: (title: string) => void;
  setImgUrl: (imgUrl: string) => void;
}

export const useCategoryStore = create(
  persist<CategoryProps>(
    (set) => ({
      title: "",
      imgUrl: "",
      setTitle: (title: string) => set({ title }),
      setImgUrl: (imgUrl: string) => set({ imgUrl }),
    }),
    {
      name: "category-storage"
    }
  )
);
