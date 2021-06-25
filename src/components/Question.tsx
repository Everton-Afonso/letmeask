import { ReactNode } from "react";
import cx from "classnames";

import "../styles/question.scss";

type QuestionProps = {
  content: string;
  auth: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswer?: boolean;
  isHighlighted?: boolean;
};
export function Question({
  content,
  auth,
  isAnswer = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <div
      className={cx(
        "question",
        { answered: isAnswer },
        { highlighted: isHighlighted && !isAnswer }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={auth.avatar} alt={auth.name} />
          <span>{auth.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
