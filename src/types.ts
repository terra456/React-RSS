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
  radioValue: string;
  file: string;
  agree: boolean;
}
