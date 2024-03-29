export type CardType = {
  year: string;
  picture?: string;
  imgSrc?: string;
  author: { ru?: string; en: string };
  name: { ru?: string; en: string };
  options?: string[];
  category?: string;
  desc?: string;
  likes?: string;
  dislikes?: string;
  watch?: string;
};

export interface IFormValues {
  name: string;
  date: string;
  desc: string;
  selectValue: string;
  checkboxValue: string[];
  status: 'Dead' | 'Alive' | 'unknown';
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  file: Blob[];
  fileSrc?: string;
  agree: boolean;
}
