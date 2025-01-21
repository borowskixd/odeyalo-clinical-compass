import { notFound } from "next/navigation";
import { type FC } from "react";

const NotFoundPage: FC = () => {
  notFound();
};

export default NotFoundPage;
