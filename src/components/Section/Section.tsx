import { ReactNode } from "react";
import css from "./Section.module.css";

interface SectionProps {
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <div className={css.section}>{children}</div>;
};

export default Section;
